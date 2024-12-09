const sqlite3 = require("sqlite3").verbose();
const config = require("../config/db.config");

const db = new sqlite3.Database(`./${config.DB_NAME}`, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

module.exports = db;
  