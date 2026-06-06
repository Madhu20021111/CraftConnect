const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

module.exports = dbPromise;
