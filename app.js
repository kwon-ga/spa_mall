const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const indexrouter = require('./routes/index.js');

// 몽고 db 연결
mongoose.connect("mongodb://localhost:27017/todo-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


router.get("/",(req, res) => {
  
  res.send("Hi!");
});


app.use("/", [bodyParser.json(),cookieParser()], indexrouter);
app.use(express.static("./assets"));


app.listen(3000, () => {
  console.log("서버가 켜졌어요!");
});