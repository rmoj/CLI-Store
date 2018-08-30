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
  isBuying('Do you want to buy something?');
});

function showProducts(func) {
  var sqlQuery =
    "SELECT item_id AS 'Item ID', product_name AS Product, Price, stock_quantity AS 'Quantity in Stock' FROM products WHERE stock_quantity > 0";
  connection.query(sqlQuery, function(err, res) {
    if (err) throw err;
    console.log(
      '\n----------------------------------------------------------- B A M A Z O N -----------------------------------------------------'
    );
    console.log(
      '-------------------------------------------------------------------------------------------------------------------------------\n'
    );

    console.table(res);
    func();
  });
}

function isBuying(msg) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'wantsToBuy',
        message: msg
      }
    ])
    .then(function(user) {
      if (user.wantsToBuy == true) {
        showProducts(getOrder);
      } else {
        exitApp();
      }
    });
}

function getOrder() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Enter item id of product: '
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'Enter quantity to buy: '
      },
      {
        type: 'confirm',
        name: 'correct',
        message: 'Is this correct?'
      }
    ])
    .then(function(product) {
      if (product.correct == true) {
        console.log(product.id, product.quantity);
        getItem(product.id, product.quantity);
      } else {
        getOrder();
      }
    });
}

function getItem(itemId, qty) {
  var sqlQuery =
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = ' +
    itemId +
    ' AND stock_quantity >= ' +
    qty;

  connection.query(sqlQuery, function(err, res) {
    if (err) throw err;

    if (res.length > 0) {
      console.log('res[0].Price:' + res[0].price);
      var itemsRemaining = res[0].stock_quantity - qty;
      updateProducts(res[0].item_id, itemsRemaining);
    } else {
      console.log('\nInsufficient Quantity!\n');
      isBuying('Do you want to buy something else then?');
    }
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
      if (err) throw err;

      console.log(res.affectedRows + ' products updated!\n');
      // Call deleteProduct AFTER the UPDATE completes
    }
  );
}

function exitApp() {
  connection.end();
  console.log('\nApplication Terminated\n');
}
