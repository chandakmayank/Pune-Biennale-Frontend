var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
app.use(express.static('Client'))

app.get('/display', function (req, res) {
  res.sendfile('Client/display.html');
});

var game_status = {};
var player_count = 60;

io.on('connection', function (socket) {
  socket.on('client_register', function(data) {
    if(Object.keys(game_status).length > player_count)
      return;

    game_status[socket.id] = {'x': Math.floor(Math.random() * 1400) + 1, 'y': Math.floor(Math.random() * 800) + 1}
    console.log(Object.keys(game_status).length);
    socket.emit('client_info', {'id': socket.id});    
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('game_input', function(data) {
    id = data['client_id'];
    if(!id || !game_status[id]) {
      return;
    }
    var client_status = game_status[id];
    console.log(client_status);
    var move = data['move'];
    if(move=='left') {
      client_status['x'] -= 35;
    }
    else if(move=='right') {
      client_status['x'] += 35;
    }
    else if(move=='up') {
      client_status['y'] -= 35;
    }
    else if(move=='down') {
      client_status['y'] += 35;
    }
    console.log(client_status);
    console.log(game_status);
  });
  socket.on('game_status', function(data) {
    socket.emit('game_status', game_status);
  });
  socket.on('disconnect', function(data) {
    console.log('Client disconnect!'+socket.id);
    delete game_status[socket.id]
  });

});
