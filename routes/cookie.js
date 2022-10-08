const express = require('express');
const router = express.Router();



// // Set-Cookie로 할당
// router.get("/set-cookie", (req, res) => {
//   const expire = new Date();
//   expire.setMinutes(expire.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

//   res.writeHead(200, {
//     'Set-Cookie': `name=kim; Expires=${expire.toGMTString()}; HttpOnly; Path=/`,
//   });
//   return res.status(200).end();
// });

// // res.cookie로 할당하기
// router.get("/set-cookie", (req, res) => {
//     const expires = new Date();
//     expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

//     res.cookie('name', 'kim', {
//         expires: expires,
//         path: '/'
//     });
//     return res.status(200).end();
// });


// // req로 cookie 접근하기
// router.get('/get-cookie',(req,res)=>{
//     const cookie = req.headers.cookie;

//     console.log(cookie);

//     return res.status(200).json({cookie});

// })


// cookie-parser
router.get('/get-cookie',(req,res)=>{
    const cookie = req.cookies;

    console.log(cookie);

    return res.status(200).json({cookie});

})

let session = {};
router.get('/set-session', (req, res, next) => {
    const name = 'kim';
    const uniqueInt = Date.now();
    session[uniqueInt] = { name };

    res.cookie('sessionKey', uniqueInt);
    return res.status(200).end();
});


router.get('/get-session', (req, res, next) => {
    const { sessionKey } = req.cookies;
    const name = session[sessionKey];
    console.log(name); 
    return res.status(200).json({ name });
});



// 연습문제
router.get('/set',(req,res) => {
    const name = 'nodejs';
    let sessionKey = Date.now();
    session[sessionKey] = name;
    console.log(session[sessionKey],sessionKey)
    res.cookie('sessionKey',sessionKey);
    return res.status(200).end();
})

router.get('/get',(req,res)=>{
    let { sessionKey }= req.cookies;
    let data = session[sessionKey];

    console.log(sessionKey,data,session)

    res.send({data});
})

module.exports = router;