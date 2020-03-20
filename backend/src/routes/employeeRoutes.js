const routes = require("express").Router();
const authenticate = require("../utils/authenticate");
const employeeController = require("../controllers/employeeController");

routes.post("/", authenticate, employeeController.create);
routes.get("/", authenticate, employeeController.findAll);
routes.get("/:id", authenticate, employeeController.findOne);
routes.put("/:id", authenticate, employeeController.update);
routes.delete("/:id", authenticate, employeeController.delete);

module.exports = routes;