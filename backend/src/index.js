const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require('pg');

const app = express();

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
})
client.connect()

app.use(bodyParser.json());

app.listen(3333);

module.exports = app;