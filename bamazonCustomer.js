var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  makeTable();
});

var makeTable = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " || " + res[i].product_name + " || " +
        res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");

    }
    promptCustomer(res);
  })

}

var promptCustomer = function promptCustomer(res) {
  inquirer.prompt([{
    type: "input",
    name: "choice",
    message: "What would you like to buy?"

  }]).then(function (answer) {
    var correct = false;
    for (var i = 0; i < res.length; i++) {
      if (res[i].product_name == answer.choice || res[i].id == answer.choice) {

        correct = true
        var product = answer.choice;
        var id = i;
        inquirer.prompt({

          type: "input",
          name: "quant",
          message: "How many would you like to buy?",
          validate: function (value) {

            if (isNaN(value) == false) {
              return true;

            } else {

              return false;
            }
          }

        }).then(function (answer) {
          if (res[id].stock_quantity - answer.quant > 0) {
            var newQuantity = (parseInt(res[id].stock_quantity) - parseInt(answer.quant));
            connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?",[newQuantity, product], function (err, res2) {
              console.log("Thank you for the purchase!");
              
              makeTable();

            })
          } else {
            console.log("Sorry, there is not enough in stock. Please come again later.");
            promptCustomer(res)

          }
        })
      }
    }
    if (i == res.length && correct == false) {
      console.log("This is not for sale");
      promptCustomer(res)
    }
  })
};