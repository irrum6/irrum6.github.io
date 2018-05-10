document.body.appendChild(elem({
    tag: 'div',
    id: 'line1',
    cssClassList: ['red', 'line']
}));

window.setTimeout(function () {
    document.body.appendChild(elem({
        tag: 'div',
        id: 'line2',
        cssClassList: ['red', 'line']
    }));
}, 3000);
//dial m for multiplier
let m = 200;
window.setTimeout(function () {
    hline('topLeftHorizontal');
}, m * 2);

window.setTimeout(function () {
    vline('topLeftVertical');
}, m * 3);

window.setTimeout(function () {
    hline('topRightHorizontal');
}, m * 4);

window.setTimeout(function () {
    vline('topRightVertical');
}, m * 5);

window.setTimeout(function () {
    hline('bottomLeftHorizontal');
}, m * 6);

window.setTimeout(function () {
    vline('bottomLeftVertical');
}, m * 7);

window.setTimeout(function () {
    hline('bottomRightHorizontal');
}, m * 8);

window.setTimeout(function () {
    vline('bottompRightVertical');
}, m * 9);

/*curving top left cross*/

//vertical
window.setTimeout(function () {
    vlineCurver('topLeftVerticalTopLeftArc');
    vlineCurver('topLeftVerticalBottomLeftArc');
}, m * 10);

window.setTimeout(function () {
    vlineCurver('topLeftVerticalTopRightArc');
    vlineCurver('topLeftVerticalBottomRightArc');
}, m * 10);

//horizontal
window.setTimeout(function () {
    hlineCurver('topLeftHorizontalTopLeftArc');
    hlineCurver('topLeftHorizontalTopRightArc');
}, m * 11);

window.setTimeout(function () {
    hlineCurver('topLeftHorizontalBottomLeftArc');
    hlineCurver('topLeftHorizontalBottomRightArc');
}, m * 11);

/*curving top right cross*/

//vertical
window.setTimeout(function () {
    vlineCurver('topRightVerticalTopLeftArc');
    vlineCurver('topRightVerticalBottomLeftArc');
}, m * 12);

window.setTimeout(function () {
    vlineCurver('topRightVerticalTopRightArc');
    vlineCurver('topRightVerticalBottomRightArc');
}, m * 12);

//horizontal
window.setTimeout(function () {
    hlineCurver('topRightHorizontalTopLeftArc');
    hlineCurver('topRightHorizontalTopRightArc');
}, m * 13);

window.setTimeout(function () {
    hlineCurver('topRightHorizontalBottomLeftArc');
    hlineCurver('topRightHorizontalBottomRightArc');
}, m * 13);


/*curving bottom left cross*/

//vertical line
window.setTimeout(function () {
    vlineCurver('bottomLeftVerticalTopLeftArc');
    vlineCurver('bottomLeftVerticalBottomLeftArc');
}, m * 14);

window.setTimeout(function () {
    vlineCurver('bottomLeftVerticalTopRightArc');
    vlineCurver('bottomLeftVerticalBottomRightArc');
}, m * 14);

window.setTimeout(function () {
    hlineCurver('bottomLeftHorizontalTopLeftArc');
    hlineCurver('bottomLeftHorizontalTopRightArc');
}, m * 15);

window.setTimeout(function () {
    hlineCurver('bottomLeftHorizontalBottomLeftArc');
    hlineCurver('bottomLeftHorizontalBottomRightArc');
}, m * 15);

//horizontal line
window.setTimeout(function () {
    vlineCurver('bottomRightVerticalTopLeftArc');
    vlineCurver('bottomRightVerticalbottomRightArc');
}, m * 16);

window.setTimeout(function () {
    vlineCurver('bottomRightVerticalTopRightArc');
    vlineCurver('bottomRightVerticalBottomRightArc');
}, m * 16);

window.setTimeout(function () {
    hlineCurver('bottomRightHorizontalTopLeftArc');
    hlineCurver('bottomRightHorizontalTopRightArc');
}, m * 17);

window.setTimeout(function () {
    hlineCurver('bottomRightHorizontalbottomLeftArc');
    hlineCurver('bottomRightHorizontalBottomRightArc');
}, m * 17);
//functions
function elem(options) {
    let element = document.createElement(options.tag);
    element.id = options.id;
    for (item of options.cssClassList) {
        element.classList.add(item);
    }
    return element;
}

function hline(id) {
    let options = {};
    options.tag = 'div';
    options.id = id;
    options.cssClassList = ['red', 'line', 'hline'];
    document.body.appendChild(elem(options));
}

function vline(id) {
    let options = {};
    options.tag = 'div';
    options.id = id;
    options.cssClassList = ['red', 'line', 'vline'];
    document.body.appendChild(elem(options));
}

function vlineCurver(id) {
    let options = {};
    options.tag = 'div';
    options.id = id;
    options.cssClassList = ['white', 'line', 'vlineCurver'];
    document.body.appendChild(elem(options));
}

function hlineCurver(id) {
    let options = {};
    options.tag = 'div';
    options.id = id;
    options.cssClassList = ['white', 'line', 'hlineCurver'];
    document.body.appendChild(elem(options));
}

function vlineCurverExta(id) {
    let options = {};
    options.tag = 'div';
    options.id = id;
    options.cssClassList = ['white', 'line', 'vlineCurverExtra'];
    document.body.appendChild(elem(options));
}
function hlineCurverExta(id) {
    let options = {};
    options.tag = 'div';
    options.id = id;
    options.cssClassList = ['white', 'line', 'hlineCurverExtra'];
    document.body.appendChild(elem(options));
}