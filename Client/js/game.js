//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "black";
ctx.font = GAME_FONTS;
//---------------
//Preloading ...
//---------------
//Preload Map
var mapImage = new Image();
mapImage.ready = false;
mapImage.onload = setAssetReady;
mapImage.src = PATH_MAP;
//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

//Preload Car
var carImage = new Image();
carImage.ready = false;
carImage.onload = setAssetReady;
carImage.src = PATH_CAR;

//Preload AC
var acImage = new Image();
acImage.ready = false;
acImage.onload = setAssetReady;
acImage.src = PATH_AC;

//Preload Shoe
var shoeImage = new Image();
shoeImage.ready = false;
shoeImage.onload = setAssetReady;
shoeImage.src = PATH_SHOE;

//Preload Car
var carImage = new Image();
carImage.ready = false;
carImage.onload = setAssetReady;
carImage.src = PATH_CAR;




function setAssetReady() {
    this.ready = true;
}
//Display Preloading
ctx.fillRect(0, 0, stage.width, stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);
var gameloop, facing, currX, currY, charX, charY, isMoving;
var socket = io();
socket.connect('http://localhost:8080/', {
    autoConnect: true
});
var client_id;
var socket = io.connect('http://localhost:8080');
socket.on('client_info', function (data) {
    console.log(data);
    client_id = data['id'];
    console.log("client_id " + client_id);
    socket.emit('my other event', {
        my: 'data2'
    });
});
socket.on('change_display', function (data) {
    console.log(data);
});

function preloading() {
    if (charImage.ready) {
        clearInterval(preloader);
        //Initialise game
        // facing = "E"; //N = North, E = East, S = South, W = West
        // isMoving = false;
        gameloop = setInterval(update, TIME_PER_FRAME);
        // setInterval(renderTreats, TIME_PER_FRAME);
        socket.emit("init_client", {
            'client_id': 'test'
        })
    }
}

function keyUpHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);
    if ((keyPressed == "W") || (keyPressed == "A") || (keyPressed == "S") || (keyPressed == "D")) {
        isMoving = false;
    }
}
//------------
//Game Loop
//------------
charX = CHAR_START_X;
charY = CHAR_START_Y;
currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;

var treatPosition = {
   'car':{   'x': 400,
   'y':400}};


   function update() {
    ctx.fillStyle = "#F9FBF9";
    ctx.fillRect(0, 0, stage.width, stage.height)
    ctx.drawImage(mapImage, 0, 0);
    socket.emit('game_status');
    socket.on('game_status', function (data) {
        renderTreats(treatPosition );

        for (var key in data) {
            client_status = data[key];
            x = client_status['x'];
            y = client_status['y'];
            ctx.drawImage(charImage, x, y);

        }
    });
}


function renderTreats(x){
    var carPosition = x.car;
    console.log(carPosition);
    ctx.drawImage(carImage, carPosition.x-100,carPosition.y-100);
    // ctx.drawImage(shoeImage, x+100,y+100);
    // ctx.drawImage(acImage, x+200,y-100);
    // ctx.drawImage(shoeImage, x+20,y-100);
    ctx.drawImage(carImage, carPosition.x+320,carPosition-140);
};