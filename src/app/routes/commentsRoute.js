module.exports = function(app){
    const channel = require('../controllers/commentController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const upload = require('../../../middleware/multer')
    

    app.get('/products/comments/:id', channel.default);

    app.post('/products/comments/:id', jwtMiddleware,  upload.single('fileUrl'), channel.createcomment);

//    app.patch('/channel/:user_id/:video_id', channel.updatechannel);

//    app.delete('/channel/:user_id/:video_id', channel.deletechannel);
};


