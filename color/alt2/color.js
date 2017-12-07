/**
 * Our Class
 */

/**
 * Class constructor function
 * @param {object} options 
 * @return {void}
 */
function ColorGame(options) {
    this.hardness = options.hardness;
    this.colorMode = options.colorMode;
    this.level = options.level;
    this.time = options.time;
    this.locale = options.locale;
    this.deltaMinimal = options.minimalDelta;
    this.visible = options.visible;
    this.clickCount = options.clickCount;
    this.maxClicks = options.maxClicks;
    this.currentCellCount = options.currentCellCount;
    this.currentRowCount = options.currentRowCount;

    this.delta = 0;
    //save options to use for reset later 
    this.options = options;
}

/**
 * init game
 * note that we already have a constructor function, but this method will allow us to use same game object
 * without creating another one, hence performance hook
 * @param {object} options
 * @return {void} 
 */
ColorGame.prototype.init = function (options) {
    for (option in options) {
        this[option] = options[option];
    }
    this.options = options;
}

/**
 * Reset game using options saved
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.reset = function () {
    for (option in this.options) {
        this[option] = this.options[option];
    }
}

/**
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.calculateDelta = function () {
    let delta = 0;
    let deltas = [];

    if (this.level > 0) {
        let hardness = this.hardness;
        switch (hardness) {
            case "easy":
                deltas = [128, 120, 112, 104, 96, 88, 82, 76, 70, 64, 58, 52, 48, 44,
                    40, 36, 32, 28, 26, 24, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10,
                    10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3];
                break;
            case "normal":
                deltas = [96, 86, 76, 68, 60, 52, 46, 40, 34, 30, 26, 22, 20, 18, 16,
                    15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3];
                break;
            case "hard":
                deltas = [48, 40, 32, 26, 20, 17, 14, 11, 9, 8, 7, 6, 5, 4, 3];
                break;
            case "hardest":
                deltas = [16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3];
                break;
        }
    } else {
        //do nothing
    }
    if (this.level > deltas.length) {
        delta = 2;
    } else {
        delta = deltas[this.level - 1];
    }

    this.delta = Math.max(delta, this.deltaMinimal);
}

/**
 * select color range based on hardness
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.selectColorRange = function () {
    let colorRange;
    switch (this.hardness) {
        case "easy":
            colorRange = {
                min: 127,
                max: 224
            };
            break;
        case "normal":
            colorRange = {
                min: 96,
                max: 224
            };
            break;
        case "hard":
            colorRange = {
                min: 48,
                max: 255
            };
            break;
        case "hardest":
            colorRange = {
                min: 0,
                max: 255
            };
            break;
    }
    colorRange.interval = colorRange.max - colorRange.min + 1;
    this.colorRange = colorRange;
}
/**
 * Generate color
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.generateColor = function () {

    //if color range isn't selected after hardness selection, then select
    //no need to select again once it's selected
    if (typeof this.colorRange === 'undefined') {
        this.selectColorRange();
    }
    this.calculateDelta();

    /**
     * Arrays were more useful and simple in this case than objects
     * these Arrays have three elements with following rgb mapping
     * 0 red
     * 1 green
     * 2 blue
     */

    let delta = this.delta;

    let rands = rand.random3();

    let colorValues = rands.map((elem) => {
        return Math.round(elem * this.colorRange.interval + this.colorRange.min);
    });

    let differentColorValues = colorValues.map((elem) => {
        return elem + delta < 255 ? elem + delta : elem - delta;
    });

    //correct with color mode  after all color calculations
    //It could be done before but that would only complicate
    switch (this.colorMode) {
        case "red":
            colorValues[1] = 0;
            colorValues[2] = 0;
            differentColorValues[1] = 0;
            differentColorValues[2] = 0;
            break;
        case "green":
            colorValues[0] = 0;
            colorValues[2] = 0;
            differentColorValues[0] = 0;
            differentColorValues[2] = 0;
            break;
        case "blue":
            colorValues[0] = 0;
            colorValues[1] = 0;
            differentColorValues[0] = 0;
            differentColorValues[1] = 0;
            break;
        default:
            break;
    }

    //the main color
    let color = colorValues.map((elem) => {
        let item = elem.toString(16);
        return item.length > 1 ? item : '0' + item;
    }).join('');

    this.color = '#' + color;

    let differentColor = differentColorValues.map((elem) => {
        let item = elem.toString(16);
        return item.length > 1 ? item : '0' + item;
    }).join('');

    this.differentColor = '#' + differentColor;

}

