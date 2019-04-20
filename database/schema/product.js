let mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productname: String,
  productpic: String,
  productprice: Number,
  producttype: String
})

module.exports = productSchema;
//productname productpic productprice producttype