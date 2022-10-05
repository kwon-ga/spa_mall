const express = require("express");
const router = express.Router();
const Goods = require('../schemas/goods.js');

router.get("/",(req,res)=>{
    res.send('hello goods root Path !');  
})


router.get('/about',(req,res)=>{
    res.send('hello goods /about Path !');  
})

//상품 insert
router.post('/addgoods',async (req,res)=>{

    const { goodsId,name,thumbnailUrl,category,price } = req.body;
    
    const goods = await Goods.find({goodsId})
    console.log(goods)
    if(goods.length){
        console.log('이미 있는 데이터셈');
        return res.status(400).json({success:false,errMsg:'이미 있는 데이터입니다.'})
    }

    const createGoods = await Goods.create({goodsId,name,thumbnailUrl,category,price})
    console.log(createGoods)

    res.json({goods : createGoods})
})

router.get('/goods',async (req,res)=> {
    
    const goodslist = await Goods.find({});
    res.json(goodslist);
})


router.get('/goods/:goodsId', async (req,res)=> {

    const { goodsId } = req.params;   
    const goodslist = await Goods.find({goodsId});
    console.log(goodslist.length)
    if(!goodslist.length){
        return res.json({'msg':'일치하는 상품이 없습니다.'});    
    }

    return res.json(goodslist);
    

    // res.send(goods.filter(e => e.goodsId === parseInt(goodsId)));
})



module.exports = router;