const { pool } = require("../../../config/database");

async function defaultDao(findVideosInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    //const user_id = req.params.user_id;
    const selectEmailQuery = 
                      `
                      select count(*) as 리뷰수 from ProductComments
                     where productId  =  ${findVideosInfoParams} ;

                     select count(*), ratePrice as 별점 from ProductComments
                     where productId  = ${findVideosInfoParams}
                     group by ratePrice;;


                      select u.nickname,round(round(pc.rateDurability+pc.ratePrice+pc.rateDesign+pc.rateDelivery)/4,1) as 평점,
                      pc.content, pc.rateDurability, pc.ratePrice, pc.rateDesign,pc.rateDelivery,
                      date_format(pc.createdAt, '%y-%m-%d') as 구매날짜,
                      (select count(*) from LikeComments  lc where lc.memoId = pc.id) as 도움이돼요
                      from ProductComments pc
                      left outer join UserInfo u on u.user_id = pc.userId
                      where pc.productId = ${findVideosInfoParams} ;`;
  
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




  