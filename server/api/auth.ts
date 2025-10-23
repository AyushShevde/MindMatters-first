import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sql } from '@vercel/postgres';
import { signJwt } from "../src/middleware";
import { sendEmail } from "../src/email";
import crypto from "crypto";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { action } = req.query;

    if (action === 'signup') {
      const parse = signupSchema.safeParse(req.body);
      if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
      const { name, email, password } = parse.data;

      try {
        const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
        if (existing.rows.length > 0) {
          return res.status(409).json({ error: "Email already registered" });
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        const result = await sql`INSERT INTO users (name, email, password_hash, role) VALUES (${name}, ${email}, ${passwordHash}, 'user') RETURNING id`;
        const userId = result.rows[0].id;
        const token = signJwt({ userId, role: "user", email });

        return res.json({ token, user: { id: userId, name, email, role: "user" } });
      } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    if (action === 'login') {
      const parse = loginSchema.safeParse(req.body);
      if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
      const { email, password } = parse.data;

      try {
        const result = await sql`SELECT id, name, email, password_hash, role FROM users WHERE email = ${email}`;
        const user = result.rows[0];

        if (!user || !bcrypt.compareSync(password, user.password_hash)) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = signJwt({ userId: user.id, role: user.role, email: user.email });

        // Log signin (without Socket.IO)
        const ip = Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for'] || req.connection?.remoteAddress || null;
        const userAgent = req.headers['user-agent'] || null;
        await sql`INSERT INTO signins (user_id, ip, user_agent) VALUES (${user.id}, ${ip}, ${userAgent})`;

        return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
      } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    if (action === 'logout') {
      return res.json({ success: true });
    }

    if (action === 'forgot-password') {
      const emailSchema = z.object({ email: z.string().email() });
      const parse = emailSchema.safeParse(req.body);
      if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
      const { email } = parse.data;

      try {
        const result = await sql`SELECT id FROM users WHERE email = ${email}`;
        if (result.rows.length > 0) {
          const token = crypto.randomBytes(32).toString("hex");
          const expiresAt = Date.now() + 1000 * 60 * 30; // 30 minutes
          await sql`INSERT INTO reset_tokens (token, user_id, expires_at) VALUES (${token}, ${result.rows[0].id}, ${expiresAt}) ON CONFLICT (token) DO UPDATE SET user_id = EXCLUDED.user_id, expires_at = EXCLUDED.expires_at`;

          const appUrl = process.env.APP_URL || "http://localhost:8080";
          const link = `${appUrl}/reset-password?token=${token}`;
          await sendEmail(email, "Reset your MindMatters password", `<p>Click the link to reset your password:</p><p><a href="${link}">${link}</a></p><p>This link expires in 30 minutes.</p>`);
        }
        return res.json({ success: true });
      } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    if (action === 'reset-password') {
      const schema = z.object({ token: z.string().min(1), password: z.string().min(8) });
      const parse = schema.safeParse(req.body);
      if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
      const { token, password } = parse.data;

      try {
        const result = await sql`SELECT user_id, expires_at FROM reset_tokens WHERE token = ${token}`;
        const row = result.rows[0];

        if (!row || row.expires_at < Date.now()) {
          return res.status(400).json({ error: "Invalid or expired token" });
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        await sql`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${row.user_id}`;
        await sql`DELETE FROM reset_tokens WHERE token = ${token}`;

        return res.json({ success: true });
      } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    return res.status(400).json({ error: 'Invalid action' });
  }

  if (req.method === 'GET') {
    const { action } = req.query;

    if (action === 'me') {
      // This would need authentication middleware
      return res.status(401).json({ error: 'Not implemented' });
    }

    return res.status(400).json({ error: 'Invalid action' });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
