"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdminData = seedAdminData;
const setup_1 = require("../setup");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function seedAdminData() {
    const db = (0, setup_1.getDb)();
    // Insert sample users if not exist
    const adminPasswordHash = bcryptjs_1.default.hashSync('password', 10);
    const userPasswordHash = bcryptjs_1.default.hashSync('password', 10);
    db.prepare(`
    INSERT OR IGNORE INTO users (id, name, email, role, created_at, password_hash)
    VALUES 
      (1, 'Admin User', 'admin@mindmatters.local', 'admin', datetime('now'), ?),
      (2, 'User A', 'user1@example.com', 'user', datetime('now', '-1 day'), ?),
      (3, 'User B', 'user2@example.com', 'user', datetime('now', '-2 days'), ?),
      (4, 'User C', 'user3@example.com', 'user', datetime('now', '-3 days'), ?),
      (5, 'User D', 'user4@example.com', 'user', datetime('now', '-4 days'), ?)
  `).run(adminPasswordHash, userPasswordHash, userPasswordHash, userPasswordHash, userPasswordHash);
    // Insert sample profiles with assessment scores
    db.prepare(`
    INSERT OR IGNORE INTO profiles (user_id, age, locality, personal_notes, goals, gad7_score, phq9_score, ghq12_score, updated_at)
    VALUES 
      (2, 20, 'Campus Dorm', 'Feeling stressed with exams', 'Reduce anxiety', 12.5, 8.0, 10.2, datetime('now', '-1 day')),
      (3, 21, 'City Center', 'Dealing with depression', 'Build support network', 8.0, 15.3, 7.5, datetime('now', '-2 days')),
      (4, 19, 'Suburbs', 'High stress levels', 'Improve coping skills', 14.2, 10.1, 13.8, datetime('now', '-3 days')),
      (5, 22, 'Near Campus', 'Moderate anxiety', 'Daily meditation', 9.5, 6.2, 9.0, datetime('now', '-4 days'))
  `).run();
    // Insert sample signins for recent days (to simulate real logins)
    const daysBack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // last 10 days
    daysBack.forEach((days, index) => {
        const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
        const userId = (index % 4) + 2; // cycle through users 2-5
        const ip = `192.168.1.${(index % 256) + 1}`;
        const userAgent = `Mozilla/5.0 (real login ${index})`;
        db.prepare(`
      INSERT OR IGNORE INTO signins (user_id, ip, user_agent, created_at)
      VALUES (?, ?, ?, ?)
    `).run(userId, ip, userAgent, date);
    });
    db.close();
    console.log('Sample admin data seeded successfully.');
}
seedAdminData();
