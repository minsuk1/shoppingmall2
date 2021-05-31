const { pool } = require("../../../config/database");



//스크랩 중복 확인
async function findscrapproduct(input) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserInfoQuery = `
                  SELECT  *
                  FROM ScrapProducts 
                  WHERE productId = ? and userId = ?;
                  `;
  
   
    const [userInfoRows] = await connection.query(
      selectUserInfoQuery,
      input
    );
    return [userInfoRows];
  }



async function scrapproduct(input) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertVideosInfoQuery = `
    insert into ScrapProducts  (productId, userId) 
    values (?,?);
      `;
    const createDaoRow = await connection.query(
        insertVideosInfoQuery,
        input
    );
    connection.release();
    return createDaoRow;
  }


  async function unscrapproduct(input) {
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteEmailQuery = 
                      `
                      DELETE from ScrapProducts 
                      where productId= ?
                      and userId= ?;`;


   
  
    const deleteDaoRow = await connection.query(deleteEmailQuery,
        input)
    connection.release();
  
    return deleteDaoRow;
  }



  //댓글 도움이 돼요 중복 확인
  async function findcreatehelp(input) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserInfoQuery = `
                  SELECT  *
                  FROM LikeComments 
                  WHERE memoId = ? and userId = ?;
                  `;
  
   
    const [userInfoRows] = await connection.query(
      selectUserInfoQuery,
      input
    );
    return [userInfoRows];
  }






  
async function createhelp(input) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertVideosInfoQuery = `
    insert into LikeComments  (memoId, userId) 
    VALUES (?, ?);
      `;
    const createDaoRow = await connection.query(
        insertVideosInfoQuery,
        input
    );
    connection.release();
    return createDaoRow;
  }


  async function uncreatehelp(input) {
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteEmailQuery = 
                      `
    delete from LikeComments  
    where memoId = ? and userId = ?;
`;
  



    const deleteDaoRow = await connection.query(deleteEmailQuery,
        input)
    connection.release();
  
    return deleteDaoRow;
  }


  module.exports = {
    findscrapproduct,scrapproduct,unscrapproduct,
    findcreatehelp, createhelp,uncreatehelp
  };
  