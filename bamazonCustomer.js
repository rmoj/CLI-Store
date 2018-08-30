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
      '\n-------------------------------------------- B A M A Z O N --------------------------------------'
    );
    console.log(
      '-------------------------------------------------------------------------------------------------\n'
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
      var reg = new RegExp('^[0-9]+$');
      if (
        reg.test(product.id) &&
        reg.test(product.quantity) &&
        product.correct === true
      ) {
        console.log(product.id, product.quantity);
        getItem(product.id, product.quantity);
      } else {
        getOrder();
      }
    });
}

function Product(id, name, price, stockQty, qtyToBuy) {
  this.item_id = id;
  this.product_name = name;
  this.price = price;
  this.stock_quantity = stockQty;
  this.quantityToBuy = qtyToBuy;
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
      var item = new Product(
        res[0].item_id,
        res[0].product_name,
        res[0].price,
        res[0].stock_quantity,
        qty
      );
      // updateProducts(item);
      showReceipt(item);
    } else {
      console.log('\nInsufficient Quantity!\n');
      isBuying('Do you want to buy something else then?');
    }
  });
}

function updateProducts(product) {
  var newQty = product.stock_quantity - product.qtyToBuy;
  connection.query(
    'UPDATE products SET ? WHERE ?',
    [
      {
        stock_quantity: newQty
      },
      {
        item_id: item.item_id
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products updated!\n');

      showReceipt(product);
    }
  );
}

function showReceipt(prod) {
  console.log('\nB A M A Z O N\n');
  console.log('*** Official Receipt ***\nThank you for shooping.\n');

  var total = parseFloat(prod.quantityToBuy) * parseFloat(prod.price);

  var purchased = [
    {
      quantity: prod.quantityToBuy,
      item: prod.product_name,
      price: prod.price,
      total: total.toFixed(2)
    }
  ];

  console.table(purchased);

  isBuying('Do you want to purchase another item?');
}

function exitApp() {
  connection.end();
  console.log('\nApplication Terminated\n');
}
