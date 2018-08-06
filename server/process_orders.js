const fs = require('fs');

const file = fs.readFileSync('../orders.txt').toString();

const ordersArray = file.split(',');

module.exports = {
    ordersArray:ordersArray
}

           