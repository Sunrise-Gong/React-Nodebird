const passport = require('passport');
const local = require('./local'); // 로그인 전략을 세운 파일
const { User } = require('../models');

module.exports = () => {
    // 세션으로 유저 아이디를 가지고 있는다는 설정
    passport.serializeUser((user, done) => { done(null, user.id); });
    
    // 세션으로 가지고 있는 유저 아이디로 db에서 유저정보를 가져온다는 설정
    passport.deserializeUser( async (id, done) => { 
        try{
            const user = await User.findOne({ where : { id } });
            done(null, user);
        
        } catch(error) { 
            console.error(error);
            done(error);
        }
    });

    // 로그인 전략
    local();
}