const { pool } = require("../../../config/database");

// index
async function defaultDao() {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayName, p.price, b.companyName, dc.percent as discount,

  (select  fu.fileURL 
    from fileURL fu
   where fu.productId=p.productId limit 1) as image,
  
    (select round((round(avg(pc.rateDurability),1)+round(avg(pc.ratePrice),1)+
  round(avg(pc.rateDesign),1)+round(avg(pc.rateDelivery),1))/4,1) 
    from ProductComments pc where  pc.productId= p.productId) as rating,
    (select count(*) from ScrapProducts sp where sp.productId  = p.productId) as scrap,
    (select count(*) from ProductComments where productId  = p.productId) as review,
    dl.type as delivery
    from Products p
    left outer join Brand b on b.productId = p.productId
    left outer join Discount dc on dc.productId = p.productId
  left outer join ProductDelivery pd on pd.productId  = p.productId
  left outer join Delivery dl on dl.deliveryId = pd.deliveryId;`;

  const [rows] = await connection.query(selectEmailQuery)
  connection.release();

  return rows;
}


// 오늘의 딜
async function todayDao() {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayName, p.price, b.companyName, dc.percent as discount,

  (select  fileURL 
  from fileURL fu
  left outer join Products p on p.productId=fu.productId limit 1) as image,
  
    (select round((round(avg(pc.rateDurability),1)+round(avg(pc.ratePrice),1)+
  round(avg(pc.rateDesign),1)+round(avg(pc.rateDelivery),1))/4,1) 
    from ProductComments pc where  pc.productId= p.productId) as rating,
    (select count(*) from ScrapProducts sp where sp.productId  = p.productId) as scrap,
    (select count(*) from ProductComments where productId  = p.productId) as review,
    dl.type as delivery
    from Products p
    left outer join Brand b on b.productId = p.productId
    left outer join Discount dc on dc.productId = p.productId
  left outer join ProductDelivery pd on pd.productId  = p.productId
  left outer join Delivery dl on dl.deliveryId = pd.deliveryId
  order by dc.percent desc; `;

  const [rows] = await connection.query(selectEmailQuery)
  connection.release();

  return rows;
}




// 카테고리
async function categoryDao() {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayName, p.price, b.companyName, dc.percent as discount,

  (select  fileURL 
  from fileURL fu
  left outer join Products p on p.productId=fu.productId limit 1) as image,
  
    (select round((round(avg(pc.rateDurability),1)+round(avg(pc.ratePrice),1)+
  round(avg(pc.rateDesign),1)+round(avg(pc.rateDelivery),1))/4,1) 
    from ProductComments pc where  pc.productId= p.productId) as rating,
    (select count(*) from ScrapProducts sp where sp.productId  = p.productId) as scrap,
    (select count(*) from ProductComments where productId  = p.productId) as review,
    dl.type as delivery
    from Products p
    left outer join Brand b on b.productId = p.productId
    left outer join Discount dc on dc.productId = p.productId
  left outer join ProductDelivery pd on pd.productId  = p.productId
  left outer join Delivery dl on dl.deliveryId = pd.deliveryId
  where p.category1='가구'; `;

  const [rows] = await connection.query(selectEmailQuery)
  connection.release();

  return rows;
}

// 카테고리2
async function categoryDao2() {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayName, p.price, b.companyName, dc.percent as discount,

  (select  fileURL 
  from fileURL fu
  left outer join Products p on p.productId=fu.productId limit 1) as image,
  
    (select round((round(avg(pc.rateDurability),1)+round(avg(pc.ratePrice),1)+
  round(avg(pc.rateDesign),1)+round(avg(pc.rateDelivery),1))/4,1) 
    from ProductComments pc where  pc.productId= p.productId) as rating,
    (select count(*) from ScrapProducts sp where sp.productId  = p.productId) as scrap,
    (select count(*) from ProductComments where productId  = p.productId) as review,
    dl.type as delivery
    from Products p
    left outer join Brand b on b.productId = p.productId
    left outer join Discount dc on dc.productId = p.productId
  left outer join ProductDelivery pd on pd.productId  = p.productId
  left outer join Delivery dl on dl.deliveryId = pd.deliveryId
  where p.category2='학생/서재가구'; `;

  const [rows] = await connection.query(selectEmailQuery)
  connection.release();

  return rows;
}

// 카테고리3
async function categoryDao3() {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayName, p.price, b.companyName, dc.percent as discount,

  (select  fileURL 
  from fileURL fu
  left outer join Products p on p.productId=fu.productId limit 1) as image,
  
    (select round((round(avg(pc.rateDurability),1)+round(avg(pc.ratePrice),1)+
  round(avg(pc.rateDesign),1)+round(avg(pc.rateDelivery),1))/4,1) 
    from ProductComments pc where  pc.productId= p.productId) as rating,
    (select count(*) from ScrapProducts sp where sp.productId  = p.productId) as scrap,
    (select count(*) from ProductComments where productId  = p.productId) as review,
    dl.type as delivery
    from Products p
    left outer join Brand b on b.productId = p.productId
    left outer join Discount dc on dc.productId = p.productId
  left outer join ProductDelivery pd on pd.productId  = p.productId
  left outer join Delivery dl on dl.deliveryId = pd.deliveryId
  where p.category3='책장'; `;

  const [rows] = await connection.query(selectEmailQuery)
  connection.release();

  return rows;
}

// 카테고리4
async function categoryDao4() {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayName, p.price, b.companyName, dc.percent as discount,

  (select  fileURL 
  from fileURL fu
  left outer join Products p on p.productId=fu.productId limit 1) as image,
  
    (select round((round(avg(pc.rateDurability),1)+round(avg(pc.ratePrice),1)+
  round(avg(pc.rateDesign),1)+round(avg(pc.rateDelivery),1))/4,1) 
    from ProductComments pc where  pc.productId= p.productId) as rating,
    (select count(*) from ScrapProducts sp where sp.productId  = p.productId) as scrap,
    (select count(*) from ProductComments where productId  = p.productId) as review,
    dl.type as delivery
    from Products p
    left outer join Brand b on b.productId = p.productId
    left outer join Discount dc on dc.productId = p.productId
  left outer join ProductDelivery pd on pd.productId  = p.productId
  left outer join Delivery dl on dl.deliveryId = pd.deliveryId
  where p.category3='학생/오피스의자'; `;

  const [rows] = await connection.query(selectEmailQuery)
  connection.release();

  return rows;
}

// 카테고리5
async function categoryDao5() {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select p.displayName, p.price, b.companyName, dc.percent as discount,

  (select  fileURL 
  from fileURL fu
  left outer join Products p on p.productId=fu.productId limit 1) as image,
  
    (select round((round(avg(pc.rateDurability),1)+round(avg(pc.ratePrice),1)+
  round(avg(pc.rateDesign),1)+round(avg(pc.rateDelivery),1))/4,1) 
    from ProductComments pc where  pc.productId= p.productId) as rating,
    (select count(*) from ScrapProducts sp where sp.productId  = p.productId) as scrap,
    (select count(*) from ProductComments where productId  = p.productId) as review,
    dl.type as delivery
    from Products p
    left outer join Brand b on b.productId = p.productId
    left outer join Discount dc on dc.productId = p.productId
  left outer join ProductDelivery pd on pd.productId  = p.productId
  left outer join Delivery dl on dl.deliveryId = pd.deliveryId
  where p.category3='책상'; `;

  const [rows] = await connection.query(selectEmailQuery)
  connection.release();

  return rows;
}



module.exports = {
  defaultDao, todayDao, categoryDao, categoryDao2, categoryDao3, categoryDao4, categoryDao5 
};
