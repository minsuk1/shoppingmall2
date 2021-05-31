const { pool } = require("../../../config/database");

async function defaultDao(findVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    //const user_id = req.params.user_id;
    const selectEmailQuery = 
                      `
                      select u.nickname,round(round(pc.rateDurability+pc.ratePrice+pc.rateDesign+pc.rateDelivery)/4,1) as 평점,
                      pc.content, pc.rateDurability, pc.ratePrice, pc.rateDesign,pc.rateDelivery,
                      (select count(*) from LikeComments  lc where lc.memoId = pc.id) as 도움이돼요
                      from ProductComments pc
                      left outer join UserInfo u on u.user_id = pc.userId
                      where pc.productId = ? ;`;
  
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




  