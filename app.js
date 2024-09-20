const express = require("express");
const app = express();
const path = require("path");
//dotenv
const dotenv = require("dotenv"); // require
dotenv.config({path: "./.env"}); // link with app.js

const logger = require("morgan");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger("combined"));
const indexRouter = require("./routes/index")

const userModel = require("./modeles/db");  // schema link

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(process.env.PORT,()=>{
    console.log(`the server is running on PORT ${process.env.PORT}`);
})