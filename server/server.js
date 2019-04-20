const express = require('express');
const app = express();
const PORT = 4444;
const db = require('../database/db.js');
//const db = require('../database/db_mongo');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/products', (req, res) => {
  //usually the req would have a search term, like * to query the db to get all
  db.getFifteenEntries((data) => {
    //now sending should be the data we got back from the database
    res.send(data);
  })
})

app.post('/api/products', (req, res) => {
  //const queryString = `INSERT INTO products (productname, productpic, productprice, producttype) VALUES ('${name}', '${url}', ${price}, ${type});`;
  console.log('Received request for', req.body)
  let product = { name, price, type } = req.body;

  db.postProduct(product, (err, data) => {
    console.log('Product posted: ', product);
    res.status(201);
    res.end();
  })
})

app.delete('/api/products', (req, res) => {
  //delete function takes in a productid parameter
  let { productid } = req.headers;

  db.deleteProduct(productid, (err, data) => {
    if (!err){
      console.log(`${productid} deleted.`);
    }
    res.end();
  });
})

app.put('/api/products', (req, res) => {
  let { productid, productprice } = req.headers;

  db.updatePrice({ productid, productprice}, (err, data) => {
    if (!err){
      console.log(`${productid} price updated to ${productprice}`);
    }
    res.end();
  })
})

app.listen(PORT, () => {
  console.log(`SCV Ready on port ${PORT}`);
});