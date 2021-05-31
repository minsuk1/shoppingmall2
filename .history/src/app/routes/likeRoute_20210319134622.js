module.exports = function(app){
    const like = require('../controllers/likeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    


    //상품 스크랩
    app.post('/products/like/:productId(\\d+)', jwtMiddleware,  like.scrapproduct);

    app.delete('/products/like/:productId(\\d+)', jwtMiddleware, like.unscrapproduct);



    //댓글 도움이 돼요
    app.post('/products/comments/like/:id(\\d+)', jwtMiddleware,  like.createhelp);

    app.delete('/products/comments/like/:id(\\d+)', jwtMiddleware, like.uncreatehelp);
};

