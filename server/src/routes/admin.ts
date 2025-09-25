import { Router } from "express";
import { getDb } from "../setup";
import { requireAuth, requireAdmin } from "../middleware";

const router = Router();

router.get(
  "/entries",
  requireAuth as any,
  requireAdmin as any,
  (_req, res) => {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT s.id, s.created_at as signed_in_at, s.ip, s.user_agent,
                u.id as user_id, u.name, u.email, u.role
         FROM signins s
         JOIN users u ON u.id = s.user_id
         ORDER BY s.created_at DESC`
      )
      .all();
    db.close();
    res.json({ entries: rows });
  }
);

router.get(
  "/profiles",
  requireAuth as any,
  requireAdmin as any,
  (_req, res) => {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT u.id as user_id, u.name, u.email, u.role,
                p.age, p.locality, p.personal_notes as personalNotes, p.goals, p.updated_at
         FROM users u
         LEFT JOIN profiles p ON p.user_id = u.id
         ORDER BY u.created_at DESC`
      )
      .all();
    db.close();
    res.json({ profiles: rows });
  }
);

export default router;



