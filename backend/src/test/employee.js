process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");

const db = require("../models/index");
const Employee = db.employees;

chai.use(chaiHttp);

describe("Employee", () => {
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
        it("it should return all employees", (done) => {
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
            Employee.create(employee)
                .then(data => {})
                .catch(err => {});
            Employee.create(employee2)
                .then(data => {})
                .catch(err => {});

            chai.request(server)
                .get("/api/employee")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("Array");
                    response.body[0].should.have.property("name");
                    response.body[0].should.have.property("name").eql("Employee 1");
                    response.body[0].should.have.property("id");
                    response.body[0].should.have.property("id").eql(1);
                    response.body[1].should.have.property("name");
                    response.body[1].should.have.property("name").eql("Employee 2");
                    response.body[1].should.have.property("id");
                    response.body[1].should.have.property("id").eql(2);
                    done();
                });
        });
    });

    // Test /GET/:id route
    describe("/GET/:id Employee with id", () => {
        it("it should return employee with id", (done) => {
            let employee = {
                name: "Employee 1",
                salary: 2000,
                role: "Test Role 1"
            };

            chai.request(server)
                .get("/api/employee/1")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("Object");
                    response.body.should.have.property("name");
                    response.body.should.have.property("name").eql("Employee 1");
                    response.body.should.have.property("id");
                    response.body.should.have.property("id").eql(1);
                    done();
                });
        });
    });
})