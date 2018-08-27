var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'rene',
  password: 'password',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected to MySQL as id ' + connection.threadId);
  isBuying();
  // connection.end();
});

function showProducts(func) {
  var query = connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity > 0',
    function(err, res) {
      if (err) throw err;
      console.log(
        '\n----------------------------------------------------------- B A M A Z O N -----------------------------------------------------'
      );
      console.log(
        '-------------------------------------------------------------------------------------------------------------------------------\n'
      );

      console.table(res);
      console.log(res[0].price);
      console.log(query._results[0][0].price);
      func();
    }
  );
}

function isBuying() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'wantsToBuy',
        message: 'Do you want to buy something?'
      }
    ])
    .then(function(user) {
      if (user.wantsToBuy == true) {
        showProducts(getOrder);
      } else {
        connection.end();
        console.log('connection ended');
      }
    });
}

function getOrder() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'itemId',
        message: 'Enter item id of product: '
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'Enter quantity to buy: '
      }
    ])
    .then(function(product) {
      console.log(product.itemId, product.quantity);
      connection.end();
    });
}

function updateProducts(item, qty, func) {
  connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        stock_quantity: qty
      },
      {
        item_id: item
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + ' products updated!\n');
      // Call deleteProduct AFTER the UPDATE completes
    }
  );
}
