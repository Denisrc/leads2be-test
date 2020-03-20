const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const stage = require('./config/dbConfig')["dev"];

mongoose.connect(stage.DBHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

require("./routes")(app);

var listener = app.listen(3333, function() {
    console.log("Listening on port " + listener.address().port);
});

module.exports = app;
