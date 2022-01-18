const assert = require('chai').assert;
const expect = require('chai').expect;
const publisher = require('../publisher');
const connectRMQ = require('../publisher');

describe('Publisher unit test', function () {

    it('check MQ connection: Error expected', () => {
        assert.throws(() => connectRMQ('amqp://localhostssssss'), Error, "Failed to connect with RabbitMQ");
    })

    it('check MQ connection: Success Expected', () => {
        console.log(assert(connectRMQ('amqp://localhost')))
    })
})