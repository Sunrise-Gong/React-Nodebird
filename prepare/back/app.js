const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');


const app = express();

dotenv.config();

//서버(app.js)가 실행되면서 데이터베이스 시퀄라이즈 연결이 이루어지는 부분 입니다.
db.sequelize.sync()
    .then(() => {
        console.log('db연결 성공');
    })
    .catch(console.error);
//------------------------------------------
passportConfig();

app.use(cors({ 
    origin: true,
    credentials: true,
})); // credentials: flase -> 기본 값이 false 인데 false일 경우 생기는 문제가 있습니다.

/*프론트에서 보낸 데이터를 req.body에 넣어주는 역할을 해서 다른 라우터보다 상위에 위치해야 합니다. 미들웨어의 순서의 중요성을 알 수 있는 예시 입니다. */
app.use(express.json()); // 프론트에서 json 형식으로 데이터오면 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // form submit 했을 때 urlencoded 방식으로 데이터가 넘어오는데 그것을 req.body에 넣어줌

/* 쿠키와 세션에 대한 처리 */
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize()); 
app.use(passport.session());
//----------------------------------------

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('서버 실행중!!');
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