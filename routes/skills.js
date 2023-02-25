const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
 
let sql;
let db = new sqlite3.Database("./skills.db", sqlite3.OPEN_READWRITE, (err) => {
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

router.get("/frequency", async (req, res) => {
  try {
    let { skill } = await req.query;

    skill = '"' + skill + '"'

    let sql = `SELECT ${skill} FROM skills`

    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      } else {
        let numUsers = 0;
        for (let i=0; i<rows.length; i++){
          const row = rows[i];

          const val = Object.keys(row).map(function(key) {
            return row[key];
          })

          if (val[0] > 0){
            numUsers+=1
          }
        }

        return res.json({skill: req.query.skill, frequency: numUsers});
      }
    });
  } catch (error) {
    return console.error(error.message);
  }
});

router.get("/frequency", async (req, res) => {
  try {
    let { skill } = await req.query;

    skill = '"' + skill + '"'

    let sql = `SELECT ${skill} FROM skills`

    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      } else {
        let numUsers = 0;
        for (let i=0; i<rows.length; i++){
          const row = rows[i];

          const val = Object.keys(row).map(function(key) {
            return row[key];
          })

          if (val[0] > 0){
            numUsers+=1
          }
        }

        return res.json({skill: req.query.skill, frequency: numUsers});
      }
    });
  } catch (error) {
    return console.error(error.message);
  }
});

module.exports = router;