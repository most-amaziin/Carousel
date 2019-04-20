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
      cb(arr);
    }
  })
}

const updatePrice = (updateObj, cb) => {
  let { productid, productprice } = updateObj;
  Product.findOneAndUpdate({productid}, {$set:{productprice}}, function(err, doc) {
    if(err){
      console.error('Error in mongo update query. ', err);
    }
    cb(doc);
  });
}

const deleteProduct = (productid, cb) => {
  Product.findOneAndDelete({productid}, function(err, success){
    if(err){
      console.error('Error in mongo delete query');
    }
    cb(err, success);
  })
}

const postProduct = (product, cb) => {
  let { name, price, type} = product;
  let q = Product.find({}).sort({productid:-1}).limit(1);
  q.exec((err, num) => {
    //console.log('Highest product num: ', num[0].toObject().productid, typeof num[0], Object.keys(num[0].toObject()));
    //cb(num[0].toObject().productid)
    let newProductId = num[0].toObject().productid;
    let newProduct = new Product({ productid: newProductId, name, price, type });
    
    newProduct.save(function(err, newprod){
      if (err) console.error('Error in mongo POST ', err);
      cb(err, newprod);
    });
  })
}


module.exports = {
  getFifteenEntries, updatePrice, deleteProduct, postProduct 
};