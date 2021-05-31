const { pool } = require("../../../config/database");


// 목록 보기
async function defaultDao(Params) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectEmailQuery = `
 
    select po.displayName, po.price, u.nickname, q.content, DATE_FORMAT(q.createdAt,'%y-%m-%d') as 글쓴일, 
    q.type
    from Questions q
    left outer join ProductOptions po on po.productId = q.productId
    left outer join UserInfo u on q.userId = u.user_id
    where q.productId=${Params}; `;
  
    const [rows] = await connection.query(selectEmailQuery)
    connection.release();
  
    return rows;
  }
  




  async function createDao(input) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertVideosInfoQuery = `
    INSERT INTO Questions( type, content, productId, userId)
    VALUES (?, ?, ?, ?);
      `;
    const createDaoRow = await connection.query(
        insertVideosInfoQuery,
        input
    );
    connection.release();
    return createDaoRow;
  }



module.exports = {
    defaultDao, createDao
  };
  