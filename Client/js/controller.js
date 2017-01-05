var client_id;


var socket = io();
socket.connect('http://localhost:8080/', {
	autoConnect: true
});
socket.on('connect',function(){
	console.log("connected");
	var x = document.getElementById("socketconn");   // Get the element with id="demo"
x.style.color = "green";                     // Change the color of the element
});

// var socket = io.connect('http://localhost:8080',{autoConnect: true });
socket.emit('client_register');

socket.on('client_info', function (data) {
	client_id = data['id'];
});

function left() {
	console.log('left')
	socket.emit('game_input', {'move': 'left', 'client_id': client_id});
};

function right() {
	console.log('right')
	socket.emit('game_input', {'move': 'right' , 'client_id': client_id});
};

function up() {
	socket.emit('game_input', {'move': 'up' , 'client_id': client_id});
	console.log('up')
};

function down() {
	socket.emit('game_input', {'move': 'down' , 'client_id': client_id});
	console.log('down')
};