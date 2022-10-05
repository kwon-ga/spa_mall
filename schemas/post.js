const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
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
    }
});

module.exports = mongoose.model("Post",postSchema);