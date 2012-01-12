var BLOCKSIZE = 50;
var WIDTH = 10;
var HEIGHT = 10;

var grid = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

setInterval(execute, 1000);
console.log('Javascript loaded');

function execute() {
	drawgrid();
	calculate();
}

function calculate() {
	var newGrid = createNewGrid();
	for(y = 0; y < grid.length; y++) {
		for(x = 0; x < grid[y].length; x++) {
			var cell = grid[y][x];
			var count = 0;
			if (x > 0 && y > 0) { count += grid[y-1][x-1]; }
			if (y > 0) { count += grid[y-1][x]; }
			if (y > 0 && x < WIDTH-1) { count += grid[y-1][x+1]; }
			if (x > 0) { count += grid[y][x-1]; }
			if (x < WIDTH-1) { count += grid[y][x+1]; }
			if (x > 0 && y < HEIGHT-1) { count += grid[y+1][x-1]; }
			if (y < HEIGHT-1) { count += grid[y+1][x]; }
			if (x < WIDTH-1 && y < HEIGHT-1) { count += grid[y+1][x+1]; }

			var isAlive = cell;
			var result = 0;
			if (isAlive == 1 && count < 2) {
				result = 0;
			} else if (isAlive && count > 3) {
				result = 0;
			} else if (isAlive && (count == 2 || count == 3) ) {
				result = 1;
			} else if (!isAlive && count == 3) {
				result = 1;
			}
			newGrid[y][x] = result;
		}
	}
	// assign newgrid to grid
	grid = newGrid;
	//console.log(newGrid);
}

function createNewGrid() {
	var newGrid = new Array(HEIGHT);
	for(i = 0; i < newGrid.length; i++) {
		newGrid[i] = new Array(WIDTH);
	}
	return newGrid;
}

function drawgrid() {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	for (var y = 0; y < WIDTH; y++) {
		for (var x = 0; x < WIDTH; x++) {
			var life = grid[y][x];
			
			if (life == 0) {
				ctx.fillStyle = "lightgrey";
			} else {
				ctx.fillStyle = "green";
			}
			ctx.fillRect(x*BLOCKSIZE, y*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
		}
	}
	ctx.save();
}

/*
setInterval(draw, 1000);
function draw() {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#FF0000";
	ctx.fillRect(0,0,50,50);
	ctx.save();
	ctx.translate(50,50);
	ctx.save();
}
*/
