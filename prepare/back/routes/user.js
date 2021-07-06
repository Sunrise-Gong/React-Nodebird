const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
// const db = require('../models');
const { User } = require('../models');

const router = express.Router();

/*
router.post('/login', passport.authenticate('local', (err, user, info) => { 
    if (err) { 
        console.error(err); 
        next(err); <- passport.authenticate 미들웨어는 req, res, next를 사용못함
    }
})
); 
이 문제는 아래와 같이 미들웨어 확장을 통해 해결 */
router.post('/login', (req, res, next) => { // req, res, next를 사용하기 위해서 미들웨어 확장하기
    passport.authenticate('local', (err, user, info) => { 
        // 서버 에러인 경우
        if (err) {  
            console.error(err); 
            return next(err);
        }
        // 클라이언트 에러인 경우(ex: 없는 이메일 입니다) (401: 비인증)
        if (info) { return res.status(401).send(info.reason); } 
        
        // 패스포트 로그인(패스포트 자체 최종 검사) 
        return req.logIn(user, async (loginErr) => { 
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            return res.status(200).json(user);
        })
    })(req, res, next);
}); 

router.post('/', async (req, res, next) => { // POST /user/
    try {
        
        const exUser = await User.findOne({ where: { email: req.body.email, } }); // 동일한 이메일 주소가 db에 있는지 검사

        if (exUser) { return res.status(403).send('이미 사용중인 이메일 입니다.'); } // return을 하지 않으면 아래 코드들이 실행되는 문제발생 

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(200).send('회원가입 완료');

    } catch (error) {
        console.log('회원가입에러', error);
        next(error); // catch와 next를 통해서 에러를 보내면 에러들이 한방에 처리됨
    }
});

module.exports = router;