const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth_middleware.js');
const { Post} = require('../models');
const { Like , sequelize} = require('../models');
const { Op } = require('sequelize');


/* 좋아요 게시글 조회
req : -
res : {"data": [{"postId": 4,"userId": 1,"nickname": "Developer","title": "안녕하세요 4번째 게시글 제목입니다.","createdAt": "2022-07-25T07:58:39.000Z","updatedAt": "2022-07-25T07:58:39.000Z","likes": 1}]}
*/
router.get('/posts/like',auth, async (req,res)=>{
    const { userId } = res.locals.user;
    const likeList = [];
    try {
        
        const like = await Like.findAll({ 
            attributes:['postId'],
            where : {userId:userId},
            raw: true
        })
        console.log(like)
        for(let likes of like){
            likeList.push({'id':likes.postId});
        }
        console.log(likeList)

        const data = await Post.findAll({
            where : {
                [Op.or] : likeList,
                userId:userId
            },
            order: [["like", "desc"]]
        })
        res.status(200).send({data});
    } catch (error) {
        res.status(400).send(error);    
    }


    
})

/* 좋아요 기능
req : -
res : {  "message": "게시글의 좋아요를 등록하였습니다."},{  "message": "게시글의 좋아요를 취소하였습니다."}
*/
router.put('/posts/:postId/like',auth,async (req,res)=>{
    const postId = req.params.postId;
    const { userId } = res.locals.user;
    try {
        let like = 0;

        const result = await Like.findOne({
            where : {postId:postId,userId:userId}
        })
        
        await Post.findOne({where : {id:postId}}).then((data)=>{
            like = data.like;
        })

        if(!result) {
            await Like.create({postId:postId,userId:userId});
            console.log('만들기')
            await Post.update({like:like+1},{where:{id:postId}});
            console.log('좋아요 +')
            res.status(200).send({"message": "게시글의 좋아요를 등록하였습니다."});
        }else{
            await Like.destroy({where:{postId:postId,userId:userId}});
            console.log('삭제')
            await Post.update({like:like-1},{where:{id:postId}});
            console.log('좋아요 -')
            res.status(200).send({"message": "게시글의 좋아요를 취소하였습니다."});
        }

    } catch (error) {
        console.error(error)
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }

})


/* 게시글 작성
req : {  "title": "안녕하세요 게시글 제목입니다.",  "content": "안녕하세요 content 입니다."}
res : {  "message": "게시글 작성에 성공하였습니다."}
*/
router.post('/posts',auth,async (req,res)=>{
    const { title,content } = req.body;
    const { userId,nickname,joinDate } = res.locals.user;

    try {
        const result = await Post.create({ 
            'title':title,
            'content':content,
            'userId':userId,
            'nickname':nickname,
            'like':0
        });
        res.status(200).send({"message": "게시글 작성에 성공하였습니다."});
    } catch (error) {
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }
})



/* 게시글 전체 조회
req : 
res :{ "data":[{ "postId": 2, "userId": 1, 
"nickname": "Developer", "title": "안녕하세요 2번째 게시글 제목입니다.", 
"createdAt": "2022-07-25T07:45:56.000Z","updatedAt": "2022-07-25T07:45:56.000Z","likes": 0}, 
...
*/
router.get('/posts',async (req,res)=>{
    const data = await Post.findAll({
        order: [["createdAt", "desc"]]
    });
    res.status(200).send({data});
})

/* 게시글 상세 조회
req : 
res :{ "data":[{ "postId": 2, "userId": 1, 
"nickname": "Developer", "title": "안녕하세요 2번째 게시글 제목입니다.", 
"createdAt": "2022-07-25T07:45:56.000Z","updatedAt": "2022-07-25T07:45:56.000Z","likes": 0}
*/
router.get('/posts/:postId',async (req,res)=>{
    const postId = req.params.postId;
    try {
        const data = await Post.findOne({where:{'id':postId}});
        res.status(200).send({data});    
    } catch (error) {
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }
})

/* 게시글 수정
req : {"title": "안녕하새요 수정된 게시글 입니다.","content": "안녕하세요 content 입니다."}
res :{"message": "게시글을 수정하였습니다."}
*/
router.put('/posts/:postId',auth,async (req,res)=>{
    const { title,content } = req.body;
    const postId = req.params.postId;
    const { userId,nickname } = res.locals.user;
    try {
        const result = await Post.update({
            'title':title,
            'content':content
        },{
            where : {id : postId,userId:userId}
        })

        if(!result[0]) res.status(400).send({"errorMessage": "수정 권한이 없습니다."});
        res.status(200).send({"message": "게시글을 수정하였습니다."});
    } catch (error) {
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }

    
})


/* 게시글 삭제
req : 
res :{"message": "게시글을 삭제하였습니다."}
*/
router.delete('/posts/:postId',auth,async (req,res)=>{

    const postId = req.params.postId;
    const { userId,nickname } = res.locals.user;
    console.log(userId,nickname )

    try {
        const result = await Post.destroy({
            where:{id:postId,userId:userId}
        });
        if(!result) res.status(400).send({"errorMessage": "삭제 권한이 없습니다."});
        res.status(200).send({"message": "게시글을 삭제하였습니다."});
    } catch (error) {
        res.status(400).send({"message": "알 수 없는 오류가 발생했습니다. error"+error});
    }

    
})



module.exports = router;