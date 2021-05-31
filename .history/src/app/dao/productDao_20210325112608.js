const { pool } = require("../../../config/database");
var  mysql = require('mysql');

// product detail
async function defaultDao(Params) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayname, p.price, p.views, b.companyName as 브랜드명, b.url as 브랜드주소, 
  dc.percent as discount,  (p.price * dc.percent) as 원가  ,d.type as 배송,
  round((round(avg(pc.rateDurability),1)+round(avg(pc.ratePrice),1)+
round(avg(pc.rateDesign),1)+round(avg(pc.rateDelivery),1))/4,1) as 평점,
  (select count(*) from ScrapProducts sp where sp.productId  = p.productId) 스크랩수
from Products p
  left outer join Brand b on b.productId = p.productId
    left outer join ProductDelivery pd on pd.productId = p.productId
      left outer join Delivery d on d.deliveryId = pd.deliveryId
      left outer join ProductComments pc on p.productId = pc.productId
      left outer join Discount dc on dc.productId = p.productId
     where p.productId=${Params};


     select po.displayName, po.price
from Products p
left outer join ProductOptions po on po.productId = p.productId
where p.productId = ${Params};


         select f.fileURL
from Products p
left outer join fileURL f on p.productId = f.productId
where p.productId = ${Params};

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



async function createDao(insertVideosInfoParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  // const insertVideosInfoQuery = `
  //       INSERT INTO fileURL(fileURL, productId)
  //       VALUES (?, ?);
  //   `;

    var sql2 = 'insert into fileURL (fileURL,productId)  values (?,?);';
    var sql2s = "";
    path2.forEach(function(item){
        sql2s += mysql.format(sql2, item);
    });  



  const createDaoRow = await connection.query(
    sql2s,
      insertVideosInfoParams
  );
  connection.release();
  return createDaoRow;
}


module.exports = {
    defaultDao, createDao
  };