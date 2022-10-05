const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: String
    },
    createdAt:{ 
        type: Date, required: true, default: new Date() 
    },
    password: {
        type: String
    },
    content:{
        type:String
    },
    postId:{
        type:String
    }
});

module.exports = mongoose.model("Comment",commentSchema);