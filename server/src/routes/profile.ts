import { Router } from "express";
import { z } from "zod";
import { getDb } from "../setup";
import { requireAuth } from "../middleware";

const router = Router();

router.get("/me", requireAuth as any, (req: any, res) => {
  const userId = req.user.userId as number;
  const db = getDb();
  const user = db.prepare("SELECT id, name, email, role FROM users WHERE id = ?").get(userId);
  const profile = db
    .prepare(
      "SELECT age, locality, personal_notes as personalNotes, goals FROM profiles WHERE user_id = ?"
    )
    .get(userId) || { age: null, locality: null, personalNotes: "", goals: "" };
  db.close();
  res.json({ user, profile });
});

const updateSchema = z.object({
  name: z.string().min(1),
  age: z.union([z.number().int().min(0), z.string().regex(/^\d+$/).transform(Number)]).optional(),
  locality: z.string().optional(),
  personalNotes: z.string().optional(),
  goals: z.string().optional(),
});

router.put("/me", requireAuth as any, (req: any, res) => {
  const userId = req.user.userId as number;
  const parse = updateSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const { name, age, locality, personalNotes, goals } = parse.data as any;

  const db = getDb();
  db.prepare("UPDATE users SET name = ? WHERE id = ?").run(name, userId);

  const exists = db.prepare("SELECT user_id FROM profiles WHERE user_id = ?").get(userId);
  if (exists) {
    db.prepare(
      "UPDATE profiles SET age = ?, locality = ?, personal_notes = ?, goals = ?, updated_at = datetime('now') WHERE user_id = ?"
    ).run(age ?? null, locality ?? null, personalNotes ?? "", goals ?? "", userId);
  } else {
    db.prepare(
      "INSERT INTO profiles (user_id, age, locality, personal_notes, goals) VALUES (?, ?, ?, ?, ?)"
    ).run(userId, age ?? null, locality ?? null, personalNotes ?? "", goals ?? "");
  }
  const user = db.prepare("SELECT id, name, email, role FROM users WHERE id = ?").get(userId);
  const profile = db
    .prepare(
      "SELECT age, locality, personal_notes as personalNotes, goals FROM profiles WHERE user_id = ?"
    )
    .get(userId) || { age: null, locality: null, personalNotes: "", goals: "" };
  db.close();
  res.json({ user, profile });
});

export default router;



