const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
 
let sql;
let db = new sqlite3.Database("./skill.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

router.get("/all", async (req, res) => {
    try {
      sql = `SELECT * FROM skills`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        } else {
          return res.json(rows);
        }
      });
    } catch (error) {
      return console.error(error.message);
    }
});

module.exports = router;