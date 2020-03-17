const db = require("../models/index");
const Employee = db.employees;
const Op = db.Sequelize.Op;

module.exports = {
    // Create a new itinerary
    async create(request, response) {
        if (!request.body.name) {
            response.status(400).send({message: "Name can not be empty!"});
            return;
        }

        // Create an Employee
        const employee = {
            name: request.body.name
        };

        // Save Employee in the database
        Employee.create(employee)
            .then(data => {
                response.send(data);
            })
            .catch(err => {
                response.status(500).send({
                    message: err.message || "Some error occurred while creathe the Employee"
                });
            });
    }
}