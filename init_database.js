const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

function init_database(data) {
  let sql;
  let db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  });
  //console.log(data);

  //sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,username, password, email)`;
  //db.run(sql);

  // db.close((err) => {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log('Close the database connection.');
  // });

  //update users
  // sql = `INSERT INTO users(first_name, last_name,username,password,email) VALUES (?,?,?,?,?)`;
  // db.run((sql),['iman', 'khan', 'imankhan', 'password', '829334@gmail.com'], (err)=>{
  //     if (err) return console.error(err.message);
  // })

  //update data
//   sql = `UPDATE users SET first_name = ? WHERE id = ?`;
//   db.run(sql, ['Sarah',1], (err)=>{
//     if (err) return console.error(err.message);
//   })

  sql = `SELECT * FROM users`;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

axios
  .get(
    "https://gist.githubusercontent.com/faizaanmadhani/6bf87ac6d8975b2bd45aba9fd96515ca/raw/795f99b519d6e2c33bb2b89c0707be7f06cff95d/HTN_2023_BE_Challenge_Data.json"
  )
  .then((data) => init_database(data));
