module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salary: {
            type: Sequelize.DOUBLE.UNSIGNED.ZEROFILL,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Employee;
};