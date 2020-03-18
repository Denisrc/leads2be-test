const routes = require("express").Router();

employeeRoute = require("./routes/employeeRoutes");

module.exports = app => {
    app.use("/api/employee", employeeRoute);
}