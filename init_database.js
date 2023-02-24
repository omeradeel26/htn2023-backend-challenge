const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

async function createSkillsDB(skillsList) {
  let db = await new sqlite3.Database(
    "./skills.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (!err) {
        // initialize database
        sql = `CREATE TABLE skills(id INTEGER PRIMARY KEY,${skillsList.toString()})`;
        const params =
        console.log(sql);
        db.run(sql, async (err) => {
          if (!err) {
            sql = `INSERT INTO skills(${skillsList.toString()}) VALUES (?,?,?,?,?)`;
            console.log(sql);
            for (let i = 0; i < data.length; i++) {
              const { skills } = data[i];

              const skillsObject = skillsList.reduce(
                (a, key) => Object.assign(a, { [key]: 0 }),
                {}
              );

              for (let x = 0; x < skills.length; x++) {
                if (skillsObject.hasOwnProperty(skills[x].name)) {
                  skillsObject[skills[x].name] = skills[x].points;
                }
              }

              db.run(sql, [...skillsObject.values()], (err) => {
                if (err) return console.error(err.message);
              });
            }
          }
        });
      } else {
        return console.error(err.message);
      }
    }
  );

  sql = `SELECT * FROM skills`;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => console.log(row));
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

async function createUserDB(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let sql;
      const skillsList = [];
      let db = await new sqlite3.Database(
        "./users.db",
        sqlite3.OPEN_READWRITE,
        async (err) => {
          if (!err) {
            // initialize database
            sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,first_name, last_name, company, email, phone)`;
            await db.run(sql, (err) => {
              if (!err) {
                sql = `INSERT INTO users(first_name, last_name, company, email, phone) VALUES (?,?,?,?,?)`;
                for (let i = 0; i < data.length; i++) {
                  const { name, company, email, phone, skills } = data[i];
                  console.log(skills);
                  for (let x = 0; x < skills.length; x++) {
                    if (!skillsList.includes(skills[x].skill)) {
                      console.log(skills[x].skill);
                      skillsList.push(skills[x].skill);
                    }
                  }
                  const [f_name, l_name] = name.split(" ");
                  db.run(
                    sql,
                    [f_name, l_name, company, email, phone],
                    (err) => {
                      if (err) return console.error(err.message);
                    }
                  );
                }
                console.log(skillsList);
                resolve(skillsList);
              }
            });
          } else {
            return console.error(err.message);
          }
          console.log("Connected to the User SQlite database.");
        }
      );

      // sql = `SELECT * FROM users`;
      // db.all(sql, [], (err, rows) => {
      //   if (err) return console.error(err.message);
      //   rows.forEach((row) => {
      //     console.log(row);
      //   });
      // });

      await db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Close the database connection.");
      });
    } catch (error) {
      reject(error);
    }
  });
}
//update data
//   sql = `UPDATE users SET first_name = ? WHERE id = ?`;
//   db.run(sql, ['Sarah',1], (err)=>{
//     if (err) return console.error(err.message);
//   })

// sql = `SELECT * FROM users`;
// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   rows.forEach((row) => {
//     console.log(row);
//   });
// });

//return skillsList;

axios
  .get(
    "https://gist.githubusercontent.com/faizaanmadhani/6bf87ac6d8975b2bd45aba9fd96515ca/raw/795f99b519d6e2c33bb2b89c0707be7f06cff95d/HTN_2023_BE_Challenge_Data.json"
  )
  .then((res) => createUserDB(res.data))
  .then((res) => {
    createSkillsDB(res);
  });
