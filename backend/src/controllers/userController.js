const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authkey = require("../config/authkey");
const User = require("../models/userModel");

module.exports = {
    async create(request, response) {
        let userBody = request.body;

        if (!userBody.username || !userBody.password) {
            return response.status(400).send({message: "Invalid parameters. User and password required"});
        }

        const userSearch = await User.findOne({
            username: userBody.username
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


        var newUser = new User(user);

        newUser.save((err, user) => {
            if (err) {
                response.status(422).send(err);
            } else {
                response.json(user);
            }
        });
    },

    async login(request, response) {
        
        const user = await User.findOne({
            username: request.body.username
        });


        if (user !== null) {
            const validPass = await bcrypt.compare(request.body.password, user.password);

            if (!validPass) return response.status(400).send({message: "Username or Password Invalid!"});

            // Create JWT token
            const token = jwt.sign({id: user.id}, authkey.SECRET_KEY);

            return response.header('auth-token', token).send({token: token});
        } else {
            return response.status(400).send({message: "Username or Password Invalid!"});
        }
    }
}