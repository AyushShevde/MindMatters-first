import { sql } from '@vercel/postgres';
import bcrypt from "bcryptjs";

export const ensureDatabase = async () => {
  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS profiles (
        user_id INTEGER PRIMARY KEY REFERENCES users(id),
        age INTEGER,
        locality TEXT,
        personal_notes TEXT,
        goals TEXT,
        gad7_score REAL,
        phq9_score REAL,
        ghq12_score REAL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS signins (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        ip TEXT,
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS reset_tokens (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        expires_at BIGINT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        date TEXT NOT NULL,
        mood TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        duration TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        benefits TEXT NOT NULL,
        icon TEXT,
        color TEXT,
        recommended_for TEXT,
        video_url TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS activity_completions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        activity_id TEXT NOT NULL REFERENCES activities(id),
        completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        notes TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS peer_mentors (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        specialization TEXT,
        qualification TEXT,
        year TEXT,
        languages TEXT,
        available BOOLEAN NOT NULL DEFAULT true,
        rating REAL DEFAULT 0,
        sessions INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS community_posts (
        id SERIAL PRIMARY KEY,
        topic TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        replies INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS counselors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        specialization TEXT,
        experience TEXT,
        languages TEXT,
        rating REAL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS counselor_availability (
        id SERIAL PRIMARY KEY,
        counselor_id TEXT NOT NULL REFERENCES counselors(id),
        date TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        is_booked BOOLEAN NOT NULL DEFAULT false,
        UNIQUE(counselor_id, date, time_slot)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        counselor_id TEXT NOT NULL REFERENCES counselors(id),
        date TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        issue TEXT,
        urgency TEXT,
        notes TEXT,
        status TEXT NOT NULL DEFAULT 'scheduled',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS assessments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        assessment_type TEXT NOT NULL,
        answers TEXT NOT NULL,
        results TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed counselors if empty
    const countResult = await sql`SELECT COUNT(*) as c FROM counselors`;
    if (parseInt(countResult.rows[0].c) === 0) {
      const counselors = [
        { id: "dr-sharma", name: "Dr. Priya Sharma", specialization: "Anxiety & Depression", experience: "8 years", languages: "Hindi, English, Punjabi", rating: 4.9 },
        { id: "dr-kumar", name: "Dr. Raj Kumar", specialization: "Academic Stress & Career Counseling", experience: "6 years", languages: "Hindi, English, Urdu", rating: 4.8 },
        { id: "dr-singh", name: "Dr. Aman Singh", specialization: "Relationship & Social Issues", experience: "5 years", languages: "Hindi, English", rating: 4.7 },
      ];

      for (const counselor of counselors) {
        await sql`INSERT INTO counselors (id, name, specialization, experience, languages, rating) VALUES (${counselor.id}, ${counselor.name}, ${counselor.specialization}, ${counselor.experience}, ${counselor.languages}, ${counselor.rating})`;
      }
    }

    // Seed a default admin user if none exists
    const adminResult = await sql`SELECT COUNT(*) as c FROM users WHERE email = 'admin@mindmatters.local'`;
    if (parseInt(adminResult.rows[0].c) === 0) {
      const name = "Admin";
      const email = "admin@mindmatters.local";
      const passwordHash = bcrypt.hashSync("admin12345", 10);
      await sql`INSERT INTO users (name, email, password_hash, role) VALUES (${name}, ${email}, ${passwordHash}, 'admin')`;
    }

    console.log('Database setup completed');
  } catch (error) {
    console.error('Database setup error:', error);
    throw error;
  }
};
