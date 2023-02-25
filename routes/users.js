const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

let sql;
let db = new sqlite3.Database("./database/users.db", sqlite3.OPEN_READWRITE, (err) => {
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
  const { name, company, email, phone, id, skills} = await req.query;

  console.log(name, company, email, phone, id)

  sql = `UPDATE users SET`;

  const vars = [];

  if (name != undefined){
    let [f_name, l_name] = name.split(" "); 
    vars.push(f_name)
    vars.push(l_name)
    sql += " first_name = ? last_name = ?"
  }
  
  if (company != undefined){
    vars.push(company)
    sql += " company = ?"
  }
  
  if (email != undefined){
    vars.push(email)
    sql += " email = ?"
  }
  
  if (phone != undefined){
    vars.push(phone)
    sql += " phone = ?"
  }

  sql += " WHERE id = ?"
  vars.push(id)

  console.log(sql)
  console.log(vars)

  try {
    await db.run(sql, vars, (err) => {
      if (err) return console.error(err.message);
      res.status({ code: 200, success: true });
    });
  } catch (error) {
    res.status({ code: 400, success: false });
    return console.error(error.message);
  }
});

module.exports = router;
