const express = require('express');
const postRouter = require('./routes/post');

const app = express();

app.use('/post', postRouter);

app.listen(3065, () => {
    console.log('서버 실행중');
});





//------------------------------------ http 모듈을 이용한 방식
// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
//     res.write('<h1>Hello Node</h1>')
//     res.write('<h2>Hello Node</h2>')
//     res.write('<h3>Hello Node</h3>')
//     res.write('<h4>Hello Node</h4>')
//     res.end('<h5>Hello Node</h5>')
// });

// server.listen(3065, () => {
//     console.log('서버 실행중')
// });