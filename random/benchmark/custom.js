let canvas = document.querySelector("canvas");

let search = document.location.search;

let pixels = search.split("&")[0];
if (pixels == "") {
    pixels = "pixels=1080";
};
pixels = pixels.split("=")[1];

let layers = search.split("&")[1];
if (layers == undefined) {
    layers = "layers=16384";
}
layers = layers.split("=")[1];

if (pixels === undefined) {
    pixels = "1080";
}

if (layers === undefined) {
    layers = "16384";
}

// debugger;
let dimm = Number(pixels);
canvas.width = dimm;
canvas.height = dimm;

let context = canvas.getContext("2d");

context.fillStyle = "#90c030";
context.beginPath();
context.rect(0, 0, canvas.width, canvas.height);
context.fill();
context.closePath();