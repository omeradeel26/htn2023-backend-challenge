//constants/dependencies
require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT;

//Routes
const usersRoute = require("./routes/users");
const scanRoute = require("./routes/scan");
const skillsRoute = require("./routes/skills");

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route connections
app.use("/users", usersRoute);
app.use("/scan", scanRoute);
app.use("/skills", skillsRoute);

app.listen(PORT, () => { console.log(`app listening on port ${PORT}`)})