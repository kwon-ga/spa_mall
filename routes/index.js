const express = require('express');
const router = express.Router();

// routes
const userRouter = require('./user.js');
const postrouter = require('./post.js');
const commentrouter = require('./comment.js');


router.use("/",[userRouter,postrouter,commentrouter]);

module.exports = router;