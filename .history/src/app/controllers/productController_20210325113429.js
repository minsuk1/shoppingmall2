const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');
const productDao = require('../dao/productDao');




exports.default = async function (req, res) {
    try{
        const {productId} = req.params
        rows = await productDao.defaultDao(productId);

        for (var i = 0; i < rows.length; i++) {
            if(rows[i].discount>40){
                rows[i].special='특가'
            }
          }


        let product = rows[0][0]
        if(product.discount>40){
            product.special='특가'
        }

        product.option = rows[1]
        product.file = rows[2]
        product.size = rows[3]
        product.color = rows[4]
        
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
        path2.push([path[i], req.params.productId])
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