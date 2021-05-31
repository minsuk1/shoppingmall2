module.exports = function(app){
    const board = require('../controllers/boardController');

    //전 게시글 조회
    app.get('/main', board.default);
};
