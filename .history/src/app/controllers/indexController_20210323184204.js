const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');

const indexDao = require('../dao/indexDao');

exports.default = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const rows = await indexDao.defaultDao();

            for (var i = 0; i < rows.length; i++) {
                if(rows[i].discount>40){
                    rows[i].special='특가'
                }
              }

            return res.json({
                isSuccess: true,
                code: 1000,
                message: "스토어홈",
                data:rows
            });
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};



exports.today = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const rows = await indexDao.todayDao();
            return res.json({
                isSuccess: true,
                code: 1000,
                message: "스토어홈 - 오늘의 딜",
                data:rows
            });
        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};


exports.category = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            console.log(req.query.category)
            if(req.query.category=="가구"){
                
                const rows = await indexDao.categoryDao();
                return res.json({
                    isSuccess: true,
                    code: 1000,
                    message: "가구 카테고리",
                    data:rows
                });
            }

            if(req.query.category=="학생/서재가구"){
                const rows = await indexDao.categoryDao2();
                return res.json({
                    isSuccess: true,
                    code: 1000,
                    message: "학생/서재가구",
                    data:rows
                });
            }

            if(req.query.category=="책장"){
                const rows = await indexDao.categoryDao3();
                return res.json({
                    isSuccess: true,
                    code: 1000,
                    message: "책장",
                    data:rows
                });
            }

            if(req.query.category=="학생/오피스의자"){
                const rows = await indexDao.categoryDao4();
                return res.json({
                    isSuccess: true,
                    code: 1000,
                    message: "학생/오피스의자",
                    data:rows
                });
            }

            if(req.query.category=="책상"){
                const rows = await indexDao.categoryDao5();
                return res.json({
                    isSuccess: true,
                    code: 1000,
                    message: "책상",
                    data:rows
                });
            }
           

        } catch (err) {
            logger.error(`example non transaction Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
    } catch (err) {
        logger.error(`example non transaction DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
    }
};