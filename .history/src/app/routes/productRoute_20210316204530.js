module.exports = function(app){
    const index = require('../controllers/productController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.get('/product/:id' , index.default);
};
