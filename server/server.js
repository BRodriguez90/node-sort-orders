const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pOrders = require('./process_orders');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res)=>{
    res.send(pOrders);
})

app.listen(3000, ()=> {
    console.log("App is running on port 3000");
});