const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

async function migrate() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  try {
    console.log("Creating users table...");
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        role TEXT DEFAULT 'pending',
        auth_provider TEXT DEFAULT 'google'
      );
    `);
    
    console.log("Adding columns to artisans table...");
    try {
      await db.exec("ALTER TABLE artisans ADD COLUMN user_id INTEGER REFERENCES users(id);");
    } catch (e) {
      console.log("user_id column might already exist", e.message);
    }
    
    try {
      await db.exec("ALTER TABLE artisans ADD COLUMN image_url TEXT;");
    } catch (e) {
      console.log("image_url column might already exist", e.message);
    }

    console.log("Migration successful!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
