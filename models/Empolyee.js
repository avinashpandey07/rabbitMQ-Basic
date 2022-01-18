const mongoose = require('mongoose');

const { Schema } = mongoose;
const employeeSchema = new Schema({
    emp_id: {
        type: Number,
        index: { unique: true },
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    isExist: {
        type: Boolean,
    },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
