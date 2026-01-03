const pool = require('./db');

async function addResetTokenFields() {
  try {
    // Add reset token fields to users table
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
      ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP
    `);
    
    console.log('Reset token fields added successfully');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await pool.end();
  }
}

addResetTokenFields();