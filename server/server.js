const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orders = require('./process_orders');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res)=>{
    res.send(orders);
})

app.listen(3000, ()=> {
    console.log("App is running on port 3000");
});