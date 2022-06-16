const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(err, conn) {
    conn.createChannel(function(err, ch) {
        const ex = 'pubsub_meetup42';

        ch.assertExchange(ex, 'fanout', {durable: false});

        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            ch.bindQueue(q.queue, ex, '');

            ch.consume(q.queue, function(msg) {
                console.log(" [x] %s", msg.content.toString());
            }, {noAck: true});
        });
    });
});