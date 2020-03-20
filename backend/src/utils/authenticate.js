const jwt = require("jsonwebtoken");
const authkey = require("../config/authkey");

module.exports = function (request, response, next) {
    const token = request.header("auth-token");

    if (!token) return response.status(401).send({message: "Access Denied!"});

    try {
        const verified = jwt.verify(token, authkey.SECRET_KEY);
        request.user = verified;
        next();
    } catch(err){
        response.status(400).send({message: "Invalid token"});
    }
}