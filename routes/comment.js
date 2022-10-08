const express = require("express");
const router = express.Router();
const Comment = require('../schemas/comment.js');


//댓글 작성
router.post('/comments/:_postId', async (req,res) => {
    const postId = req.params._postId ; 
    const {user,password,content} = req.body
    const result = await Comment.create({user,password,content,postId});
    console.log(result);
    res.json({message:'댓글을 생성하였습니다.'})
})

//댓글 목록 조회
router.get('/comments/:_postId', async (req,res) => {
    const postId = req.params._postId ; 
    const data = await Comment.find({'postId':postId}).select({
        "_id": 0,"user":1, "commentId": '$_id', "createdAt": 1,"content": 1
    }).sort({ "createdAt": "desc" });
    res.json({data})
})


//댓글 수정
router.put('/comments/:_commentId',async (req,res)=>{
    const commentId = req.params._commentId ;
    const result = await Comment.updateOne(
        {'_id':commentId, 'password':req.body.password},
        {$set:{'content':req.body.content}}
    );

    !result.matchedCount ?  res.json({"message":"비밀번호가 일치하지 않습니다!"}):res.json({"message": "댓글을 수정하였습니다."})
})


//댓글 삭제
router.delete('/comments/:_commentId',async (req,res)=>{
    const commentId = req.params._commentId ;
    const result = await Comment.deleteOne(
        {'_id':commentId, 'password':req.body.password}
    );
    !result.deletedCount ?  res.json({"message":"비밀번호가 일치하지 않습니다!"}):res.json({"message":"댓글을 삭제하였습니다."})
})


module.exports = router 