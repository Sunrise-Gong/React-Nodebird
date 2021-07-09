exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { // passport에서 제공하는 기능으로 이 값이 true면 로그인 상태
        
        /* next는 두가지 일을 합니다. 
        인자로 무언가가 들어가 있으면 에러처리를하고 
        인자 없이 실행하면 다음 미들웨어를 실행 합니다. */
        next(); 
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
}
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { 
        next(); 
    } else {
        res.status(401).send('로그인 하지 않은 사용자만 접근 가능합니다.');
    }
}
