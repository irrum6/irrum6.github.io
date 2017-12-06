/**
 * @param {String} locale
 * @return {void}
 */
function View(locale) {
    this.locale = locale;
    this.currentRowCount = 1;
}

/**
 * @param {String} locale
 * @return {void}
 */
View.prototype.setLocale = function (locale) {
    this.locale = locale;
    this.updateInterfaceWhenLocaleChanges();
}

/**
* draw grid to play
*/
View.prototype.drawGrid = function (game) {

    //row min 2 max 13
    let row = Math.min(parseInt(game.level / 5, 10) + 2, 13);

    let prob = Math.floor(h5.random() * row * row);

    let grid = h5.q('#grid', true);

    if (row > this.currentRowCount) {
        //remove current container to make room for another

        if (grid.children.length > 0) {
            grid.removeChild(grid.children[0]);
        }

        grid.appendChild(h5.div('table', 'table'));
        //update row count
        this.currentRowCount = row;

        for (let i = 0; i < row; i++) {
            let tr = h5.div('div' + i, 'div', '');
            for (let j = 0; j < row; j++) {
                let button = h5.button(i, 'cell', null, null)
                button.addEventListener('click', (event) => {
                    if (event.target.classList.contains('diff')) {
                        game.level++; game.clickCount = 0;
                        //request new level
                        game.nextLevel();
                    } else {
                        this.clickCount++;
                        if (this.clickCount > 10) {
                            //alert('5 seconds time penalty for more than 10 clicks');
                            h5.alert(languages[this.locale].timePenaltyText)
                            game.time = game.time - 5 < 0 ? 0 : game.time - 5;
                        }
                    }
                });
                button.style.backgroundColor = game.color;
                tr.appendChild(button);
            }
            document.getElementById('table').appendChild(tr);
        }

        //normalize button height
        let buttons = document.querySelectorAll('button.cell');
        let width = parseInt(window.getComputedStyle(buttons[0]).width);
        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i].style.height = width + 'px';
        }
    } else {
        //just repaint already available buttons
        let buttons = document.querySelectorAll('button.cell');
        for (button of buttons) {
            button.style.backgroundColor = game.color;
        }
        //remove diff class form previously chosen cell and make all button same to avoid loophole
        let diff = this.getDiff();
        if (diff !== null) {
            diff.classList.remove('diff');
        }
    }

    document.querySelectorAll('button.cell')[prob].classList.add('diff');
    document.querySelectorAll('button.cell')[prob].style.backgroundColor = game.differentColor;



}

/**
 * Hide grid, when paused
 */
View.prototype.hideGrid = function () {
    //document.getElementById('container').style.visibility = 'hidden';
}
/**
 * Show Grid
 */
View.prototype.showGrid = function () {
    //document.getElementById('container').style.visibility = 'visible';
}

View.prototype.disableGrid = function () {
    let buttons = document.querySelectorAll('button.cell');
    for (button of buttons) {
        button.disabled = true;
    }
}
/**
 * update indicators of level and countdown
 */
View.prototype.updateIndicators = function (game) {
    if (this.isLandscape()) {
        let timespans = h5.q('#timewidget > div > span');
        let scorespans = h5.q('#scorewidget > div > span');

        let times = ("" + game.time).split("");
        let scores = ("" + game.level).split("");

        let tlen = times.length;
        let slen = scores.length;

        timespans[0].textContent = tlen > 1 ? times[0] : '0';
        timespans[1].textContent = tlen > 1 ? times[1] : times[0];

        scorespans[0].textContent = slen > 1 ? scores[0] : '0';
        scorespans[1].textContent = slen > 1 ? scores[1] : scores[0];

    } else {
        document.getElementById('countdown').innerHTML = languages[this.locale].time + ': ' + this.time;
        document.getElementById('score').innerHTML = languages[this.locale].level + ': ' + this.level;
    }
};

View.prototype.getDiff = function () {
    return document.querySelector('button.cell.diff');
};

View.prototype.hint = function () {
    let diff = this.getDiff();
    if (diff !== null) {
        diff.classList.add('glow');
    }
};

View.prototype.clearDiff = function () {
    let diff = this.getDiff();
    if (diff !== null) {
        diff.classList.remove('diff');
        diff.classList.add('glow');
    }
};

