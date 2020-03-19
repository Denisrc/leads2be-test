const routes = require("express").Router();
const authenticate = require("../utils/authenticate");
const employeeController = require("../controllers/employeeController");

routes.post("/", authenticate, employeeController.create);
routes.get("/", employeeController.findAll);
routes.get("/:id", employeeController.findOne);
routes.put("/:id", employeeController.update);
routes.delete("/:id", employeeController.delete);

module.exports = routes;