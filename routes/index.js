const express = require("express");
const router = express.Router();
const postroutes = require('./posts.js');
const commentroutes = require('./comment.js');


router.use('/',commentroutes);
router.use('/',postroutes);

module.exports = router;