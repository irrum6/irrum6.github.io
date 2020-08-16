var canvas = document.getElementById('canvas1');

var context = canvas.getContext('2d');

var bounds = { xclose: 0, xfar: canvas.width, ylow: canvas.height, yhigh: 0 };

var lastRun;
var fps;

var balls = [new Ball({ x: 25, y: 25 }, 25, { vx: 3, vy: 1 }, "#0000C8")];

function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (element, index, array) {
        element.move(bounds);
        element.draw(context);
    });
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
    context.fillText('Click anywhere in a canvas for more balls', 50, 150);
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

canvas.addEventListener('mousedown', function (event) {
    balls.push(new Ball(
        {
            x: event.clientX,
            y: event.clientY
        },
        25,
        {
            vx: Math.round(Math.random() * 10),
            vy: Math.round(Math.random() * 10)
        },
        randRGB()));
});

function randRGB() {
    //return "#" + Math.round(Math.random() * 255) + Math.round(Math.random() * 255) + Math.round(Math.random() * 255);
    return "#" + Array.prototype.map.call(window.crypto.getRandomValues(new Uint8Array(3)), function (elem) { return elem.toString(16) }).join('');
}