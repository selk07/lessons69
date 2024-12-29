const express = require('express');
const cors= require ('cors');
const dotenv= require ('dotenv');
require("dotenv").config();
const bodyParser = require('body-parser')
const connectDB = require('./config/connectDB')
const app = express();
dotenv.config();
connectDB()

app.use(cors());
app.use(bodyParser.json())

require('./routes/')(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});