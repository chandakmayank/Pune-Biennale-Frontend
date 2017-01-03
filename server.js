// Require HTTP module (to start server) and Socket.IO
var http = require('http');
var fs = require('fs');
var io = require('socket.io');
var port = 8080;
// Start the server at port 8080
var server = http.createServer(function (req, res) {
    // Send HTML headers and message
    fs.readFile('./controller.html', function (err, html) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(html)
    });
});
server.listen(port);
// Create a Socket.IO instance, passing it our server
var socket = io.listen(server);
// Add a connect listener
socket.on('connection', function (client) {
    console.log('Connection to client established');
    // Success!  Now listen to messages to be received
    client.on('message', function (event) {
        console.log('Received message from client!', event);
    });
    client.on('disconnect', function () {
        console.log('Server has disconnected');
    });
});
console.log('Server running at http://127.0.0.1:' + port + '/');