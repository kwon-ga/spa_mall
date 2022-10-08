const express = require("express");
const router = express.Router();
const Post = require('../schemas/post.js');

// 게시글 작성 
router.post('/posts',async (req,res)=>{
    const {title,user,password,content}= req.body;
    console.log('al')
    const createpost = await Post.create({title,user,password,content});
    res.json({"message": "게시글을 생성하였습니다."});
})


// // 게시글 전체 조회
router.get('/posts',async (req,res)=>{
    const data = await Post.find({}).select({
        "_id": 0, "title": 1, "user": 1, "createdAt": 1,"content": 1,"postId":"$_id"
    }).sort({ "createdAt": "desc" });
    res.json({data});
})


// 게시글 상세
router.get('/posts/:_postId',async(req,res,next)=>{
    let postId = req.params._postId;
    try{
        const data = await Post.findById(postId).select({
            "_id": 0,"user":1, "title": 1, "postId": "$_id", "createdAt": 1,"content": 1
        });
    }catch(err){
        // console.log(err);
        // res.json({message:"조회실패!"});    
        next(err);
    }
    res.json({data});
})

// 게시글 수정
router.put('/posts/:_postId',async (req,res)=>{
    let postId = req.params._postId;
    const data = await Post.updateOne({
        "_id":postId,
        "password":req.body.password
    },{
        $set:{
            "title": req.body.title, 
            "content": req.body.content
        }
    });

    !data.matchedCount ?  res.json({"message":"비밀번호가 일치하지 않습니다!"}):res.json({"message": "게시글을 수정하였습니다."})

})


// 게시글 삭제
router.delete('/posts/:_postId',async (req,res)=>{
    let postId = req.params._postId;
    const data = await Post.deleteOne({
        "_id":postId,
        "password":req.body.password
    })
    !data.deletedCount ?  res.json({"message":"비밀번호가 일치하지 않습니다!"}):res.json({"message":"게시글을 삭제하였습니다."})
})


// 오류처리 미들웨어
router.use((err, req, res, next) => {

    console.error(err.stack) // 에러 내용 콘솔 출력
    res.status(400).send('알 수 없는 오류가 발생하였습니다.')
});


module.exports = router;