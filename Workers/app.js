var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || 'Hello World!';
        ch.assertQueue(q, {durable: true});
        ch.sendToQueue(q, new Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});