window.addEventListener('orientationchange', () => {
    window.setTimeout(resetCanvasAfterOrientation, 300);
});

let canvas = document.getElementById('canvas');

//define canvas side
let canvasSide = '0';


function resetCanvasAfterOrientation() {
    if (window.matchMedia("(orientation:portrait)").matches) {
        $('form').removeClass('form-inline');
        canvasSide = '300';
        canvas.setAttribute('width', canvasSide);
        canvas.setAttribute('height', canvasSide);
    } else {
        $('form').addClass('form-inline');
        canvasSide = '500';
        canvas.setAttribute('width', canvasSide);
        canvas.setAttribute('height', canvasSide);
    }
}
resetCanvasAfterOrientation();