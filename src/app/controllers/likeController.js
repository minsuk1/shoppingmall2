const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');


const likeDao = require('../dao/likeDao');

exports.scrapproduct = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
           const {productId} = req.params
           const user_id = req.verifiedToken.user_id;
           
            findVideosInfoParams = [productId, user_id]

            //이미 스크랩했는지 여부 확인
            const [userInfoRows] = await likeDao.findscrapproduct(findVideosInfoParams)
            console.log(userInfoRows)
            if (userInfoRows.length > 0) {
                //connection.release();
                return res.json({
                    isSuccess: false,
                    code: 3012,
                    message: "이미 스크랩했습니다."
                });}


            const rows = await likeDao.scrapproduct(findVideosInfoParams);
                     

            return res.json({
                isSuccess: true,
                code: 1000,
                message: "스크랩 성공"
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

exports.unscrapproduct = async function (req, res) {
    try{

    const {productId} = req.params
    const user_id = req.verifiedToken.user_id;
        
    findVideosInfoParams = [productId, user_id]
    

    insertVideosRows = await likeDao.unscrapproduct(findVideosInfoParams)

    return res.json({
        isSuccess: true,
        code: 1000,
        message: "스크랩 삭제 성공"
    });
    }
    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};




exports.createhelp = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
           const {id} = req.params
           const user_id = req.verifiedToken.user_id;

           findVideosInfoParams = [id, user_id]



        //이미 스크랩했는지 여부 확인
        const [userInfoRows] = await likeDao.findcreatehelp(findVideosInfoParams)
        console.log(userInfoRows)
        if (userInfoRows.length > 0) {
            //connection.release();
            return res.json({
                isSuccess: false,
                code: 3013,
                message: "이미 도움이 돼요 했습니다."
            });}





            const rows = await likeDao.createhelp(findVideosInfoParams);

            return res.json({
                isSuccess: true,
                code: 1000,
                message: "댓글 도움이 돼요 추가 성공"
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

exports.uncreatehelp = async function (req, res) {
    try{

    const {id} = req.params
    const user_id = req.verifiedToken.user_id;

    findVideosInfoParams = [id, user_id]

    insertVideosRows = await likeDao.uncreatehelp(findVideosInfoParams)
    
    return res.json({
        isSuccess: true,
        code: 1000,
        message: "댓글 도움이 돼요 삭제 성공"
    });
    }

    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};