/**
 * generate new level for a game
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.generate = function () {

    this.updateIndicators();

    this.generateColor();

    this.draw();

    //after this draw
}

/**
 * draw grid to play
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.draw = function () {
    //row min 2 max 13
    let row = Math.min(parseInt(this.level / 5, 10) + 2, 13);

    if (typeof this.currentRowCount === 'undefiend') {
        this.currentRowCount = row;
    }
    let prob = Math.floor(rand.random() * row * row);

    if (row > this.currentRowCount) {
        //remove current container to make room for another
        let container = document.getElementById('container');
        if (container.children.length > 0) {
            container.removeChild(container.children[0]);
        }

        container.appendChild(elem('div', { id: 'table' }));
        delete container;

        //update row count
        this.currentRowCount = row;

        for (let i = 0; i < row; i++) {
            let tr = elem('div');
            for (let j = 0; j < row; j++) {
                let button = elem('button');
                button.classList.add('cell');
                button.addEventListener('click', (event) => {
                    if (event.target.classList.contains('diff')) {
                        this.level++; this.clickCount = 0;
                        //request new level
                        this.generate();
                    } else {
                        this.clickCount++;
                        if (this.clickCount > 10) {
                            //alert('5 seconds time penalty for more than 10 clicks');
                            h5.alert(languages[this.locale].timePenaltyText)
                            this.time = this.time - 5 < 0 ? 0 : this.time - 5;
                            this.updateIndicators();
                        }
                    }
                });
                button.style.backgroundColor = this.color;
                tr.appendChild(button);
            }
            document.getElementById('table').appendChild(tr);
        }
    } else {
        //just repaint already available buttons
        let buttons = document.querySelectorAll('button.cell');
        for (button of buttons) {
            button.style.backgroundColor = this.color;
        }
        delete buttons;
        //remove diff class form previously chosen cell and make all button same to avoid loophole
        document.querySelector('button.cell.diff').classList.remove('diff');
    }

    document.querySelectorAll('button.cell')[prob].classList.add('diff');
    document.querySelectorAll('button.cell')[prob].style.backgroundColor = this.differentColor;

    //normalize button height
    let buttons = document.querySelectorAll('button.cell');
    let width = parseInt(window.getComputedStyle(buttons[0]).width);
    for (let i = 0, len = buttons.length; i < len; i++) {
        buttons[i].style.height = width + 'px';
    }

}

/**
 * Hide grid, when paused
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.hide = function () {
    document.getElementById('container').style.visibility = 'hidden';
    this.visible = false;
}
/**
 * Show Grid
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.show = function () {
    document.getElementById('container').style.visibility = 'visible';
    this.visible = true;
}
/**
 * Hint
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.hint = function () {
    if (this.hintCount > 0) {
        document.querySelector('button.cell.diff').classList.add('glow');
        this.hintCount--;
    }
}

/**
 * update indicators of level and countdown
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.updateIndicators = function () {
    document.getElementById('countdown').innerHTML = languages[this.locale].time + ': ' + this.time;
    document.getElementById('score').innerHTML = languages[this.locale].level + ': ' + this.level;
}

//start game
ColorGame.prototype.start = function () {
    //nest time reducing (tick) function (otherwise f@#$ing didn't work for some f@#$ing reason)
    let tick = () => {
        this.time--;
        this.updateIndicators();
        //fixed negative time bug after penalty
        if (this.time <= 0) {
            window.clearInterval(this.timer);
            //as game is over disable all buttons 
            let butts = document.querySelectorAll('button.cell');
            for (butt of butts) {
                butt.disabled = true;
            }
            this.started = false;
            delete butts;
        }
    }

    //if game is over or haven't started yet
    if (!this.started) {
        this.started = true;
        //fix no time bug when restarting game after finish
        if (this.timer !== undefined) {
            window.clearInterval(this.timer);
            this.reset();
        }
        this.generate();
        //renew timer
        this.timer = setInterval(tick, 1000);
        this.updateIndicators();
    } else {
        this.hide();
        //action confirm
        setTimeout(() => {
            if (confirm(languages[this.locale].replayText)) {
                window.clearInterval(this.timer);
                this.reset();
                this.generate();
                this.show();
                this.timer = setInterval(tick, 1000);
                this.updateIndicators();
            } else {
                this.show();
            }
        }, 200)
    }
}

//initialize ui elements for game
ColorGame.prototype.initHTML = function () {
    document.body.appendChild(elem('div', { id: 'container' }));

    let container2 = elem('div', { id: 'container2' });

    let elements = [{ tag: 'span', options: { id: 'countdown' } },
    { tag: 'span', options: { id: 'score' } },
    { tag: 'button', options: { id: 'hint', innerHTML: languages[this.locale].hint } },
    { tag: 'button', options: { id: 'start', innerHTML: '⟳' } }].map(function (element, index) {
        return elem(element.tag, element.options);
    });

    for (element of elements) {
        container2.appendChild(element);
    }

    document.body.appendChild(container2);

    document.getElementById('start').addEventListener('click', (event) => {
        this.start();
    });

    document.getElementById('hint').addEventListener('click', (event) => {
        this.hint();
    });
}