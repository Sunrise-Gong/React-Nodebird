const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email
        passwordField: 'password',// req.body.password

    }, async (email, password, done) => {
        try {
            // 존재하는 이메일인지 확인
            const user = await User.findOne({ where: { email } });
            if (!user) { return done(null, false, { reason: '존재하지 않는 사용자 입니다!' }) }
            // done(서버에러, 성공, 클라이언트에러)

            // 패스워드가 일치하는지 확인
            const result = await bcrypt.compare(password, user.password);
            if (result) { return done(null, user); } // 성공시 '사용자 정보(user)'를 넘겨줍니다.
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
}