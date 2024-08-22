
let canvas = document.getElementById('canvas');
//calculate canvas size according to device screen dimensions
canvas.width = Math.floor(window.innerWidth * 0.8);
canvas.height = Math.floor(window.innerHeight * 0.8);

let context = canvas.getContext('2d');
context.translate(0.5, 0.5);

//set the offset to correct coordinates
let offset = canvas.getBoundingClientRect();

function correctOffset() {
    offset = canvas.getBoundingClientRect();
}
setInterval(correctOffset, 100);

window.onresize = () => {
    //window resize cause elements to move so we need to readjust offtest too
    offset = canvas.getBoundingClientRect();
}

let sketch = new Sketch(context);

var mousedown = false;
let apromixation = true;
let eraseState = false;

//initial draw rect
context.beginPath();
context.strokeStyle = "#CCEEFF";
context.fillStyle = "#CCEEFF";
context.fillRect(0, 0, canvas.width, canvas.height);
context.save();

//initial save point
sketch.addImageData({ sx: 0, sy: 0, sw: canvas.width, sh: canvas.height });