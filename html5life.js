//var canvasElement=document.getElementById("myCanvas");

var BLOCKSIZE = 20;
var WIDTH = 800 / BLOCKSIZE; // canvasElement.width / BLOCKSIZE;
var HEIGHT = 600 / BLOCKSIZE; // canvasElement.height / BLOCKSIZE;
var INTERVAL = 150;

var grid = createNewGrid();
var newGrid = createNewGrid();
dummydata();

var running = true;
var refreshInterval = setInterval(execute, INTERVAL);
console.log('Javascript loaded');

function execute() {
	calculate();
	drawgrid();
}

function dummydata() {
	grid[3][2] = 1;
	grid[3][3] = 1;
	grid[3][4] = 1;

	// glider
	grid[8][5] = 1;
	grid[8][6] = 1;
	grid[8][7] = 1;
	grid[7][7] = 1;
	grid[6][6] = 1;
}

function calculate() {
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

			var result = 0;
			if (cell == 1 && count < 2) {
				result = 0;
			} else if (cell && count > 3) {
				result = 0;
			} else if (cell && (count == 2 || count == 3) ) {
				result = 1;
			} else if (!cell && count == 3) {
				result = 1;
			}
			newGrid[y][x] = result;
		}
	}
	// assign newgrid to grid
	var tmp = grid;
	grid = newGrid;
	newGrid = tmp;
}

function createNewGrid() {
	var newGrid = new Array(HEIGHT);
	for(i = 0; i < newGrid.length; i++) {
		newGrid[i] = new Array(WIDTH);
		for (var x = 0; x < WIDTH; x++) {
			newGrid[i][x] = 0;
		}
	}
	return newGrid;
}

function drawgrid() {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	for (var y = 0; y < HEIGHT; y++) {
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
	//ctx.save();
}

function toggleclick(e) {
	var canvas = document.getElementById('myCanvas');

	var canvasx = e.pageX - canvas.offsetLeft;
	var canvasy = e.pageY - canvas.offsetTop;

	var gridx = parseInt(canvasx / BLOCKSIZE);
	var gridy = parseInt(canvasy / BLOCKSIZE);

	console.log('click position = ' + gridx + ', ' + gridy);

	var result = grid[gridy][gridx];
	if (result == 1) { result = 0; } else { result = 1; }
	grid[gridy][gridx] = result;

	drawgrid();
}

function startstop() {
	var ele = document.getElementById('startstop');
	running = !running;
	if (running) {
		refreshInterval = setInterval(execute, INTERVAL);
		ele.innerHTML = 'Stop';
	} else {
		clearInterval(refreshInterval);
		ele.innerHTML = 'Start';
	}
}

