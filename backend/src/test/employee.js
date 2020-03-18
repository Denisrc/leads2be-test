process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");

const db = require("../models/index");
const Employee = db.employees;

chai.use(chaiHttp);

describe("Employee", () => {
    beforeEach((done) => { // Before each test we empty the database
        Employee.destroy({
            where: {},
        })
        .then(nums => {
            done();
        })
        .catch(err => {
            done();
        });
    });

    // Test /POST route
    describe("/POST Employee", () => {
        it("it should POST a new employee", (done) => {
            let employee = {
                name: "Test",
                salary: 2000,
                role: "Test Role"
            };
            chai.request(server)
                .post("/api/employee")
                .send(employee)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("name");
                    response.body.should.have.property("name").eql("Test");
                    response.body.should.have.property("salary");
                    response.body.should.have.property("salary").eql(2000);
                    response.body.should.have.property("role");
                    response.body.should.have.property("role").eql("Test Role");
                    response.body.should.have.property("id");
                    done();
                });
        });
    });

    // Test /POST missing value
    describe("/POST Employee missing fields", () => {
        it("it should not create an employee and throw an error", (done) => {
            let employee = {
                salary: 2000,
                role: "Test Role"
            };
            chai.request(server)
                .post("/api/employee")
                .send(employee)
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.have.property("message");
                    response.body.should.have.property("message").eql("notNull Violation: employee.name cannot be null");
                    done();
                });
        });
    });

    // Test /GET route
    describe("/GET All Employees", () => {
        it("it should return all employees", function () {
            return new Promise(async function (resolve) {
                let employee = {
                    name: "Employee 1",
                    salary: 2000,
                    role: "Test Role 1"
                };
                let employee2 = {
                    name: "Employee 2",
                    salary: 4000,
                    role: "Test Role 2"
                };
                await Employee.create(employee)
                    .then(data => {})
                    .catch(err => {});
                await Employee.create(employee2)
                    .then(data => {})
                    .catch(err => {});

                chai.request(server)
                    .get("/api/employee")
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a("Array");
                        response.body[0].should.have.property("name");
                        response.body[0].should.have.property("name").eql("Employee 1");
                        response.body[1].should.have.property("name");
                        response.body[1].should.have.property("name").eql("Employee 2");
                    });
                resolve();
            });
        });
    });

    // Test /GET/:id route
    describe("/GET/:id Employee with id", () => {
        it("it should return employee with id", function () {
            return new Promise(async function (resolve) {
                let employee = {
                    name: "Employee 1",
                    salary: 2000,
                    role: "Test Role 1"
                };
                let createdEmployee = null;

                createdEmployee = await Employee.create(employee)
                    .then(data => {return data.id})
                    .catch(err => {});

                chai.request(server)
                    .get("/api/employee/" + createdEmployee)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a("Object");
                        response.body.should.have.property("name");
                        response.body.should.have.property("name").eql("Employee 1");
                    });
                resolve();
            });
        });
    });

    // Test /PUT/:id route
    describe("/PUT/:id Employee with id", () => {
        it("it should update employee with id", function() {
            return new Promise(async function (resolve) {
                let employee = {
                    name: "Employee 1",
                    salary: 2000,
                    role: "Test Role 1"
                };

                let createdEmployee = null;

                createdEmployee = await Employee.create(employee)
                    .then(data => { 
                        return data.id;
                    })
                    .catch(err => { });

                employee.name = "New Name";

                chai.request(server)
                    .put("/api/employee/" + createdEmployee)
                    .send(employee)
                    .end(async (err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a("Object");
                        response.body.should.have.property("message");
                        response.body.should.have.property("message").eql("Employee was updated successfully");
                    });
                
                resolve();
            });
        });
    });

    // Test /DELETE/:id route
    describe("/DELETE/:id Employee with id", () => {
        it("it should delete employee with id", function() { 
            return new Promise(async function (resolve) {
                let employee = {
                    name: "Employee 1",
                    salary: 2000,
                    role: "Test Role 1"
                };

                let createdEmployee = null;

                createdEmployee = await Employee.create(employee)
                    .then(data => { 
                        return data.id;
                    })
                    .catch(err => { });

                
                chai.request(server)
                    .delete("/api/employee/" + createdEmployee)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a("Object");
                        response.body.should.have.property("message");
                        response.body.should.have.property("message").eql("Employee was deleted successfully!");
                    });
                resolve();
            });
        });
    });
})