let canvas = document.querySelector("canvas");

let render = canvas.getAttribute("data-app-render");
let layers = canvas.getAttribute("data-app-layers");

let dimm = 0;
if (render === "onscreen") {
    let width = window.innerWidth;

    let height = window.innerHeight;

    dimm = Math.min(width, height);
    dimm = Math.floor(dimm * 0.96);

} else {
    dimm = Number(render);
}

canvas.width = dimm;
canvas.height = dimm;

layers = Number(layers);
let context = canvas.getContext("2d");

context.fillStyle = "#90c030";
context.beginPath();
context.rect(0, 0, canvas.width, canvas.height);
context.fill();
context.closePath();