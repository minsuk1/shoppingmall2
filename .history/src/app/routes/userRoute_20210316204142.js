module.exports = function(app){
    const user = require('../controllers/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //회원가입
    app.get('/app/sign-up', (_,res)=>{
        return res.json({
            isSuccess: true,
            code: 1000,
            message: "성공"
        });
    })

    app.route('/app/sign-up').post(user.signUp);


    //로그인
    app.get('/app/sign-in', (_,res)=>{
        return res.json({
            isSuccess: true,
            code: 1000,
            message: "성공"
        });
    })

    app.route('/app/sign-in').post(user.signIn);


    //카카오 로그인
    app.route('/app/kakao-sign-in').post(user.kakao_sign);

    //로그아웃
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/accounts/login');
    });


    //jwt토큰 검증
    app.get('/check', jwtMiddleware, user.check);
};