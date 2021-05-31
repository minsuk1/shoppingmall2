module.exports = function(app){
    const qestion = require('../controllers/questionController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.get('/products/questions/:productId' , qestion.default);


    app.post('/products/questions/:productId', jwtMiddleware, qestion.createquestion);
};
