let mongoose = require('mongoose');
let productSchema = require('../schema/product.js');

const Product = mongoose.model('products', productSchema);

module.exports = Product;