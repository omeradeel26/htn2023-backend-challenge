const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

let sql;
let db = new sqlite3.Database(
  "./database/users.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
  }
);

let skillsDb = new sqlite3.Database(
  "./database/skills.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
  }
);

router.post("/enroll", async (req, res) => {
  const { name, email, company, phone } = req.body;

  const [f_name, l_name] = name.split(" ");

  try {
    sql = `INSERT INTO users(first_name, last_name, company, email, phone, events) VALUES (?,?,?,?,?,?)`;

    db.run(sql, [f_name, l_name, company, email, phone, "[]"], (err) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.status(200).json({ status: "success" });
      }
    });
  } catch (error) {
    res.status(400).json({ status: "failure" });
    return console.error(error.message);
  }
});

router.delete("/unenroll", async (req, res) => {
  const { id } = req.query;

  try {
    sql = `DELETE FROM users WHERE id = ?`;

    db.run(sql, [id], (err) => {
      if (err) {
        res.status(200).json({ status: "failure" });
        return console.error(err.message);
      }
    });

    sql = `DELETE FROM skills WHERE id = ?`;

    skillsDb.run(sql, [id], (err) => {
      if (err) {
        res.status(200).json({ status: "failure" });
        return console.error(err.message);
      } else {
        res.status(400).json({ status: "success" });
        return console.error(err.message);
      }
    });
  } catch (error) {
    return console.error(error.message);
  }
});

module.exports = router;
