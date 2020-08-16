var canvas = document.getElementById('canvas1');

var context = canvas.getContext('2d');

var vx0 = 3;
var vy0 = 1;

var ball1 = new Ball(context, { x: 25, y: 25 }, 25, { vx: 3, vy: 1 }, "#0000C8");
var bounds = { xclose: 0, xfar: canvas.width, ylow: canvas.height, yhigh: 0 };



var lastRun;
var fps;

var balls = [];
balls[0] = ball1;

function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    ball1.move(bounds);
    ball1.draw(canvas);
    //FPS
    if (!lastRun) { lastRun = new Date().getTime(); }
    var delta = (new Date().getTime() - lastRun) / 1000;
    lastRun = new Date().getTime();
    fps = Math.round(1 / delta);

    context.fillStyle = "#0000AA";
    context.font = "30px Verdana";
    context.fillText(fps + 'FPS', 0, 50);
    context.fillStyle = "#00AA00";
    context.font = "30px Verdana";
    context.fillText('Click anywhere in a canvas to speed up ball', 50, 150);
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

canvas.addEventListener('mousedown', function (event) {
    ball1.vx = ball1.vx + 5;
    ball1.vy = ball1.vy + 5;
});

window.setInterval(function () {
    //every second ball speed decreases
    if (ball1.vx > vx0 && ball1.vy > vy0) {
        ball1.vx -= 1; ball1.vy -= 1;
    }
}, 1000);

function randRGB() {
    //return "#" + Math.round(Math.random() * 255) + Math.round(Math.random() * 255) + Math.round(Math.random() * 255);
    return "#" + Array.prototype.map.call(window.crypto.getRandomValues(new Uint8Array(3)), function (elem) { return elem.toString(16) }).join('');
}