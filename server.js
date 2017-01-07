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
var player_count = 30;
var last_player_id = 0;

var number_of_treats = 10;
var type_of_treats = ['car', 'ac', 'shoe', 'cloth', 'home', 'phone'];
var weights = [150, 15, 15, 15, 250, 70];

var earth_score = 6000;


var treats = [];
function treatsUpdate(){
  for(i=0; i < number_of_treats; i++) {
    type_of_treat = Math.floor(Math.random() * type_of_treats.length);
    treat_position = {'x': Math.floor(Math.random() * 1200) + 1, 'y': Math.floor(Math.random() * 900) + 1}
    treats.push({'type': type_of_treats[type_of_treat], 'position': treat_position, 'weigth': weights[type_of_treat]})
  }
};

function treatCountCheck(){
  if (treats.length>75)
    console.log("Treats on map" + treats.length)
  else
    treatsUpdate();
};


setInterval(treatCountCheck, 10000);


io.on('connection', function (socket) {
  socket.on('client_register', function(data) {
    if(Object.keys(game_status).length > player_count)
      return;

    last_player_id += 1;
    game_status[socket.id] = {'x': Math.floor(Math.random() * 1400) + 1, 'y': Math.floor(Math.random() * 800) + 1, 
    'player_id': last_player_id, 'score': 0, 'karma': 200}
    console.log(Object.keys(game_status).length);
    socket.emit('client_info', {'id': socket.id, 'player_id': last_player_id, 'player_status': game_status[socket.id]});
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

    x = client_status.x;
    y = client_status.y;

    if(client_status.score >1000){
      client_status.karma -= 5
      // console.log(client_status.karma);
    };

    for(treat_id in treats) {
      treat = treats[treat_id];
      x_diff = Math.abs(treat.position.x - x);
      y_diff = Math.abs(treat.position.y - y);

      // console.log(x_diff, y_diff, treat.x, x);

      if(x_diff <= 40 && y_diff <= 40) {
        earth_score += treat.weigth;
        client_status['score'] += treat.weigth;
        treats.splice(treat_id, 1);
        break;
      }

    }
    if(x<250 && y<250 && client_status.karma < 200){
      client_status.karma += 10;
    }

    if(x<250 && y>777 && client_status.karma < 200){
      client_status.karma += 10;
    }

    if(x>1100 && y>777 && client_status.karma < 200){
      client_status.karma += 10;
    }
    socket.emit('score_update', {'id': socket.id, 'player_id': last_player_id, 'player_status': game_status[socket.id]});

    socket.emit('karma_update', {'id': socket.id, 'player_id': last_player_id, 'player_status': game_status[socket.id].karma});

    // console.log(client_status);
    // console.log(game_status);
  });
  socket.on('game_status', function(data) {
    socket.emit('game_status', {'game_status': game_status, 'treats': treats, 'earth_score': earth_score});
  });

  ;
  socket.on('disconnect', function(data) {
    console.log('Client disconnect!'+socket.id);
    delete game_status[socket.id]
  });
});
