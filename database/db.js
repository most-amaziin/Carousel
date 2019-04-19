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

module.exports = {
  getFifteenEntries
};