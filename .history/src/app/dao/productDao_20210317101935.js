const { pool } = require("../../../config/database");

// product detail
async function defaultDao(Params) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayname, p.price, p.views, b.companyName as 브랜드명, b.url as 브랜드주소, d.type as 배송,
  (select count(*) from ScrapProducts sp where sp.productId  = p.productId) 스크랩수
from Products p
  left outer join Brand b on b.productId = p.productId
    left outer join ProductDelivery pd on pd.productId = p.productId
      left outer join Delivery d on d.deliveryId = pd.deliveryId
     where p.productId=${Params};


     select s.size, s.price
from Products p
left outer join Size s on p.productId = s.productId
where p.productId = ${Params};


select c.color, c.price
from Products p
left outer join Color c on p.productId = c.productId
where p.productId = ${Params};
                `;
  

  const [rows] = await connection.query(selectEmailQuery,
                                  Params)    

  connection.release();
  return rows;
}

module.exports = {
    defaultDao
  };