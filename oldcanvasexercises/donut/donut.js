var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//border color
ctx.strokeStyle = '#ee00ff';
//fill color
ctx.fillStyle = '#ee00ff';
//variables to move
var step = 0;
var currentX = 0;
var currentY = 0;

var stop = 6.28
function draw() {
    //increase angle by one radian
    step = step + 0.068;
    //change color after each complete circle
    if (step > stop) {
        step = 0;
        //stop = stop + 6.28;
        var color = randRGB();
        //var colorGradient = ctx.createRadialGradient(0, 0, 50, canvas.width, canvas.height, 50);
        //colorGradient.addColorStop(0, "red");
        //colorGradient.addColorStop(1, "white");
        //ctx.strokeStyle = colorGradient;
        //ctx.fillStyle = colorGradient;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }
    //start draw again
    ctx.beginPath();
    //calculate next coordinates to move
    currentX = nextX(step);
    currentY = nextY(step);
    //move
    ctx.moveTo(currentX, currentY);
    //draw circle
    ctx.arc(currentX, currentY, 25, 0, 2 * Math.PI);
    //fill circle with color
    ctx.fill();
    ctx.stroke();
}


var execute = setInterval(function () { draw() }, 1000 / 60);
