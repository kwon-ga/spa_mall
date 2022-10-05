const express = require('express')
const { send } = require('process')
const app = express()
const port = 3000 
const indexroutes = require('./routes/index')

const connect = require('./schemas/index')
connect();



app.use(express.json());
app.use('/',indexroutes);


// 어플리케이션 레벨 미들웨어 테스트 
// 요청이 올때마다 실행
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // next() 를 명시해주지 않고 테스트해보면 무한로딩이 된다.
});

// app.use('/path/:id',(req,res,next)=>{
//   console.log(`id값 ${req.params.id}을 가지고 /path 경로로 요청`)
//   next();
// })

// app.get('/path/:id',(req,res,next)=>{
//   let {name,age} = req.query;
//   console.log(`id값 ${req.params.id}을 가지고 /path 경로로  GET요청`)
//   console.log(`GET 요청으로 들어온 데이터 : ${name}, ${age}`);
//   next();
// })


// // 1번 라우트
// app.get('/path/:id', (req, res, next) => {
// 	console.log('1번 콜백함수 !!');
// 	next(); // 2번 콜백 함수로 이동
// }, (req, res, next) => {
// 	console.log('2번 콜백함수 !!');
// 	res.send('함수 종료 !!'); // 요청에 대한 응답을 끝낸다.
//   	// res.send 대신 next(); 를 사용하면 2번 라우트도 실행된다.
// });

// // 2번 라우트 (실행 x -> 1번 라우트에서 사이클을 종료시켜서
// app.get('/path/:id', (req, res, next) => {
// 	console.log('2번 라우트 실행시켜줘 !');
// });

// // 1번 라우트
// app.get('/path/:id', (req, res, next) => {
//     if (req.params.id == 0) next('route');
//     else next();
// }, (req, res, next) => {
//     console.log('2번 콜백함수 !!')
//     res.send('regular');
// });

// // 2번 라우트
// app.get('/path/:id', (req, res, next) => {
//     console.log('2번 라우터 !!');
//     res.send('special');
// });


// app.get('/path/:id',(req, res, next) => {
//   if(req.params.id !== '0') next(err)
//   else res.send('에러 없음 !!');
// })



// // 오류처리 미들웨어 테스트 
// app.get('/',(req,res,next)=>{
//   const err = new Error('Not Found');
//   err.status= 404;
//   next(err); // 에러처리 미들웨어 호출, 다음 미들웨어는 실행하지 않고 바로 에러처리 미들웨어를 호출한다
// })

// // 오류처리 미들웨어
// app.use((err, req, res, next) => {
  
//   console.error(err.stack) // 에러 내용 콘솔 출력
//   res.status(err.status).send('Something broke!')
// });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})