const express = require("express");
const disease = require("./routes/diseaseRoute");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//1) MIDDLEWARE
app.use(express.json()) //This MiddleWare used for reading JSON data came through POST request

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname,"views")); // Setting Templates

app.use(express.static(path.join(__dirname,"public"))); //Reading Static Files Like(HTML,CSS,JS)


// 3) ROUTES
app.use("/api/v1/medical",disease)
module.exports = app;