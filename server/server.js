const express = require('express');
const app = express();
const PORT = 4444;
const db = require('../database/db.js');
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
    console.log(data)
    res.send(data);
  })
})

app.post('/api/products', (req, res) => {
  //const queryString = `INSERT INTO products (productname, productpic, productprice, producttype) VALUES ('${name}', '${url}', ${price}, ${type});`;
  console.log('Received request for', req.body)
  let product = { name, price, type } = req.body;
  if (!product.name || product.name.length > 6 || !product.price || !product.type) {
    res.status(400);
    res.end('Improper parameters.');
  }
  else {
    db.postProduct(product, (err, data) => {
      res.status(201);
      res.end();
    })
    res.end();
  }
})

app.listen(PORT, () => {
  console.log(`SCV Ready on port ${PORT}`);
});