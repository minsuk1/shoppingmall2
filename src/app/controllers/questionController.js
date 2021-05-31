const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');



const questionDao = require('../dao/questionDao');

exports.default = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
           const {productId} = req.params
            // const user_id = req.verifiedToken.user_id;
            // console.log(id)
            findVideosInfoParams = [productId]

            const rows = await questionDao.defaultDao(findVideosInfoParams);
            return res.json({
                isSuccess: true,
                code: 1000,
                message: "문의 조회 성공.",
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


exports.createquestion = async function (req, res) {
    try{
    const {productId} = req.params
    const user_id = req.verifiedToken.user_id;
    const {type,  content} = req.body;
        

    insertVideosInfoParams=[type, content, productId, user_id]
    
    insertVideosRows = await questionDao.createDao(insertVideosInfoParams)
    return res.json({
        isSuccess: true,
        code: 1000,
        message: "문의 추가 성공."
    });
    }
    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }}