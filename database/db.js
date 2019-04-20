const db = require('./db-config');

const selectAll = (cb) => {
  const queryString = 'SELECT * FROM products;';
  db.query(queryString, (err, theGoods) => {
    if (err){
      console.error(`Error querying all products from DB.`);
      cb(err);
      db.end();
    } else {
      cb(theGoods.rows);
      db.end();
    }
  })
};

const getFifteenEntries = (cb) => {
  const queryString = `select * from products limit 15;`
  db.query(queryString, (err, theGoods) => {
    if (err){
      console.error('Error querying top fifteen from database.', err);
      cb(err);
    } else {
      cb(theGoods.rows);
    }
  })
}

const updatePrice = (updateObj, cb) => {
  let { productid, productprice } = updateObj;
  const queryString = `UPDATE PRODUCTS SET productprice = ${productprice} WHERE id=${productid}`;
  db.query(queryString , (err, theGoods) => {
    if (err) {
      console.error('Error in update query.')
      cb(err);
    } else {
      cb(null, theGoods);
    }
  });
}

const deleteProduct = (productid, cb) => {
  const queryString = `DELETE FROM products WHERE id=${productid}`;
  db.query(queryString , (err, theGoods) => {
    if (err) {
      console.error('Error in update query.')
      cb(err);
    } else {
      cb(null, theGoods);
    }
  });
}

const postProduct = (product, cb) => {
  let { name, price, type} = product;
  let url = 'https://s3.amazonaws.com/fecphotogallery2019/photos/48_3.jpg';
  const queryString = `INSERT INTO products (productname, productpic, productprice, producttype) VALUES ('${name}', '${url}', ${price}, '${type}');`;
  console.log('Query: ', queryString);
  db.query(queryString, (err, theGoods) => {
    if (err) {
      console.error('Error in POST query. ', err);
      cb(err);
    } else {
      cb(null, theGoods);
    }
  })

}


module.exports = {
  getFifteenEntries, updatePrice, deleteProduct, postProduct 
};