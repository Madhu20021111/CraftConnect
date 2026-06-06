const pool = require("./config/db");

async function run() {
  try {
    const { rows } = await pool.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'artisans'"
    );
    console.log(rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
run();
