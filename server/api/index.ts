import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.status(200).json({
      message: "MindMatters API",
      health: "/api/health",
      auth: {
        signup: { method: "POST", path: "/api/auth/signup" },
        login: { method: "POST", path: "/api/auth/login" },
        logout: { method: "POST", path: "/api/auth/logout" }
      },
      admin: { entries: { method: "GET", path: "/api/admin/entries" } }
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
