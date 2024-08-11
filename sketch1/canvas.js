let lastPixel = {};

canvas.addEventListener('mousedown', (event) => {
    mousedown = true;
    let x = event.clientX - offset.left, y = event.clientY - offset.top;

    sketch.point(x, y)
    lastPixel = { x: x, y: y };
});

canvas.addEventListener('mousemove', (event) => {
    if (mousedown) {
        let x = event.clientX - offset.left, y = event.clientY - offset.top;

        if (lastPixel.x === undefined || lastPixel.y === undefined) {
            lastPixel = { x: x, y: y };
        }
        //corect mouse slips
        if (apromixation) {

            let deltaX = x - lastPixel.x, deltaY = y - lastPixel.y;

            if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {

                //how much pixels we need to add
                let length = Math.max(Math.abs(deltaX), Math.abs(deltaY));
                let xStep = deltaX / length, yStep = deltaY / length;
                for (let counter = 0; counter < length; counter++) {

                    let correctedX = Math.round(lastPixel.x + counter * xStep);
                    let correctedY = Math.round(lastPixel.y + counter * yStep);

                    sketch.point(correctedX, correctedY);
                }
            }
        }
        sketch.point(x, y)
        lastPixel = { x: x, y: y };

    }
});
canvas.addEventListener('mouseup', (event) => {
    mousedown = false;
    sketch.addImageData({ sx: 0, sy: 0, sw: canvas.width, sh: canvas.height });
});