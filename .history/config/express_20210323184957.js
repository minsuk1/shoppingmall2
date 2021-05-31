const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    //multer
    app.use('/uploads', express.static('uploads'));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    app.use(function(req, res, next) {                     
        res.status(404).json({
            isSuccess: false,
            code: 4000,
            message: "페이지없음"
        });
      });

    /* App (Android, iOS) */
    require('../src/app/routes/indexRoute')(app);
    require('../src/app/routes/userRoute')(app);
    require('../src/app/routes/boardRoute')(app);
    require('../src/app/routes/productRoute')(app);
    require('../src/app/routes/commentsRoute')(app);
    require('../src/app/routes/likeRoute')(app);
    require('../src/app/routes/questionRoute')(app);
    /* Web */
    // require('../src/web/routes/indexRoute')(app);

    /* Web Admin*/
    // require('../src/web-admin/routes/indexRoute')(app);
    return app;
};