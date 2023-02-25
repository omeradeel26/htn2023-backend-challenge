const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
 
let sql;
let db = new sqlite3.Database("./database/skills.db", sqlite3.OPEN_READWRITE, (err) => {
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

router.get("/frequencies", async (req, res) => {
  try {
    let sql = `SELECT * FROM skills`

    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      } else {
        let numUsers = 0;
        let columns;
        for (let i=0; i<rows.length; i++){
          if (i == 0){
            columns = Object.keys(rows[i]);
            columns = columns.reduce(
              (a, key) => Object.assign(a, { [key]: 0 }),
              {}
            );
          }

          const keys = Object.keys(columns);
          for (x=0; x<keys.length;x++){
            if (rows[i][keys[x]] > 0){
              columns[keys[x]] +=1;
            }
          }
        }
        delete columns.id;

        return res.json(columns);
      }
    });
  } catch (error) {
    return console.error(error.message);
  }
});

router.get("/frequencyFilter", async (req, res) => {
  try {
    let { minFreq, maxFreq} = await req.query;

    let sql = `SELECT * FROM skills`

    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      } else {
        let numUsers = 0;
        let columns;
        for (let i=0; i<rows.length; i++){
          if (i == 0){
            columns = Object.keys(rows[i]);
            columns = columns.reduce(
              (a, key) => Object.assign(a, { [key]: 0 }),
              {}
            );
          }

          const keys = Object.keys(columns);
          for (x=0; x<keys.length;x++){
            if (rows[i][keys[x]] > 0){
              columns[keys[x]] +=1;
            }
          }
        }
        delete columns.id;

        const keys = Object.keys(columns);
        for (x=0; x<keys.length;x++){
          if (columns[keys[x]] > maxFreq || columns[keys[x]] < minFreq){
            delete columns[keys[x]]
          }
        }
        
        return res.json(columns);
      }
    });
  } catch (error) {
    return console.error(error.message);
  }
});

module.exports = router;