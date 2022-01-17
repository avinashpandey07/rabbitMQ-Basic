/**
 * To publish the message for the reciver.
 * 
 */

const amqp = require('amqplib/callback_api');

const rmqPublisher = (connectionString, message) => {
    try {

        let connectionURL = connectionString || 'amqp://localhost';
        //console.log(connectionURL);

        amqp.connect(connectionURL, (error0, connection) => {
            if (error0) {
                throw new Error(error0);
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw new Error(error1);
                }
                var queue = 'messageQ';
                let inputs = message || process.argv.slice(2, process.argv.length);
                if (Array.isArray(inputs)) {
                    channel.assertQueue(queue, {
                        durable: false
                    });

                    channel.sendToQueue(queue, Buffer.from(JSON.stringify(inputs)));
                    console.log(" Message Sent", inputs);
                } else {
                    throw new Error('Wrong Inputs')
                }
            });

            setTimeout(function () {
                connection.close();
                process.exit(0)
            }, 500);
        });
    } catch (error) {
        throw new Error('Not able to send message')
    }


}

rmqPublisher();

module.exports = rmqPublisher;