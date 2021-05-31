const { pool } = require("../../../config/database");

async function defaultDao(findVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    //const user_id = req.params.user_id;
    const selectEmailQuery = 
                      `
                      select p.content, p.rateDurability, p.ratePrice, p.rateDesign,p.rateDelivery
                       from ProductComments p
                      where p.productId = ? ;`;
  
    const [rows] = await connection.query(selectEmailQuery,
                                  findVideosInfoParams)
    connection.release();
  
    return rows;
  }

  async function createDao(insertVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertVideosInfoQuery = `
          INSERT INTO ProductComments( content, productId, rateDurability, 
            ratePrice, rateDesign, rateDelivery, fileUrl, userId)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
    const createDaoRow = await connection.query(
        insertVideosInfoQuery,
        insertVideosInfoParams
    );
    connection.release();
    return createDaoRow;
  }


  module.exports = {
    defaultDao, createDao
  };




  