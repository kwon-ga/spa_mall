const jwt = require('jsonwebtoken');
const { User } = require("../models");


module.exports = (req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies);

  if (!token) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }
  
  try {
    const { indexid, joinDate } = jwt.verify(token, "KwOnGaKeY");
    User.findOne({
        where : { 'id' : indexid, 'createdAt':joinDate }
    }).then((user)=>{
        
        res.locals.user = {userId:user.id, nickname:user.nickname, joinDate:user.createdAt};
        next();
    });

  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};