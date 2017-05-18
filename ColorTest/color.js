/*create HTML element by tag and options
@return HTMLElement
*/
let elem = (tag, options) => {
    let element = document.createElement(tag);
    for (option in options) {
        element[option] = options[option];
    }
    return element;
};

/*generate random values for colors
@return [int] array(3)
*/
let rgbValues = (delta) => {
    return Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(3)), (elem) => {
        //range is delta - (255-delta)
        //to generate color range between 0(0+delta-delta)(min) and 255(255-delta+delta)(MAX)
        return parseInt((elem % (255 - (delta * 2))) + delta, 10);
    });
}

/* make a different color from given rgb values using delta
@return [int] array(3)
*/
let diffColor = (rgbValues, delta, level) => {

    let rgbcopy;

    //randomly select sign
    let sign = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % 2; })[0];

    sign = (sign == 0) ? 1 : -1;

    if (level < 9) {
        //randomly select out of three
        let prob = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % 3; })[0];

        rgbcopy = rgbValues.map((elem, index) => {
            return (index === prob) ? elem + (delta * sign) : elem;
        });
        delete prob;
    } else {
        rgbcopy = rgbValues.map((elem) => {
            return elem + delta > 255 ? elem - delta : (elem - delta < 0 ? elem + delta : elem + delta * sign);
        });
    }
    delete sign;
    return rgbcopy;
}

//where our game begins
function _colorGame() { }

//init game setings
_colorGame.prototype.init = function (options) {
    for (option in options) {
        this[option] = options[option];
    }
    this.options = options;
}

//initialize ui elements for game
_colorGame.prototype.initHTML = function () {
    document.body.appendChild(elem('div', { id: 'container' }));

    let container2 = elem('div', { id: 'container2' });

    let elements = [{ tag: 'span', options: { id: 'countdown' } },
    { tag: 'span', options: { id: 'score' } },
    { tag: 'span', options: { id: 'delta' } },
    { tag: 'button', options: { id: 'start', innerHTML: '►' } },
    { tag: 'button', options: { id: 'hint', innerHTML: 'Hint' } }];

    for (element of elements) {
        container2.appendChild(elem(element.tag, element.options));
    }
    delete elements;
    document.body.appendChild(container2);
    delete container2;

    document.getElementById('start').addEventListener('click', (event) => {
        this.start();
    });

    document.getElementById('hint').addEventListener('click', (event) => {
        this.hint();
    });
}

/*generate a new level
@return void
*/
_colorGame.prototype.generate = function () {

    //decrease delta to make life harder
    let number = 0;

    if (this.level < this.firstMedianLevel) {
        number = 3;
    }
    else if (this.level > this.firstMedianLevel && this.level < this.secondMedianLevel) {
        number = (this.level % 2 === 0) ? 2 : 0;
    } else {
        number = (this.level % 3 === 0) ? 2 : 0;
    }
    this.reduceDelta(number);
    delete number;

    this.updateIndicators();
    //row min 2 max 13
    let row = Math.min(parseInt(this.level / 5, 10) + 2, 13);

    let prob = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % (row * row); })[0];

    let rgb = rgbValues(this.delta);

    let color = '#' + rgb.map((elem) => {
        return elem.toString(16).length > 1 ? elem.toString(16) : '0' + elem.toString(16);
    }).join('');

    let differentColor = '#' + diffColor(rgb, this.delta, this.level).map((elem) => {
        return elem.toString(16).length > 1 ? elem.toString(16) : '0' + elem.toString(16);
    }).join('');

    this.drawGrid(row, color);

    document.querySelectorAll('button.cell')[prob].classList.add('diff');

    document.querySelectorAll('button.cell')[prob].style.backgroundColor = differentColor;
}

/*draw grid for a new level
@return void
*/
_colorGame.prototype.drawGrid = function (row, color) {
    //if row size has changed since last render
    if (row > this.currentRowCount) {
        //remove current container to make room for another
        let container = document.getElementById('container');
        if (container.children.length > 0) { container.removeChild(container.children[0]); }

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
                            alert('5 seconds time penalty for more than 10 clicks');
                            this.time = this.time - 5 < 0 ? 0 : this.time - 5;
                            this.updateIndicators();
                        }
                    }
                });
                button.style.backgroundColor = color;
                let dimmension = window.innerHeight > window.innerWidth ? 'vw' : 'vh';

                button.style.width = 90 / (row + 1) + dimmension;
                button.style.height = button.style.width;
                tr.appendChild(button);
            }
            document.getElementById('table').appendChild(tr);
        }
    } else {
        //just repaint already available buttons
        let buttons = document.querySelectorAll('button.cell');
        for (button of buttons) {
            button.style.backgroundColor = color;
        }
        delete buttons;
        //remove diff class form previously chosen cell and make all button same to avoid loophole
        document.querySelector('button.cell.diff').classList.remove('diff');
    }
}

_colorGame.prototype.reduceDelta = function (number) {
    this.delta = this.delta - number < this.minimalDelta ? this.minimalDelta : this.delta - number;
}

//reset using values saved previously in options
_colorGame.prototype.reset = function () {
    for (option in this.options) {
        this[option] = this.options[option];
    }
}

//start game
_colorGame.prototype.start = function () {
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
        //double action confirm
        if (confirm('Game is already ongoing. Do you wanna restart?')) {
            window.clearInterval(this.timer);
            this.reset();
            this.generate();
            this.timer = setInterval(tick, 1000);
            this.updateIndicators();
        }
    }
}

//hint
_colorGame.prototype.hint = function () {
    let diff = document.querySelector('button.cell.diff');
    diff.classList.add('glow');
    setTimeout(() => {
        diff.classList.remove('glow');
        delete diff;
    }, 1600);
}
_colorGame.prototype.updateIndicators = function () {
    document.getElementById('countdown').innerHTML = 'Time: ' + this.time;
    document.getElementById('score').innerHTML = 'Level: ' + this.level;
    document.getElementById('delta').innerHTML = 'Achieved Delta: ' + this.delta;
}

let gameOptions = {
    level: 1,
    time: 60,
    delta: 80,
    clickCount: 0,
    currentRowCount: 0,
    minimalDelta: 4,
    firstMedianLevel: 19,
    secondMedianLevel: 30
}

let colorGame = new _colorGame();

colorGame.init(gameOptions);
colorGame.initHTML();

//no longer custom texts :(
window.onbeforeunload = (event) => {
    return '';
};