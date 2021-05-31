module.exports = function(app){
    const index = require('../controllers/indexController');

    //스토어홈
    app.get('/app/store', index.default);

    //오늘의 딜
};
