var mysql = require('mysql');
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
  console.log('connected as id ' + connection.threadId);
  showProducts();
  connection.end();
});

function showProducts() {
  connection.query('SELECT * FROM products WHERE stock_quantity > 0', function(
    err,
    res
  ) {
    if (err) throw err;
    console.log(
      '\n----------------------------------------------------------- B A M A Z O N -----------------------------------------------------'
    );
    console.log(
      '-------------------------------------------------------------------------------------------------------------------------------\n'
    );

    console.table(res);
  });
}
