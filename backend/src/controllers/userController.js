const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const authkey = require("../config/authkey");
const User = db.users;
const Op = db.Sequelize.Op;

module.exports = {
    async create(request, response) {
        let userBody = request.body;

        if (!userBody.username || !userBody.password) {
            return response.status(400).send({message: "Invalid parameters. User and password required"});
        }

        const userSearch = await User.findOne({
            where: {
                username: userBody.username
            }
        });

        if (userSearch !== null) {
            return response.status(400).send({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(userBody.password, salt);

        let user = {
            username: userBody.username,
            password: hashPassword
        };

        // Save User in the database
        User.create(user)
            .then(data => {
                response.send(data.username);
            })
            .catch(err => {
                response.status(500).send({
                    message: err.message || "Some error occurred while creating the Employee"
                });
            });
    },
    async login(request, response) {
        
        const user = await User.findOne({
            where: {
                username: request.body.username
            }
        });

        if (user !== null) {
            const validPass = await bcrypt.compare(request.body.password, user.password);

            if (!validPass) return response.status(400).send({message: "Usernamer or Password Invalid"});

            // Create JWT token
            const token = jwt.sign({id: user.id}, authkey.SECRET_KEY);

            return response.header('auth-token', token).send({message: "Success"});
        }
    }
}