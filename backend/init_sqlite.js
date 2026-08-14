const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

async function setup() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      name TEXT,
      role TEXT DEFAULT 'artisan',
      auth_provider TEXT DEFAULT 'local'
    );

    CREATE TABLE IF NOT EXISTS artisans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      village TEXT,
      craft_type TEXT,
      years_experience INTEGER,
      contact_number TEXT,
      email TEXT,
      image_url TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artisan_id INTEGER,
      name TEXT,
      description TEXT,
      category TEXT,
      material TEXT,
      color TEXT,
      size TEXT,
      price REAL,
      image_url TEXT,
      FOREIGN KEY(artisan_id) REFERENCES artisans(id)
    );
  `);

  console.log("Database initialized.");
  
  // Insert some mock artisans if empty
  const count = await db.get("SELECT COUNT(*) as count FROM artisans");
  if (count.count === 0) {
    await db.run("INSERT INTO artisans (name, craft_type, village, years_experience) VALUES ('Rania Al-Farsi', 'Pottery', 'Nizwa, Oman', 10)");
    await db.run("INSERT INTO artisans (name, craft_type, village, years_experience) VALUES ('Devi Krishnan', 'Weaving', 'Thanjavur, India', 15)");
    console.log("Inserted mock artisans.");
  }
}

setup().catch(console.error);
