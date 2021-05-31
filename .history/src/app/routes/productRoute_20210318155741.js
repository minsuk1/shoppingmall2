module.exports = function(app){
    const index = require('../controllers/productController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const upload = require('../../../middleware/multer')

    app.get('/product/:id' , index.default);


    app.post('/product/:id', jwtMiddleware,  upload.array('fileURL'), index.createfile);
};
