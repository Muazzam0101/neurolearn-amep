const { Client } = require('pg');
require('dotenv').config();

async function setupDatabase() {
  // First connect to postgres database to create amep_db
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres', // Connect to default postgres database
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );

    if (result.rows.length === 0) {
      // Create database
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database ${process.env.DB_NAME} created successfully`);
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists`);
    }

    await client.end();
    console.log('Database setup completed');
  } catch (error) {
    console.error('Database setup error:', error.message);
    console.log('\nPlease ensure:');
    console.log('1. PostgreSQL is installed and running');
    console.log('2. Username and password in .env are correct');
    console.log('3. PostgreSQL is running on port 5432');
  }
}

setupDatabase();