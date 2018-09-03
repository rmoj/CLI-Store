DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(70),
    department_name VARCHAR(35),
    price DECIMAL(6,2),
    stock_quantity SMALLINT(5),
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Apple 27-inch Thunderbolt Display","Computers & Accessories",374.99,31);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Apple MacBook Pro 13 (Mid 2012)","Computers & Accessories", 399.87,112);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("TAG Heuer Men's Fomula 1 Stainless Steel Watch","Clothing, Shoes & Jewelry",374.99,31);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Harry Potter and the Sorcerer's Stone","Books & Audible",8.87,967);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Xbox One X 1TB Console","Movies, Music & Games",472.95,31);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Tview 20-Inch Car Flip Down Monitor","Automotive & Industrial",197.67,19);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Ray-Ban Aviator Small Sunglasses","Clothing, Shoes & Jewelry",153.00,23);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Eureka Ergonomic Z1-S Gaming Desk","Home, Garden, Pets & Tools",179.00,1);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Tamashii Nations Meisho Ronin Jango Fett Action Figure","Toys, Kids & Baby",69.87,50);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Morakniv Bushcraft Fixed Blade Knife Sandvik Stainless Steel Blade","Sports & Outdoors",34.99,32);



