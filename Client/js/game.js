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

var charImageGirl = new Image();
charImageGirl.ready = false;
charImageGirl.onload = setAssetReady;
charImageGirl.src = PATH_CHAR_GIRL;

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

//Preload Cloth
var clothImage = new Image();
clothImage.ready = false;
clothImage.onload = setAssetReady;
clothImage.src = PATH_CLOTH;

//Preload Home
var homeImage = new Image();
homeImage.ready = false;
homeImage.onload = setAssetReady;
homeImage.src = PATH_HOME;

//Preload Phone
var phoneImage = new Image();
phoneImage.ready = false;
phoneImage.onload = setAssetReady;
phoneImage.src = PATH_PHONE;

var treat_objs = {
  'car': carImage,
  'ac': acImage,
  'shoe': shoeImage,
  'cloth': clothImage,
  'home': homeImage,
  'phone': phoneImage
};

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

//------------
//Game Loop
//------------
charX = CHAR_START_X;
charY = CHAR_START_Y;
currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;

function update() {
  ctx.fillStyle = "#F9FBF9";
  ctx.fillRect(0, 0, stage.width, stage.height)
  ctx.drawImage(mapImage, 0, 0, 1271,843,
    0, 0,  stage.width, stage.height);
  socket.emit('game_status');
  socket.on('game_status', function (data) {

    elem = document.getElementById('earth_score');
    elem.innerHTML = data['earth_score'];

    score_elem = document.getElementById('player_scores');
    score_elem.innerHTML = '';

    renderTreats(data['treats']);
    
    for (var key in data['game_status']) {
      client_status = data['game_status'][key];
      x = client_status['x'];
      y = client_status['y'];
      var charSelector = isOdd(client_status.player_id);
    
      if(charSelector==0)
        ctx.drawImage(charImage, x, y);
      else
        ctx.drawImage(charImageGirl,x,y)
      ctx.fillStyle = "black";
      ctx.fillText(client_status.player_id, x+28, y+70);

      row = score_elem.insertRow();

      cell = row.insertCell();
      cell.innerHTML = "Player " + client_status.player_id;
      
      cell = row.insertCell();
      cell.innerHTML = '---';

      cell = row.insertCell();
      cell.innerHTML = client_status.score;
    }
  });
}

function isOdd(num) { return num % 2;}


function renderTreats(x){
    x.forEach(function(treat) {
      ctx.drawImage(treat_objs[treat.type], treat.position.x, treat.position.y);
    });
};
