const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');
const productDao = require('../dao/productDao');

exports.default = async function (req, res) {
    try{
        const {id} = req.params
        rows = await productDao.defaultDao(id);
        let product = rows[0][0]
        product.file = rows[1]
        product.size = rows[2]
        product.color = rows[3]
        
        console.log(product)
        
        return res.json({
        isSuccess: true,
        code: 1000,
        message: "성공",
        data:product,
        });
            }
    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};



exports.createfile = async function (req, res) {
    try{

    const image = req.files;
    const path = image.map(img => img.filename)
    
    path2=[]
    for(var i=0; i<path.length; i++){
        path2.push([path[i], req.params.id])
    }
    console.log(path2)


    



    //insertVideosInfoParams=[id, req.file.filename]
    insertVideosRows = await productDao.createDao(path2)
    return res.json({
        isSuccess: true,
        code: 1000,
        message: "동영상 추가 성공"
    });
    }
    catch(err){
        logger.error(`App - SignUp Query error\n: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};