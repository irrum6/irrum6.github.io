document.getElementById('eraser').addEventListener('click', () => {
    //init eraser
    if (!eraseState) {
        sketch.color = "#CCEEFF";
        eraseState = true;
        document.getElementById('eraser').classList.remove("pinkRed");
        document.getElementById('eraser').classList.add("grey");

    } else {
        //restore button's appearance and default color
        eraseState = false;
        sketch.color = "#000000";
        document.getElementById('eraser').classList.remove("grey");
        document.getElementById('eraser').classList.add("pinkRed");
    }

});

document.getElementById('new').addEventListener('click', () => {
    context.beginPath();
    context.strokeStyle = "#CCEEFF";
    context.fillStyle = "#CCEEFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.save();
    //context.clearRect(0, 0, canvas.width, canvas.height);
});

var downlink = document.getElementById('save');
setInterval(function () {
    downlink.href = canvas.toDataURL("image/png");
    downlink.download = "image.png";
    //console.log(downlink);
}, 100);

document.getElementById('size').addEventListener('mouseover', () => {
    document.querySelector('div#ColorDropdown').style.display = "none";
    document.querySelector('div#ListSize').style.display = "block";
    document.querySelector('div#ListSize').parentNode.style = "border-radius:0px;";
    correctOffset();
});

document.querySelector('canvas').addEventListener('mouseover', () => {
    document.querySelector('div#ListSize').style.display = "none";
    document.querySelector('div#ColorDropdown').style.display = "none";
});

document.getElementById('color').addEventListener('mouseover', () => {
    document.querySelector('div#ListSize').style.display = "none";
    document.querySelector('div#ColorDropdown').style.display = "block";
    correctOffset();

});

document.getElementById('redo').addEventListener('click', () => {
    sketch.restoreImageData(4);
});

document.getElementById('undo').addEventListener('click', () => {
    sketch.restoreImageData(3);
});