const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');



const commentDao = require('../dao/commentDao');

exports.default = async function (req, res) {
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {

            if(req.query.list=="new"){
                const rows = await commentDao.defaultDao(findVideosInfoParams);
                return res.json({
                    data:review
                });
            }

           const {id} = req.params
            // const user_id = req.verifiedToken.user_id;
            // console.log(id)
            findVideosInfoParams = [id]

            const rows = await commentDao.defaultDao(findVideosInfoParams);
            let review = rows[0][0]
            review.rating = rows[1]
            review.option = rows[2]
            console.log(review)
            return res.json({
                data:review
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

exports.createcomment = async function (req, res) {
    try{
    const {id} = req.params
    const user_id = req.verifiedToken.user_id;
    const {
        content,  rateDurability, ratePrice, rateDesign, rateDelivery, fileUrl
    } = req.body;
    

    if (req.file){
        req.body.fileUrl = req.file.filename
    }else{
        req.body.fileUrl = ''
    }

    
    console.log(req.body.fileUrl)
    console.log(fileUrl)
    //이미지 업로드
    //req.body.fileUrl =  req.file.filename 

    insertVideosInfoParams=[content, id, rateDurability, ratePrice, 
                    rateDesign, rateDelivery, req.body.fileUrl, user_id]

    insertVideosRows = await commentDao.createDao(insertVideosInfoParams)
    return res.json({
        isSuccess: true,
        code: 1000,
        message: "댓글 추가 성공"
    });
    }
    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};