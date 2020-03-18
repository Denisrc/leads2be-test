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
})