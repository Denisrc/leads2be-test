const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const environment = process.env.NODE_ENV;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models/index");
// db.sequelize.sync({ force: true });
db.sequelize.sync();

require("./routes")(app);

app.listen(3333);

module.exports = app;