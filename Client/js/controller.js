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

socket.on('disconnect', function () {
	console.log('Game disconnected!');
	document.getElementById("socketconn").style.color = "red"

	var d = document.getElementById("socketconn");
	d.className = "lead bg-danger";
	document.getElementById("socketconn").innerHTML = "You got too Greedy. Bye Bye"

});

socket.emit('client_register');

socket.on('client_info', function (data) {
	client_id = data['id'];
	x = document.getElementById("socketconn");
	x.innerHTML = "Connected as PLAYER " + data.player_id; 
});

socket.on('score_update', function (data) {
	client_id = data['id'];
	y = document.getElementById("score");
	y.innerHTML = data.player_status.score; 
	z = document.getElementById("karma");
	z.innerHTML = data.player_status.karma; 
	if (data.player_status.karma <1){
		socket.disconnect();
	}
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
