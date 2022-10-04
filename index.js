const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var cors = require('cors');
const connection = require('./services/db.connection');

dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json())
connection();


app.listen(process.env.PORT,()=>{
    console.log('Server running on port ',process.env.PORT);
})
