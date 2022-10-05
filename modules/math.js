// 모듈화하는 4가지 방법

//1. 모듈을 호출했을 때 add 키 값에 변수가 가지고 있는 함수 값을 할당해주는 방법
// const add = (a,b) => {
//     return a+b
// }
// exports.add = add;


//2. 모듈을 호출했을 때 add 키 값에 익명함수를 할당하는 방법
// exports.add = (a,b) => a+b;


//3. 모듈을 호출했을 때 add 키 값에는 add가 들어가는 방법
function add2(a,b){
    return a+b+10
}
// module.exports = {add2 : add2}
module.exports = {add2}


//4. 모듈 그 자체를 바로 add 함수를 할당한다.
// module.exports = add2;


// function add2(a,b){
//     return a+b+10
// }

// // exports.add2 = add2;

// const stto = [1,2,3,4,5]

// module.exports = {add:add,add2:add2,stto:stto}