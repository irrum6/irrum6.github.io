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

window.setTimeout(function () {
    hline('topLeftHorizontal');
}, 6000);

window.setTimeout(function () {
    vline('topLeftVertical');
}, 9000);

window.setTimeout(function () {
    hline('topRightHorizontal');
}, 12000);

window.setTimeout(function () {
    vline('topRightVertical');
}, 15000);

window.setTimeout(function () {
    hline('bottomLeftHorizontal');
}, 18000);

window.setTimeout(function () {
    vline('bottomLeftVertical');
}, 21000);

window.setTimeout(function () {
    hline('bottomRightHorizontal');
}, 24000);

window.setTimeout(function () {
    vline('bottompRightVertical');
}, 27000);

/*curving top left cross*/

//vertical
window.setTimeout(function () {
    vlineCurver('topLeftVerticalTopLeftArc');
    vlineCurver('topLeftVerticalBottomLeftArc');
}, 30000);

window.setTimeout(function () {
    vlineCurver('topLeftVerticalTopRightArc');
    vlineCurver('topLeftVerticalBottomRightArc');
}, 33000);

//horizontal
window.setTimeout(function () {
    hlineCurver('topLeftHorizontalTopLeftArc');
    hlineCurver('topLeftHorizontalTopRightArc');
}, 36000);

window.setTimeout(function () {
    hlineCurver('topLeftHorizontalBottomLeftArc');
    hlineCurver('topLeftHorizontalBottomRightArc');
}, 39000);

/*curving top right cross*/

//vertical
window.setTimeout(function () {
    vlineCurver('topRightVerticalTopLeftArc');
    vlineCurver('topRightVerticalBottomLeftArc');
}, 42000);

window.setTimeout(function () {
    vlineCurver('topRightVerticalTopRightArc');
    vlineCurver('topRightVerticalBottomRightArc');
}, 45000);

//horizontal
window.setTimeout(function () {
    hlineCurver('topRightHorizontalTopLeftArc');
    hlineCurver('topRightHorizontalTopRightArc');
}, 48000);

window.setTimeout(function () {
    hlineCurver('topRightHorizontalBottomLeftArc');
    hlineCurver('topRightHorizontalBottomRightArc');
}, 51000);


/*curving bottom left cross*/

//vertical line
window.setTimeout(function () {
    vlineCurver('bottomLeftVerticalTopLeftArc');
    vlineCurver('bottomLeftVerticalBottomLeftArc');
}, 54000);

window.setTimeout(function () {
    vlineCurver('bottomLeftVerticalTopRightArc');
    vlineCurver('bottomLeftVerticalBottomRightArc');
}, 57000);

window.setTimeout(function () {
    hlineCurver('bottomLeftHorizontalTopLeftArc');
    hlineCurver('bottomLeftHorizontalTopRightArc');
}, 60000);

window.setTimeout(function () {
    hlineCurver('bottomLeftHorizontalBottomLeftArc');
    hlineCurver('bottomLeftHorizontalBottomRightArc');
}, 63000);

//horizontal line
window.setTimeout(function () {
    vlineCurver('bottomRightVerticalTopLeftArc');
    vlineCurver('bottomRightVerticalbottomRightArc');
}, 66000);

window.setTimeout(function () {
    vlineCurver('bottomRightVerticalTopRightArc');
    vlineCurver('bottomRightVerticalBottomRightArc');
}, 69000);

window.setTimeout(function () {
    hlineCurver('bottomRightHorizontalTopLeftArc');
    hlineCurver('bottomRightHorizontalTopRightArc');
}, 72000);

window.setTimeout(function () {
    hlineCurver('bottomRightHorizontalbottomLeftArc');
    hlineCurver('bottomRightHorizontalBottomRightArc');
}, 75000);

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