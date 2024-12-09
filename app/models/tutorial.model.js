const db = require("./db");

// Initialize table
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS tutorial (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      published BOOLEAN DEFAULT false
    )`
  );  
});

// CRUD functions
const Tutorial = {
  create: (tutorial, callback) => {
    const sql = "INSERT INTO tutorial (title, description, published) VALUES (?, ?, ?)";
    const params = [tutorial.title, tutorial.description, tutorial.published];
    db.run(sql, params, function (err) {
      callback(err, { id: this.lastID, ...tutorial });
    });
  },

  findAll: (callback) => {
    const sql = "SELECT * FROM tutorial";
    db.all(sql, [], (err, rows) => callback(err, rows));
  },
  
  findById: (id, callback) => {
    const sql = "SELECT * FROM tutorial WHERE id = ?";
    db.get(sql, [id], (err, row) => callback(err, row));
  },

  findPublished: (callback) => {
    const sql = "SELECT * FROM tutorial WHERE published = ?";
    db.all(sql, [1], (err, rows) =>  callback(err, rows));
  },

  getMatchedTitles: (title, callback) => {
    const finalTitle = `%${title}%`;
    console.log(finalTitle);
    const sql = "SELECT * FROM tutorial WHERE title LIKE ?";
    db.get(sql, [finalTitle], (err, row) => callback(err, row));
  },

  update: (id, tutorial, callback) => {
    const sql = "UPDATE tutorial SET title = ?, description = ?, published = ? WHERE id = ?";
    const params = [tutorial.title, tutorial.description, tutorial.published, id];
    console.log(params);
    db.run(sql, params, function (err) {
      callback(err, { id, ...tutorial });
    });
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM tutorial WHERE id = ?";
    db.run(sql, [id], function (err) {
      callback(err);
    });
  },

  deleteAll: (callback) => {
    const sql = "DELETE FROM tutorial";
    db.run(sql, [], function (err) {
      callback(err);
    });
  }

};

module.exports = Tutorial;
