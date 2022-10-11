const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
router.use(cookieParser());


//MySql
const { Op } = require('sequelize');
const { User } = require('../models');

// middleware
const auth = require('../middlewares/auth_middleware.js')



const singupSchema = Joi.object({
    nickname: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    password: Joi.string().min(5).required(),
    confirm : Joi.string().required()
});


/* 회원가입
req : nickname, password, confirm
res : {  "message": "회원 가입에 성공하였습니다."}
*/
router.post('/signup', async (req,res)=>{
    
    const {nickname, password, confirm} = await singupSchema.validateAsync(req.body).catch(error => res.status(400).send({errorMessage: "회원가입 실패"}));
    

    // 토큰을 확인해서 이미 로그인 된 유저인지 확인
    // if(!!req.cookies){
    //     res.status(400).send({
    //         errorMessage: "이미 로그인이 되어있습니다.",
    //     });
    //     return ;
    // }
    
    
    // 패스워드 일치여부
    if (password !== confirm) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
        });
        return;
    }


    // 비밀번호에 아이디 값이 포함되어있는지 확인
    if(password.indexOf(nickname) !== -1){

        res.status(400).send({
            errorMessage: "비밀번호에 아이디 값이 포함되어 있습니다.",
        });
        return ;
    }

    // db에 동일한 계정 확인
    const confirm_User = await User.findAll({
        where : { 'nickname' : nickname }
    });

    if(confirm_User.length){
        res.status(400).send({
            errorMessage: "닉네임이 이미 사용중입니다.",
        });
        return;
    }

    
    await User.create({ nickname, password });
    
    res.status(201).send({"message": "회원 가입에 성공하였습니다."});
})

/* 로그인
req : nickname, password
res : {"token": "토오오오오큰"}
*/
router.post('/login',async (req,res)=>{

    const {nickname, password} = req.body;
    
    // 토큰을 확인해서 이미 로그인 된 유저인지 확인
    // if(!!req.cookies){
    //     res.status(400).send({
    //         errorMessage: "이미 로그인이 되어있습니다.",
    //     });
    //     return ;
    // }


    // 일치하는 유저 검색
    const confirm_User = await User.findOne({
        where : { 'nickname' : nickname }
    });

    // 일치하는 유저가 없거나 비밀번호가 일치하지 않는 경우
    if(!confirm_User || confirm_User.password !== password){
        res.status(400).send({
            errorMessage: "아이디 또는 패스워드가 틀렸습니다.",
        });
        return;
    }
    
    // jwt token 
    const token = jwt.sign({"indexid":confirm_User.id,"joinDate":confirm_User.createdAt},'KwOnGaKeY');
    console.log(token)
    // 쿠키에 저장
    res.cookie('token',token);

    res.send({'token':token});
})


module.exports = router ; 
