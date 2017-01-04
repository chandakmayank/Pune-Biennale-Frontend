//------------
//System Values
//------------
var STAGE_WIDTH = 1440,
	STAGE_HEIGHT = 1080,
	TIME_PER_FRAME = 300, //this equates to 30 fps
	GAME_FONTS = "bold 24px sans-serif";

var PATH_CHAR = "img/character.png";
var PATH_MAP = "img/pune map.png";
var PATH_CAR = "img/car.png";
var PATH_AC = "img/ac.png";
var PATH_HOME = "img/home.png";
var PATH_PHONE = "img/phone.png";
var PATH_SHOE = "img/shoe.png";
var PATH_CLOTH = "img/cloth.png";



var CHAR_WIDTH = 72,
	CHAR_HEIGHT = 96,
	CHAR_START_X = Math.floor(Math.random() * 1000) + 1  ,
	CHAR_START_Y = Math.floor(Math.random() * 800) + 1  ,
	CHAR_SPEED = 15,
	IMAGE_START_X = 0,
	IMAGE_START_NORTH_Y = 0,
	IMAGE_START_EAST_Y = 96,
	IMAGE_START_SOUTH_Y = 192,
	IMAGE_START_WEST_Y = 288,	
	SPRITE_WIDTH = 216;

var TEXT_PRELOADING = "Loading ...", 
	TEXT_PRELOADING_X = 200, 
	TEXT_PRELOADING_Y = 200;