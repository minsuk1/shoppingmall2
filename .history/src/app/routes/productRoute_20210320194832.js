module.exports = function(app){
    const index = require('../controllers/productController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const upload = require('../../../middleware/multer')

    app.get('/products/:productId' , index.default);


    app.post('/products/:productId', jwtMiddleware,  upload.array('fileURL'), index.createfile);
};
