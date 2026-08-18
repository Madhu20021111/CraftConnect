const bcrypt = require('bcryptjs');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

async function restoreAdmin() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin@123!', salt);
  const adminEmail = 'niroshamadumali37@gmail.com';

  const existingUser = await db.get('SELECT id FROM users WHERE LOWER(email) = ?', [adminEmail.toLowerCase()]);

  let userId;
  if (existingUser) {
    await db.run(
      'UPDATE users SET password = ?, role = ?, name = ? WHERE id = ?',
      [hashedPassword, 'admin', 'Nirosha (Admin)', existingUser.id]
    );
    userId = existingUser.id;
    console.log(`Updated existing user ID: ${userId}`);
  } else {
    const result = await db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Nirosha (Admin)', adminEmail, hashedPassword, 'admin']
    );
    userId = result.lastID;
    console.log(`Created new admin user ID: ${userId}`);
  }

  const existingArtisan = await db.get('SELECT id FROM artisans WHERE LOWER(email) = ?', [adminEmail.toLowerCase()]);
  if (existingArtisan) {
    await db.run('UPDATE artisans SET user_id = ? WHERE id = ?', [userId, existingArtisan.id]);
    console.log(`Linked existing artisan ID: ${existingArtisan.id}`);
  } else {
    const artResult = await db.run(
      'INSERT INTO artisans (user_id, name, email, craft_type, village) VALUES (?, ?, ?, ?, ?)',
      [userId, 'Nirosha (Admin)', adminEmail, 'Pottery & Craft Admin', 'Embilipitiya']
    );
    console.log(`Created new artisan profile ID: ${artResult.lastID}`);
  }

  const user = await db.get('SELECT id, name, email, role FROM users WHERE id = ?', [userId]);
  console.log('Restored Admin Profile:', user);
}

restoreAdmin().catch(console.error);
