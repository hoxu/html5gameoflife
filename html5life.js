var BLOCKSIZE = 50;
var WIDTH = 10;

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

setInterval(drawgrid, 1000);
console.log('lala');

function drawgrid() {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	for (x = 0; x < WIDTH; x++) {
		for (y = 0; y < WIDTH; y++) {
			var life = grid[x][y];
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