View.prototype.setupHandlers = function (game) {
    let self = this;
    //resize reload
    window.addEventListener('resize', (event) => {
        window.location.reload(true);
    });
    document.getElementById('start').addEventListener('click', (event) => {
        game.start();
    });
    document.getElementById('hint').addEventListener('click', (event) => {
        self.hint();
    });

    let langs = this.querySettingsEntries("lang");
    let colors = this.querySettingsEntries("color");
    let modes = this.querySettingsEntries("mode");

    for (let i = 0, len = langs.length; i < len; i++) {
        langs[i].addEventListener('click', (event) => {
            if (event.target.classList.contains('langmain')) {
                excludeid = event.target.id;
                self.showMenu("lang", excludeid);
            } else {
                let currentMain = document.getElementsByClassName('langmain')[0];
                currentMain.classList.remove('langmain');
                event.target.classList.add('langmain');
                event.target.parentElement.insertBefore(event.target, currentMain);
                self.setLocale(event.target.getAttribute('data-lang'));
                self.closeMenu("lang", event.target.id);
            }
        });
    }

    for (let i = 0, len = colors.length; i < len; i++) {
        colors[i].addEventListener('click', (event) => {
            console.log(event.target);
            if (event.target.classList.contains('colormain')) {
                excludeid = event.target.id;
                self.showMenu("color", excludeid);
            } else {
                game.setColorMode(event.target.getAttribute('data-color'));
                let currentMain = document.getElementsByClassName('colormain')[0];
                currentMain.classList.remove('colormain');
                event.target.classList.add('colormain');
                event.target.parentElement.insertBefore(event.target, currentMain);
                self.closeMenu("color", event.target.id);

            }
        });
    }

    for (let i = 0, len = modes.length; i < len; i++) {
        modes[i].addEventListener('click', (event) => {
            game.setHardness(event.target.getAttribute('data-difficulty'));
            if (event.target.classList.contains('modemain')) {
                excludeid = event.target.id;
                self.showMenu("mode", excludeid);
            } else {
                let currentMain = document.getElementsByClassName('modemain')[0];
                currentMain.classList.remove('modemain');
                event.target.classList.add('modemain');
                event.target.parentElement.insertBefore(event.target, currentMain);
                self.closeMenu("mode", event.target.id);

            }
        });
    }

};

View.prototype.widgetFontCorrection = function () {
    //normalize span
    let spans = document.querySelectorAll('#timewidget > span, #scorewidget > span');
    let spansZeroWidthInt = parseInt(window.getComputedStyle(spans[0]).width, 10);
    let spansFontSize = Math.floor(spansZeroWidthInt / 5) + 'px';

    spans[0].style.fontSize = spansFontSize;
    spans[1].style.fontSize = spansFontSize;

    let digits = document.querySelectorAll('#timewidget >div  span , #scorewidget >div span');
    let digitsZeroWidthInt = parseInt(window.getComputedStyle(digits[0]).width, 10);
    let digitsFontSize = Math.floor(digitsZeroWidthInt * 0.9) + 'px';

    digits[0].style.fontSize = digitsFontSize;
    digits[1].style.fontSize = digitsFontSize;
    digits[2].style.fontSize = digitsFontSize;
    digits[3].style.fontSize = digitsFontSize;
};

/**
 * @param {String} subclassname
 * @param {String} exclude
 * @return {HTMLElementCollection}
 */
View.prototype.querySettingsEntries = function (subclassname, excludeid) {
    let query = ".settings-entry.class:not(#exclude)";
    if (h5.notEmpty(subclassname)) {
        query = query.replace("class", subclassname);
        if (h5.notEmpty(excludeid)) {
            query = query.replace("exclude", excludeid);
        }
        return h5.q(query);
    }
    return false;
};

/**
 * @param {String} subclassname
 * @param {String} excludeid
 */
View.prototype.showMenu = function (subclassname, excludeid) {
    let entries = this.querySettingsEntries(subclassname, excludeid);
    let isflex = entries[0].style.display === 'flex';
    let len = entries.length;
    if (window.matchMedia("(orientation:landscape)").matches) {
        for (let i = 0; i < len; i++) {
            entries[i].style.display = isflex ? "none" : "flex";
        }
    } else if (window.matchMedia("(orientation:portrait)").matches) {
    }
};

View.prototype.closeMenu = function (subclassname, excludeid) {
    let entries = this.querySettingsEntries(subclassname, excludeid);
    let len = entries.length;
    if (window.matchMedia("(orientation:landscape)").matches) {
        for (let i = 0; i < len; i++) {
            entries[i].style.display = "none";
        }
    } else if (window.matchMedia("(orientation:portrait)").matches) {
    }
};

View.prototype.updateInterfaceWhenLocaleChanges = function () {
    let locale = this.locale;
    let colors = this.querySettingsEntries("color");
    let modes = this.querySettingsEntries("mode");

    let len, i, text;
    len = colors.length;

    for (i = 0; i < len; i++) {
        let color = colors[i].getAttribute('data-color');
        text = languages[locale].color + ":" + languages[locale].colors[color];
        colors[i].textContent = text;
    }

    len = modes.length;
    for (i = 0; i < len; i++) {
        let mode = modes[i].getAttribute('data-difficulty');
        text = languages[locale].mode + ":" + languages[locale].modes[mode];
        modes[i].textContent = text;
    }
    h5.q('#timewidget > span', true).innerHTML = languages[this.locale].seconds;
    h5.q('#scorewidget > span', true).innerHTML = languages[this.locale].level;
    h5.q('#start', true).innerHTML = languages[this.locale].start;
    h5.q('#hint', true).innerHTML = languages[this.locale].hint;
};

View.prototype.correctGrid = function () {
    //normalize button height
    let buttons = document.querySelectorAll('button.cell');
    let width = parseInt(window.getComputedStyle(buttons[0]).width);
    for (let i = 0, len = buttons.length; i < len; i++) {
        buttons[i].style.height = width + 'px';
    }
};

View.prototype.clearBody = function () {
    let len = document.body.children.length;
    for (let i = 0; i < len; i++) {
        document.body.removeChild(document.body.children[0]);
    }
};

View.prototype.isLandscape = function () {
    return window.matchMedia("(orientation:landscape)").matches;
};