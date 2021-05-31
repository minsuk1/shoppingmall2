const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');
const productDao = require('../dao/productDao');

exports.default = async function (req, res) {
    try{
        const {id} = req.params
        rows = await productDao.defaultDao(id);
        let product = rows[0][0]
        product.size = rows[1]
        product.color = rows[2]
        console.log(product)
        
        return res.json({
        isSuccess: true,
        code: 200,
        message: "성공",
        data:product,
        });
            }
    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};