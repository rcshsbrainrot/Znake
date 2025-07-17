var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');

var w = mycanvas.width;  // 700
var h = mycanvas.height; // 700

var cellsX = 35;  // number of horizontal cells
var cellsY = 35;  // number of vertical cells (same for square)

var snakeSize = Math.floor(w / cellsX);  // 700 / 35 = 20

var score = 0;
var snake;
var food;
