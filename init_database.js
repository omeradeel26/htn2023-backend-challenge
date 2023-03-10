const axios = require("axios");
const sqlite3 = require("sqlite3");

async function createSkillsDB({ skillsList, data }) {
  try {
    let sql;
    let db = await new sqlite3.Database(
      "./database/skills.db",
      sqlite3.OPEN_READWRITE,
      async (err) => {
        if (!err) {
          // initialize database
          sql = `CREATE TABLE skills(id INTEGER PRIMARY KEY, ${skillsList.toString()})`;
          db.run(sql, (err) => {
            if (!err) {
              let initString = "(?";
              for (i = 1; i < skillsList.length; i++) {
                initString += ",?";
              }
              initString += ")";
              sql =
                `INSERT INTO skills(${skillsList.toString()}) VALUES ` +
                initString;

              for (let i = 0; i < data.length; i++) {
                const { skills } = data[i];

                const skillsObject = skillsList.reduce(
                  (a, key) => Object.assign(a, { [key]: 0 }),
                  {}
                );

                for (let x = 0; x < skills.length; x++) {
                  if (
                    skillsObject.hasOwnProperty(`"` + skills[x].skill + `"`)
                  ) {
                    skillsObject[`"` + skills[x].skill + `"`] =
                      skills[x].rating;
                  }
                }

                const arr = Object.keys(skillsObject).map(function (key) {
                  return skillsObject[key];
                });

                db.run(sql, [...arr], (err) => {
                  if (err) return console.error(err.message);
                });
              }
            } else {
              console.log(err);
            }
          });
        } else {
          return console.error(err.message);
        }
        console.log("Connected to the Skills SQlite database.");
      }
    );

    await db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Close the database connection.");
    });
  } catch (error) {
    reject(error);
  }
}

async function createUserDB(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let sql;
      const skillsList = [];
      let db = await new sqlite3.Database(
        "./database/users.db",
        sqlite3.OPEN_READWRITE,
        async (err) => {
          if (!err) {
            // initialize database
            sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,first_name, last_name, company, email, phone, events)`;
            await db.run(sql, (err) => {
              if (!err) {
                sql = `INSERT INTO users(first_name, last_name, company, email, phone, events) VALUES (?,?,?,?,?,?)`;
                for (let i = 0; i < data.length; i++) {
                  const { name, company, email, phone, skills } = data[i];
                  for (let x = 0; x < skills.length; x++) {
                    if (!skillsList.includes(`"` + skills[x].skill + `"`)) {
                      skillsList.push(`"` + skills[x].skill + `"`);
                    }
                  }
                  const [f_name, l_name] = name.split(" ");
                  db.run(
                    sql,
                    [f_name, l_name, company, email, phone, "[]"],
                    (err) => {
                      if (err) return console.error(err.message);
                    }
                  );

                  if (i == data.length - 1) {
                    resolve({ skillsList: skillsList, data: data });
                  }
                }
              }
            });
          } else {
            return console.error(err.message);
          }
          console.log("Connected to the User SQlite database.");
        }
      );

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

axios
  .get(
    "https://gist.githubusercontent.com/faizaanmadhani/6bf87ac6d8975b2bd45aba9fd96515ca/raw/795f99b519d6e2c33bb2b89c0707be7f06cff95d/HTN_2023_BE_Challenge_Data.json"
  )
  .then((res) => createUserDB(res.data))
  .then((res) => {
    createSkillsDB(res);
  });
