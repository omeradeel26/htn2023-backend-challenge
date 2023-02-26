const e = require("express");
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
        let sql = `SELECT * FROM skills WHERE id = ?`;
        skillsDb.get(sql, [id], (err, response) => {
          if (err) {
            return console.error(err.message);
          } else {
            const skills = Object.keys(response);
            for (i = 0; i < skills.length; i++) {
              if (response[skills[i]] == 0) {
                delete response[skills[i]];
              }
            }
            delete response.id;
            row.skills = response;
            return res.json(row);
          }
        });
      }
    });
  } catch (error) {
    return console.error(error.message);
  }
});

router.put("/update", async (req, res) => {
  const { skills, f_name, l_name, company, email, phone, id } = await req.body;

  if (
    !(
      f_name == undefined &&
      l_name == undefined &&
      company == undefined &&
      email == undefined &&
      phone == undefined
    )
  ) {
    sql = `UPDATE users SET`;

    const vars = [];

    if (f_name != undefined) {
      vars.push(f_name);
      sql += ` first_name = ?,`;
    }

    if (l_name != undefined) {
      vars.push(l_name);
      sql += ` last_name = ?,`;
    }

    if (company != undefined) {
      vars.push(company);
      sql += ` company = ?,`;
    }

    if (phone != undefined) {
      vars.push(phone);
      sql += ` phone = ?,`;
    }

    if (email != undefined) {
      vars.push(email);
      sql += ` email = ?`;
    }

    sql += ` WHERE id = ?`;
    vars.push(id);

    try {
      await db.run(sql, vars, (err) => {
        if (err) return console.error(err.message);
        res.status(200).json({ status: "success" });
      });
    } catch (error) {
      res.status(400).json({ status: "failure" });
      return console.error(error.message);
    }
  }

  if (skills != undefined) {
    try {
      let sql = `SELECT * FROM users WHERE id = ?`;

      skillsDb.all("SELECT * FROM skills LIMIT 1", [], (err, rows) => {
        if (err) {
          console.error(err.message);
        } else {
          const columns = Object.keys(rows[0]);
          for (let i = 0; i < skills.length; i++) {
            let { skill } = skills[i];
            if (!columns.includes(skill)) {
              skill = `"` + skill + `"`;

              sql = `ALTER TABLE skills ADD ${skill} INTEGER DEFAULT 0`;
              skillsDb.run(sql, [], (err) => {
                if (err) console.error(err);
              });
            }
          }
        }
      });

      for (let i = 0; i < skills.length; i++) {
        let { skill, rating } = skills[i];
        skill = `"` + skill + `"`;
        sql = `UPDATE skills SET ${skill} = ? WHERE id = ?`;
        skillsDb.run(sql, [rating, id], (err) => {
          if (err) console.error(err);
        });
      }
    } catch (error) {
      res.status(400).json({ status: "failure" });
      return console.error(error.message);
    }
  }
});

module.exports = router;
