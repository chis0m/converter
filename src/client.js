const net = require('net');
var client = new net.Socket();
client.connect({
    port: 5000
});

client.on('connect', function () {
    console.log('Client: connection established with server');

    var data = {
        "statement": {
            "id": "1546",
            "user": {
                "name": "chisom",
                "last_name": "ejim",
                "email": "test@company.com"
            }
        }
    }

    let str = JSON.stringify(data);


    // writing data to server
    client.write(str);

});

client.on('error', function (err) {
    console.log('An error occured:' + err);
})

client.on('data', function (data) {
    console.log('Data from server:' + data);
});

// setTimeout(function () {
//     client.end('Bye bye server');
// }, 5000);