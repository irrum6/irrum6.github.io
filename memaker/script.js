let context = canvas.getContext('2d');

let images = [];
//current count
let imageCount = 6;

let currentIndex = 0;

for (let i = 0; i < imageCount; i++) {
    let img = new Image();
    img.src = 'templates/' + i + '.jpg';
    img.crossOrigin = "Anonymous";
    images.push(img);
}


document.getElementById('macro').addEventListener('change', (event) => {
    currentIndex = event.target.selectedIndex;
    draw();
});

let toptext = document.getElementsByName('top')[0];
let midtext = document.getElementsByName('mid')[0];
let bottomtext = document.getElementsByName('bottom')[0];
let textarr = [toptext, midtext, bottomtext];

for (text of textarr) {
    text.addEventListener('keydown', (event) => {
        let text = event.target.value;
        if (text.length > 20) {
            text = text.subString(0, 19);
            event.target.value = text;
        }
        draw();
    });
}

function draw() {
    let top = toptext.value;
    let mid = midtext.value;
    let bottom = bottomtext.value;

    context.font = '30px serif';
    context.fillStyle = "#ffffff";

    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[currentIndex], 0, 0, canvas.width, canvas.height);
    context.stroke();
    context.fillText(top, 20, 50);
    context.fillText(mid, 30, Math.floor(canvasSide / 2));
    context.fillText(bottom, 30, canvasSide - 50);
}

let downlink = document.getElementById('save');

setInterval(function () {
    downlink.href = canvas.toDataURL("image/png");
    downlink.download = "image.png";
}, 100);

window.setTimeout(function () {
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    context.stroke();
}, 300)
