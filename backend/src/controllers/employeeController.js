const Employee = require("../models/employeeModel");
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
    // Create a new Employee
    async create(request, response) {
        var newEmployee = new Employee(request.body);

        newEmployee.save((err, employee) => {
            if (err) {
                response.status(422).send(err);
            } else {
                response.json(employee);
            }
        });
    },

    // List all employees
    async findAll(request, response) {
        Employee.find({}, (err, employee) => {
            if (err) {
                return response.status(422).send(err);
            }
            if (employee == null) {
                return response.status(404).send({message: "Not found"});
            }
            return response.json(employee);
        });
    },

    // Find employee by id
    async findOne(request, response) {
        const id = request.params.id;

        Employee.findById(id)
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

        const employee = await Employee.updateOne({_id: new ObjectId(id)}, request.body, function(err, document) {
            if (err) {
                return response.status(422).send(err);
            }

            return response.json({message: "Sucessfuly Updated!"});
        });
    },

    // Delete employee by id
    async delete(request, response) {
        const id = request.params.id;

        const employee = await Employee.deleteOne({_id: new ObjectId(id)}, function(err, document) {
            if (err) {
                return response.status(422).send(err);
            }
            if (document.deletedCount == 0) {
                return response.status(404).send({message: "Not found"});
            }
            return response.json({message: "Employee successfully deleted!"});
        });
    }
}