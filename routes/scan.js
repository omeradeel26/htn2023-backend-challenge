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

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let sql = `SELECT events FROM users WHERE id = ?`;
    await db.get(sql, [id], (err, row) => {
      if (err) {
        return console.error(err.message);
      } else {
        row.events = JSON.parse(row.events);
        return res.json(row);
      }
    });
  } catch (error) {
    res.status(400).json({ status: "failure" });
    return console.error(error.message);
  }
});

router.put("/event", async (req, res) => {
  const { id, eventName } = req.query;
  try {
    sql = `SELECT events FROM users WHERE id = ?`;
    await db.get(sql, [id], (err, row) => {
      if (err) {
        return console.error(err.message);
      } else {
        row.events = JSON.parse(row.events);
        if (!row.events.includes(eventName)) {
          row.events.push(eventName);
          sql = `UPDATE users SET events = ? WHERE id = ?`;
          const string = JSON.stringify(row.events);
          db.run(sql, [string, id], (err) => {
            if (err) return console.error(err.message);
            res.status(200).json({ status: "success" });
          });
        } else {
          res
            .status(200)
            .json({ status: "success", message: "Event already included." });
        }
      }
    });
  } catch (error) {
    res.status(400).json({ status: "failure" });
    return console.error(error.message);
  }
});

module.exports = router;
