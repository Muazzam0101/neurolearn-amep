const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create SQLite database
const dbPath = path.join(__dirname, 'amep.db');
const db = new sqlite3.Database(dbPath);

// Create users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('student', 'teacher')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('SQLite users table created successfully');
    }
  });
});

module.exports = db;