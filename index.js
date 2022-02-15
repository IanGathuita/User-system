const express = require('express');


const app = express();
app.use(express.json());
const sql = require('mssql');
require('dotenv').config();
const routes = require("./Routes/routes")

app.use(routes);

app.listen(4000,() => console.log("Listening for requests ..."));

