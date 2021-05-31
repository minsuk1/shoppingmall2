module.exports = function(app){
    const qestion = require('../controllers/questionController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //문의 목록 보여주기
    app.get('/products/questions/:productId' , qestion.default);


    app.post('/products/questions/:productId', jwtMiddleware, qestion.createquestion);
};
