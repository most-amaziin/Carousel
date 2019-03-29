const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB
}

const client = new Client(config);

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});
