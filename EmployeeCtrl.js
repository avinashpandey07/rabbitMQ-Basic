const mongoose = require('mongoose');
const EmployeeModal = require('./models/Empolyee.js');

mongoose.connect('mongodb://localhost:27017/empDB', { useNewUrlParser: true, usedUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', () => {
    console.log('error');
});

db.once('open', () => {
    console.log('in>>>>>>>>>>>>')
});

const store = (req) => {
    let employee = new EmployeeModal({
        'emp_id': '001',
        'name': 'abc',
        'address': 'xyz',
        'isExist': false
    })
    employee.save();
}