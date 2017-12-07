let h5 = {};

/**
 * @param {array} list
 * @return {void}
 */
h5.verticalMenu = (list) => {
    let div = document.createElement('div');
    div.className = 'vmenu';
    let items = list.map(function (elem, index) {
        let anchor = document.createElement('a');
        anchor.id = elem.id;
        anchor.className = 'vmenu-item';
        anchor.text = elem.text;
        anchor.addEventListener('click', function (event) {
            if (typeof elem.params !== 'undefined' || elem !== 'null') {
                elem.func(elem.params);
            } else {
                elem.func();
            }
        });
        return anchor;
    });
    for (item of items) {
        div.appendChild(item);
    }
    document.body.appendChild(div);
    h5.verticalMenuNormalize();
};

/**
 * @param {void}
 * @return {void}
 */
h5.verticalMenuNormalize = () => {
    let menus = document.getElementsByClassName('vmenu-item');

    let zeroElementStyle = window.getComputedStyle(menus[0]);

    let maxWidth = parseInt(zeroElementStyle.width);
    let maxHeight = parseInt(zeroElementStyle.height);

    for (let i = 0, len = menus.length; i < len; i++) {
        let iwidth = parseInt(window.getComputedStyle(menus[i]).width);
        let iheight = parseInt(window.getComputedStyle(menus[i]).height);
        if (iwidth > maxWidth) {
            maxWidth = iwidth;
        }
        if (iheight > maxHeight) {
            maxHeight = iheight;
        }
    }
    for (let i = 0, len = menus.length; i < len; i++) {
        menus[i].style.width = maxWidth + 'px';
        menus[i].style.height = maxHeight + 'px';
    }
}

/**
 * @param {void}
 * @return {void}
 */
h5.clearBody = function () {
    for (let i = 0, len = document.body.children.length; i < len; i++) {
        document.body.removeChild(document.body.children[0]);
    }
};

/**
 * @param {array} list
 * @return {void}
 */
h5.verticalMenuWithSubs = function (list) {
    let div = document.createElement('div');
    div.className = 'vmenu';
    let items = list.map(function (elem, index) {
        let anchor = document.createElement('a');
        anchor.id = elem.id;
        anchor.className = 'vmenu-item';
        if (elem.type === 'sub') {
            anchor.classList.add('vmenu-item-sub');
            anchor.setAttribute('main', elem.main);
        }
        if (elem.type === 'main') {
            //toggleMenu
            anchor.addEventListener('click', function (event) {
                let subs = document.querySelectorAll('[main=' + event.target.id + ']');
                let display = subs[0].style.display;
                for (let i = 0, len = subs.length; i < len; i++) {
                    subs[i].style.display = (display === 'none') ? 'block' : 'none';
                }
            });
        }
        anchor.text = elem.text;
        if (typeof elem.func !== 'undefined') {
            anchor.addEventListener('click', function (event) {
                if (typeof elem.params !== 'undefined' || elem !== 'null') {
                    elem.func(elem.params);
                } else {
                    elem.func();
                }
            });
        }
        return anchor;
    });
    for (item of items) {
        div.appendChild(item);
    }
    document.body.appendChild(div);
    h5.verticalMenuNormalize();
}

/**
 * @param {text} message
 * @return {void}
 */
h5.alert = function (message) {
    var box = document.createElement('div');
    box.id = 'alertBox';
    var messageBox = document.createElement('div');
    messageBox.id = 'alertMessageBox';
    messageBox.innerHTML = message;
    box.appendChild(messageBox);
    var butt = document.createElement('button');
    butt.id = 'alertBoxOK';
    butt.innerText = 'OK';
    butt.style = "width:33%;margin-left:33%;margin-right:33%;";
    butt.addEventListener('click', function () {
        //get lost alert :D
        document.body.removeChild(document.getElementById('alertBox'));
    });
    box.appendChild(butt);

    document.body.appendChild(box);
}