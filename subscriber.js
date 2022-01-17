const amqp = require('amqplib/callback_api');
const { promises: Fs } = require('fs')
const excelToJson = require('convert-excel-to-json');
const mongoose = require('mongoose');
const Employee = require('./models/Empolyee.js');


mongoose.connect('mongodb://localhost:27017/empDB');
const db = mongoose.connection;

db.on('error', () => {
    console.log('error');
});

db.once('open', () => {
    console.log('in>>>>>>>>>>>>');
});

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'messageQ';
        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            let messages = JSON.parse(msg.content.toString('utf-8'));
            console.log(" [x] Received %s", msg.content.toString('utf-8'));

            //console.log("ssss", Fs.access(messages[1] + "/" + messages[0]))
            Fs.access(messages[1] + "/" + messages[0]).then(fileExist => {
                mdb(messages);
            })
                .catch(fileError => {
                    //throw new Error('File not found');
                    console.log("fileError", fileError);
                })
        }, {
            noAck: true
        });
    });
});


let mdb = (messages) => {
    try {
        const result = excelToJson({
            sourceFile: messages[1] + "/" + messages[0],
            columnToKey: {
                A: 'emp_id',
                B: 'name',
                C: 'address',
                D: 'isExist'
            },
            header: {
                rows: 1
            }
        });

        if (result) {
            const response = store(result)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log("error=>>>", error)
                })
        }
    } catch (error) {
        throw new Error('Something wrong');
    }
}


const store = (data) => {
    return Employee.insertMany(
        data.Sheet1
    );
}


