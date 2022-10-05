const express = require('express');

// 1번, 2번
// const add = require('./math');
// console.log(add.add(1,2));

// 3번
// const add2 = require('./math')
// console.log(add2.add2(1,2))

// 4번
const {add2} = require('./math');
console.log(add2(1,2))