const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

let sql;
let db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

router.get("/all", async (req, res) => {
  try {
    sql = `SELECT * FROM users`;
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

router.get("/:id", async (req, res) => {
  const { id } = await req.params;

  try {
    let sql = `SELECT * FROM users WHERE id = ?`;
    await db.get(sql, [id], (err, row) => {
      if (err) {
        return console.error(err.message);
      } else {
        return res.json(row);
      }
    });
  } catch (error) {
    return console.error(error.message);
  }
});

router.put("/update", async (req, res) => {
  const { name, company, email, phone, id } = await req.query;

  try {
    sql = `UPDATE users SET first_name = ? last_name = ? company = ? email = ? phone = ? WHERE id = ?`;
    await db.run(sql, [name, company, email, phone, id], (err) => {
      if (err) return console.error(err.message);
      res.status({ code: 200, success: true });
    });
  } catch (error) {
    res.status({ code: 400, success: false });
    return console.error(error.message);
  }
});

module.exports = router;
