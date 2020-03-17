const routes = require("express").Router();
const employeeController = require("../controllers/employeeController");

routes.post("/", employeeController.create);

module.exports = routes;