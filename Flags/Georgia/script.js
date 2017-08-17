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