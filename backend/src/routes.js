const routes = require("express").Router();

employeeRoute = require("./routes/employeeRoutes");
userRoute = require("./routes/userRoutes");

module.exports = app => {
    app.use("/api/", userRoute);
    app.use("/api/employee", employeeRoute);
}