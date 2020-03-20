const db = require("../models/index");
const Employee = db.employees;
const Op = db.Sequelize.Op;

module.exports = {
    // Create a new Employee
    async create(request, response) {
        // Create an Employee
        const employee = {
            name: request.body.name,
            salary: request.body.salary,
            role: request.body.role
        };

        // Save Employee in the database
        Employee.create(employee)
            .then(data => {
                response.send(data);
            })
            .catch(err => {
                response.status(500).send({
                    message: err.message || "Some error occurred while creating the Employee"
                });
            });
    },

    // List all employees
    async findAll(request, response) {
        Employee.findAll({})
            .then(data => {
                response.send(data)
            })
            .catch(err => {
                response.status(500).send({
                    message: err.message || "Some error ocurred while retrieving employees"
                });
            });
    },

    // Find employee by id
    async findOne(request, response) {
        const id = request.params.id;

        Employee.findByPk(id)
            .then(data => {
                if (data === null) {
                    return response.status(404).send({
                        message: "Employee not found"
                    });
                }
                response.send(data);
            })
            .catch(err => {
                response.status(500).send({
                    message: "Error retrieving Employee with id " + id
                });
            });
    },

    // Update employee by id
    async update(request, response) {
        const id = request.params.id;

        Employee.update(request.body, {
            where: {id: id}
        })
            .then(num => {
                if (num == 1) {
                    response.send({
                        message: "Employee was updated successfully"
                    });
                } else {
                    response.status(404).send({
                        message: "Cannot update Employee! Not Found!"
                    });
                }
            })
            .catch(err => {
                response.status(500).send({
                    message: "Error updating Employee"
                });
            });
    },

    // Delete employee by id
    async delete(request, response) {
        const id = request.params.id;

        Employee.destroy({
            where: {id: id}
        })
            .then(num => {
                if (num == 1) {
                    response.send({
                        message: "Employee was deleted successfully!"
                    });
                } else {
                    response.status(404).send({
                        message: "Cannot delete Employee! Not Found!"
                    });
                }
            })
            .catch(err => {
                response.status(500).send({
                    message: "Error deleting Employee"
                });
            });
    }
}