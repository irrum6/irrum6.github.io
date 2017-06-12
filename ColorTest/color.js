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
    { tag: 'button', options: { id: 'hint', innerHTML: languages[this.locale].hint } },
    { tag: 'button', options: { id: 'start', innerHTML: '⟳' } },];

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
    if (this.level > 1) {
        //otherwise it could be called on game start even before completing 1st level
        this.calculateDelta();
    }

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

/*
calculate delta based on level
@return [int]
 */
_colorGame.prototype.calculateDelta = function () {
    let level = this.level;
    let delta = this.delta;
    retro = this.retro;
    if (retro) {
        //retro (retrospectively) means calculate game after choosing level in game menu
    } else {

        if (level < 5) {
            delta -= 8; // 64 56 48 40
        } else if (level < 8) {
            delta -= 4;// 36 32 28
        } else if (level < 11) {
            delta -= 3;// 25 22 19
        } else if (level < 14) {
            delta -= 2; //17 15 13
        } else if (level < 20) {
            delta -= 1;//12 11 10 9 8 7 
        } else if (level < 22) {
            delta -= (level % 2 === 0) ? 1 : 0; // 6 6
        } else if (level < 24) {
            delta -= (level % 2 === 0) ? 1 : 0; // 5 5
        } else if (level < 27) {
            delta -= (level % 3 === 0) ? 1 : 0; // 4 4 4  
        } else if (level < 30) {
            delta -= (level % 3 === 0) ? 1 : 0; // 3 3 3
        } else {
            delta = 2;
        }
        // delta -= (level < 5 ? 8 : (level < 8 ? 4 : (level<11?3:(level<14?2:(level<20?1:(level<22?(level&2==0?1:0):(level<)))))));
    }
    //correct after calculations
    this.delta = delta < this.minimalDelta ? this.minimalDelta : delta;
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
//hide
_colorGame.prototype.hide = function () {
    document.getElementById('container').style.visibility = 'hidden';
    this.visible = false;
}
//show
_colorGame.prototype.show = function () {
    document.getElementById('container').style.visibility = 'visible';
    this.visible = true;
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
    document.getElementById('countdown').innerHTML = languages[this.locale].time + ': ' + this.time;
    document.getElementById('score').innerHTML = languages[this.locale].level + ': ' + this.level;
    document.getElementById('delta').innerHTML = languages[this.locale].delta + ': ' + this.delta;
}