CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(

  id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR (50) NOT NULL,
  price DECIMAL (10,4) NOT NULL,
  stock_quantity INTEGER (10) NOT NULL,
  PRIMARY KEY (id)

);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("A Day in the Life of Marlon Bundo", "Books", 11.39, 150),
("NETGEAR Home Security", "Electronics", 509.99, 200),
("Echo Dot", "Electronics", 39.99, 200),
("Case for Nintendo Switch", "Electronics", 11.59, 200),
("A Higher Loyalty: Truth, Lies, and Leadership", "Books", 17.99, 180),
("Fascism: A Warning", "Books", 17.16, 155),
("Stereo Headphones", "Electronics", 15.15, 150),
("Star Wars: The Screaming Citadel", "Books", 11.22, 200),
("adidas outdoor Kids", "Shoes", 50.99, 250),
("Mace Windu Light Saber", "Toys", 9.99, 175);

SELECT * FROM bamazon.products;