const mongoose = require('mongoose');
const Product = require('./models/products');

mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Successfully connected to MongoDB.');
})

const selectAll = (cb) => {
  Product.find({}, (err, arr) => {
    if (err){
      console.error('Error in mongo query.');
      cb(err);
    } else {
      cb(null, arr);
    }
  })
};

const getFifteenEntries = (cb) => {
  let q = Product.find({}).limit(15);
  q.exec((err, arr) => {
    if (err){
      console.error('Error in mongo query.');
      cb(err)
    } else {
      console.log('Fetched arr: ', arr);
      cb(null, arr);
    }
  })
}

const updatePrice = (updateObj, cb) => {

}

const deleteProduct = (productid, cb) => {

}

const postProduct = (product, cb) => {

}


module.exports = {
  getFifteenEntries, updatePrice, deleteProduct, postProduct 
};