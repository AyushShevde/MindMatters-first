import express from "express";
import cors from "cors";
import path from "path";
import { ensureDatabase } from "./setup";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";
import profileRouter from "./routes/profile";
import journalRouter from "./routes/journal";
import activitiesRouter from "./routes/activities";
import mentorsRouter from "./routes/mentors";
import communityRouter from "./routes/community";
import bookingsRouter from "./routes/bookings";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

ensureDatabase();

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({
    message: "MindMatters API",
    health: "/health",
    auth: {
      signup: { method: "POST", path: "/auth/signup" },
      login: { method: "POST", path: "/auth/login" },
      logout: { method: "POST", path: "/auth/logout" }
    },
    admin: { entries: { method: "GET", path: "/admin/entries" } }
  });
});

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/profile", profileRouter);
app.use("/journal", journalRouter);
app.use("/activities", activitiesRouter);
app.use("/mentors", mentorsRouter);
app.use("/community", communityRouter);
app.use("/bookings", bookingsRouter);

// Note: Static file serving disabled in dev to avoid ESM __dirname issues

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});
