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

window.setTimeout(function () {
    document.body.appendChild(elem({
        tag: 'div',
        id: 'topLeftVerticalTopLeftArc',
        cssClassList: ['white', 'line']
    }));
    document.body.appendChild(elem({
        tag: 'div',
        id: 'topLeftVerticalBottomLeftArc',
        cssClassList: ['white', 'line']
    }));
}, 30000);

window.setTimeout(function () {
    document.body.appendChild(elem({
        tag: 'div',
        id: 'topLeftVerticalTopRightArc',
        cssClassList: ['white', 'line']
    }));
    document.body.appendChild(elem({
        tag: 'div',
        id: 'topLeftVerticalBottomRightArc',
        cssClassList: ['white', 'line']
    }));
}, 33000);

window.setTimeout(function () {
    document.body.appendChild(elem({
        tag: 'div',
        id: 'topLeftHorizontalTopLeftArc',
        cssClassList: ['white', 'line']
    }));
    document.body.appendChild(elem({
        tag: 'div',
        id: 'topLeftHorizontalTopRightArc',
        cssClassList: ['white', 'line']
    }));
}, 36000);

window.setTimeout(function () {
    document.body.appendChild(elem({
        tag: 'div',
        id: 'topLeftHorizontalBottomLeftArc',
        cssClassList: ['white', 'line']
    }));
    document.body.appendChild(elem({
        tag: 'div',
        id: 'topLeftHorizontalBottomRightArc',
        cssClassList: ['white', 'line']
    }));
}, 39000);

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