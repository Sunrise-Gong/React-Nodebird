const passport = require('passport');
const local = require('./local'); // 로그인 전략을 세운 파일
const { User } = require('../models');

module.exports = () => {
    // 세션으로 유저 아이디를 가지고 있는다는 설정
    passport.serializeUser((user, done) => { done(null, user.id); });
    /* 
    로그인 이후 요청시 실행되는 부분으로
    쿠키로 id를 찾고 id로 db에서 유저데이터를 찾아서 req.user에 담는다. */
    passport.deserializeUser( async (id, done) => { 
        try{
            const user = await User.findOne({ where : { id } });
            done(null, user); // req.user 에 유저데이터가 담기는 부분
        
        } catch(error) { 
            console.error(error);
            done(error);
        }
    });

    // 로그인 전략
    local();
}