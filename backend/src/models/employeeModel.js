const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        trim: true
    },
    salary: {
        type: 'Number',
        required: true
    },
    role: {
        type: 'String',
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);