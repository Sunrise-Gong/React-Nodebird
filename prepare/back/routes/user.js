const express = require('express');
const bcrypt = require('bcrypt');
// const db = require('../models');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /user/
    try {
        
        const exUser = await User.findOne({ // 동일한 이메일 주소가 db에 있는지 검사
            where: {
                email: req.body.email,
            }
        });

        if (exUser) {
            return res.status(403).send('이미 사용중인 이메일 입니다.');
            // return을 하지 않으면 아래 코드들이 실행되는 문제발생
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(200).send('회원가입 완료');

    } catch (error) {
        console.log(error);
        next(error); // catch와 next를 통해서 에러를 보내면 에러들이 한방에 처리됨
    }
});

module.exports = router;