CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  productname VARCHAR(6),
  productpic VARCHAR(100),
  productprice INTEGER,
  producttype VARCHAR(8)
)

CREATE INDEX on products (id);