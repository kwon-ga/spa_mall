const express = require("express");
const router = express.Router();
const postroutes = require('./posts.js');
const commentroutes = require('./comment.js');
// const levelroutes = require('./level.js');

const todorouter = require('./todos.js');
const cookierouter = require('./cookie.js');

// 개인 과제 라우터
router.use('/', [commentroutes,postroutes,cookierouter]);

//심화 라우터
router.use('/api',todorouter);

// // 마운트 경로가 없는 미들웨어, 항상 실행된다.
// router.use((req, res, next) => {
//     console.log('저는 마운트 경로가 없습니다.');
//     next();
// });

// // /path 경로로 들어오는 모든 요청에 대해 항상 실행
// router.use('/path/:id', (req, res, next) => {
//     console.log('Request URL:', req.originalUrl);
//     next();
// }, (req, res, next) => {
//     console.log('Request Type:', req.method);
//     next();
// });

// // /path 경로로 들어오는 get 요청에 대해 실행
// router.get('/path/:id', (req, res, next) => {
//     // id 값이 0이면 다음 라우트로
//     if (req.params.id == 0) next('route');
//     // id 값이 0이 아니면 다음 함수로
//     else next(); 
// }, (req, res, next) => {
//     console.log('end point : regular !!');
//     res.send('regular');
// });

// router.get('/path/:id', (req, res, next) => {
//     console.log('end point : special !!');
//     res.send('special');
// });

module.exports = router;