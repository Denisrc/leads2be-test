const bcrypt = require("bcrypt");
const db = require("../models/index");
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

        console.log(userSearch);

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

        console.log(user);

        if (user !== null) {
            const validPass = await bcrypt.compare(request.body.password, user.password);

            if (!validPass) return response.status(400).send({message: "Usernamer or Password Invalid"});

            return response.send({message: "Success"});
        }
    }
}