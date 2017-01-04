    // Create SocketIO instance, connect
    var socket = io();
    socket.connect('http://localhost:8080/', {
        autoConnect: true
    });
    // Add a connect listener
    socket.on('connect', function () {
            console.log('Display has connected to the server!');
            socket.emit('clientdata', {
                name: 'display'
            });
        })
        // Add a connect listener
    socket.on('message', function (data) {
        console.log('Received a message from the server!', data);
    });
    // Add a disconnect listener
    socket.on('disconnect', function () {
        console.log('The display has disconnected!');
    });
    // Sends a message to the server via sockets
    function sendMessageToServer(message) {
        socket.send(message);
    }; 