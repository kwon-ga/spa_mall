const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const express = require("express");
const { request } = require('express');
const port = 3000;

const app = express();

const indexrouter = require('./routes/index.js');

app.use("/", [express.urlencoded({ extended: false }),express.json()], indexrouter);


app.get('/',(req,res)=>{
    res.send('해윙~!');
})


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
})