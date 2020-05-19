let width = window.innerWidth;

let height = window.innerHeight;

let dim = Math.min(width, height);

dim = Math.floor(dim * 0.96);

let canvas = document.querySelector("canvas");

canvas.width = dim;
canvas.height = dim;

let context = canvas.getContext("2d");

context.fillStyle = "#90c030";
context.beginPath();
context.rect(0, 0, dim, dim);
context.fill();
context.closePath();

let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

const data = imageData.data;

const len = data.length;
let colArr = new Uint8Array(3);

for (let i = 0; i < len; i = i + 4) {
    window.crypto.getRandomValues(colArr);
    let [red, green, blue] = colArr;
    data[i] = red;
    data[i + 1] = green;
    data[i + 2] = blue;
    data[i + 3] = 100;
}

context.putImageData(imageData, 0, 0);

let pickw = 8, pickh = 8;
for (let i = 0, wh = canvas.width; i < wh; i += pickw) {
    for (let j = 0, hh = canvas.height; j < hh; j += pickh) {
        imageData = context.getImageData(i, j, pickw, pickh);
        let data = imageData.data;
        let [maxRed, maxGreen, maxBlue] = data;//[0],[1],[2];
        let len = data.length;
        //data[2] is alpha channels
        for (k = 3; k < len; k = k + 4) {
            maxRed = data[k] > maxRed ? data[k] : maxRed;
            maxGreen = data[k + 1] > maxGreen ? data[k + 1] : maxGreen;
            maxBlue = data[k + 2] > maxBlue ? data[k + 2] : maxBlue;
        }
        for (let l = 0; l < len; l = l + 4) {
            data[l] = maxRed > maxGreen ? maxRed : 0;
            data[l + 1] = maxGreen > maxBlue ? maxGreen : 0;
            data[l + 2] = maxBlue > maxRed && maxBlue > maxGreen ? maxBlue : 0;
        }
        context.putImageData(imageData, i, j)
    }
}