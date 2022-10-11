const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
router.use(cookieParser());
const auth = require('../middlewares/auth_middleware.js');
const {Comment} = require('../models');

/* 댓글 생성
req : {"comment": "안녕하세요 댓글입니다."}
res : {"message": "댓글을 작성하였습니다."}
*/
router.post('/comments/:postId',auth,async (req,res)=>{

    const postId = req.params.postId;
    const { userId,nickname } = res.locals.user;
    const { comment } = req.body;
    console.log(postId,userId,nickname,comment);

    try {
        const result = await Comment.create({
            'postId':postId,
            'userId':userId,
            'nickname':nickname,
            'comment':comment
        });
        res.status(200).send({"message": "댓글을 작성하였습니다."});
    } catch (error) {
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }
})

/* 글에 대한 댓글 목록 전체 조회
req : -
req : {"data": [{"commentId": 2,"userId": 1,"nickname": "Developer","comment": "안녕하세요 2번째 댓글입니다.","createdAt": "2022-07-25T07:54:24.000Z","updatedAt": "2022-07-25T07:54:24.000Z"}
*/
router.get('/comments/:postId',async (req,res)=>{
    const postId = req.params.postId;
    try {
        const data = await Comment.findAll({
            where : {postId : postId}
        });
        res.status(200).send({data});
    } catch (error) {
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }
})


/* 댓글 수정
req : {"comment": "수정된 댓글입니다."}
res : {"message": "댓글을 수정하였습니다."}
*/
router.put('/comments/:commetId',auth,async (req,res)=>{
    const { comment } = req.body;
    const commetId = req.params.commetId;
    const { userId,nickname } = res.locals.user;
    try {
        const result = await Comment.update({
            'comment':comment
        },{
            where : {id : commetId,userId:userId}
        })

        if(!result[0]) res.status(400).send({"errorMessage": "수정 권한이 없습니다."});
        res.status(200).send({"message": "댓글을 수정하였습니다."});
    } catch (error) {
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }    
})



/* 댓글 삭제
req : -
res : {"message": "댓글을 삭제하였습니다."}
*/
router.delete('/comments/:commetId',auth,async (req,res)=>{
    const commetId = req.params.commetId;
    const { userId,nickname } = res.locals.user;

    try {
        const result = await Comment.destroy({
            where:{id:commetId,userId:userId}
        });
        if(!result) res.status(400).send({"errorMessage": "삭제 권한이 없습니다."});
        res.status(200).send({"message": "댓글을 삭제하였습니다."});
    } catch (error) {
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }
})




module.exports = router;