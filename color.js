let generate = (level, delta) => {

    //row min 2 max 13
    let row = Math.min(parseInt(level / 5, 10) + 2, 13);

    if (document.getElementById('container').children.length > 0) {
        document.getElementById('container').removeChild(document.getElementById('container').children[0]);
    }
    let table = document.createElement('div');
    table.id = 'table';
    document.getElementById('container').appendChild(table);

    let prob = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % (row * row); })[0];

    let rgb = rgbValues();

    delta = delta < 10 ? 10 : delta;

    let color = '#' + rgb.map((elem) => { return elem.toString(16).length > 1 ? elem.toString(16) : '0' + elem.toString(16); }).join('');

    let differentColor = '#' + diffColor(rgb, delta, level).map((elem) => { return elem.toString(16).length > 1 ? elem.toString(16) : '0' + elem.toString(16); }).join('');

    generateGrid(row, color);

    document.querySelectorAll('button.cell')[prob].classList.add('diff');

    document.querySelectorAll('button.cell')[prob].style.backgroundColor = differentColor;

}

let generateGrid = (row, color) => {
    for (let i = 0; i < row; i++) {
        let tr = document.createElement('div');
        for (let j = 0; j < row; j++) {
            let button = document.createElement('button');
            button.classList.add('cell');
            button.addEventListener('click', (event) => {
                if (event.target.classList.contains('diff')) {
                    level++;
                    window.clickCount = 0;
                    //decrease delta to make life harder
                    if (level % 5 === 0) {
                        delta -= 5;
                    }
                    //update level indicator
                    document.getElementById('score').innerHTML = 'Level: ' + window.level;
                    //request new level
                    generate(level, delta);
                } else {
                    window.clickCount++;
                    if (window.clickCount > row * row) {
                        alert('5 seconds time penalty for more than 10 clicks');
                        window.time -= 5;
                    }
                }
            });
            button.style.backgroundColor = color;
            let dimmension = window.innerHeight > window.innerWidth ? 'vw' : 'vh';

            button.style.width = 80 / (row + 1) + dimmension;
            button.style.height = button.style.width;
            tr.appendChild(button);
        }
        document.getElementById('table').appendChild(tr);
    }
}


let rgbValues = () => {
    return Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(3)), (elem) => {
        return parseInt(elem % 255, 10);
    });
}

let diffColor = (rgbValues, delta, level) => {

    let rgbcopy = rgbValues;
    if (level < 16) {
        //randomly select out of three
        let prob = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % 3; })[0];

        //randomly select sign
        let sign = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % 2; })[0];

        sign = (sign == 0) ? 1 : -1;

        let temp = rgbcopy[prob];

        rgbcopy[prob] = (temp + delta > 255) ? temp - delta : (temp - delta < 0 ? temp + delta : temp + delta * sign);

        delete temp;
        delete sign;
    } else {
        //randomly select sign
        let sign = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % 2; })[0];

        sign = (sign == 0) ? 1 : -1;

        rgbcopy = rgbcopy.map((elem) => {
            //let temp = elem + delta * sign;
            return elem + delta > 255 ? elem - delta : (elem - delta < 0 ? elem + delta : elem + delta * sign);
        });

        delete sign;
    }
    return rgbcopy;
}

let timer = () => {
    window.time--;
    document.getElementById('countdown').innerHTML = 'Time:' + window.time;

    if (time === 0) {
        window.clearInterval(window.timer);
        let butts = document.querySelectorAll('button.cell');
        for (butt of butts) {
            butt.disabled = true;
        }
        window.started = false;
    }
}

let start = () => {
    window.level = 1;
    window.time = 90;
    window.delta = 70;
    window.clickCount = 0;
    generate(window.level, window.delta);
    window.started = true;
    window.timer = window.setInterval(timer, 1000);
}

start();

document.getElementById('start').addEventListener('click', (event) => {
    if (!window.started) {
        start();
    } else {
        alert('Game is already on go...');
    }
});

document.getElementById('hint').addEventListener('click', (event) => {
    let buttons = document.querySelectorAll('button.cell');
    let diff = Array.prototype.filter.call(buttons, (elem) => {
        return elem.classList.contains('diff');
    })[0];

    let nodiff = Array.prototype.filter.call(buttons, (elem) => {
        return !elem.classList.contains('diff');
    })[0];

    delete buttons;

    window.oldColor = diff.style.backgroundColor;
    window.color = nodiff.style.backgroundColor;
    window.odd = true;
    let flicker = setInterval(() => {
        if (odd) {
            diff.style.backgroundColor = window.color;
            odd = false;
        } else {
            diff.style.backgroundColor = window.oldColor;
            odd = true;
        }
        diff.classList.add('glow');
    }, 100);

    setTimeout(() => {
        clearInterval(flicker);
        diff.style.backgroundColor = window.oldColor;
        odd = true;
    }, 3000);
    console.log(delta);
});

