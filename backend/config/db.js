const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPromise = (async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
  // Enforce foreign key constraints in SQLite
  await db.run("PRAGMA foreign_keys = ON;");
  return db;
})();

module.exports = dbPromise;
