const assert = require('chai').assert;
const expect = require('chai').expect;
const publisher = require('../publisher');
const connectRMQ = require('../publisher');
const connect = require('../publisher-new');

describe('Publisher unit test', function () {

    it('check MQ connection: Success Expected', async () => {
        let res = await connect('amqp://localhost');
        expect(res).to.deep.equal({
            connection: true,
            error: false,
            message: 'Connection Established'
        });

    })
})