const amqp = require('amqplib');

const connect = async (connectionString) => {
    try {
        let connectionURL = connectionString || 'amqp://localhost';
        let connection = await amqp.connect(connectionURL)
        return {
            connection: true,
            error: false,
            message: 'Connection Established'
        };
    }
    catch (error) {
        throw new Error('Failed to connect with RabbitMQ');
    }
}

module.exports = connect;


