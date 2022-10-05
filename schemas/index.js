const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/spa_board').catch(err => console.log(err));
}

mongoose.connection.on("error",err => { console.log('err!!'+err)});

module.exports = connect;