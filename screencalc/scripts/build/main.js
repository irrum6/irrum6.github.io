try {
    let presenter = new Presenter(5.4, 2.7, 403, "Inches", "eng");
    presenter.display();
}
catch (ex) {
    if (ex.message) console.error(ex.message);
    console.log(ex);
}

function drawRedrawCanvas() {
    let canvas = q('#display-canvas');
    let ratio = 1.78;
    let proportion = innerWidth > innerHeight ? 0.45 : 0.9;
    let w = Math.round(innerWidth * proportion);
    let h = w / ratio;
    canvas.width = w;
    canvas.height = h;
    let color = 'rgb(160,192,176)';
    canvas.style.backgroundColor = color;
}

drawRedrawCanvas();