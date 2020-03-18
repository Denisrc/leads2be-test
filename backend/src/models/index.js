const environment = process.env.NODE_ENV;
const dbConfig = require("../config/dbConfig")[environment];

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("./employeeModel")(sequelize, Sequelize);

module.exports = db;