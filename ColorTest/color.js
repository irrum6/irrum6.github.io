let generate = (level, delta) => {

    //row min 2 max 13
    let row = Math.min(parseInt(level / 5, 10) + 2, 13);

    let prob = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % (row * row); })[0];

    window.delta = window.delta < 8 ? 8 : window.delta;

    let rgb = rgbValues();

    let color = '#' + rgb.map((elem) => { return elem.toString(16).length > 1 ? elem.toString(16) : '0' + elem.toString(16); }).join('');

    let differentColor = '#' + diffColor(rgb, delta, level).map((elem) => { return elem.toString(16).length > 1 ? elem.toString(16) : '0' + elem.toString(16); }).join('');

    generateGrid(row, color);

    console.log(color, differentColor);

    document.querySelectorAll('button.cell')[prob].classList.add('diff');

    document.querySelectorAll('button.cell')[prob].style.backgroundColor = differentColor;

}

let generateGrid = (row, color) => {
    //if row size has changed since last render
    if (row > window.currentRowCount) {

        //remove current container to make room for another
        let container = document.getElementById('container');
        if (container.children.length > 0) { container.removeChild(container.children[0]); }
        //delete container;

        let table = document.createElement('div');
        table.id = 'table';
        container.appendChild(table);

        delete container;
        //update row count
        window.currentRowCount = row;

        for (let i = 0; i < row; i++) {
            let tr = document.createElement('div');
            for (let j = 0; j < row; j++) {
                let button = document.createElement('button');
                button.classList.add('cell');
                button.addEventListener('click', (event) => {
                    if (event.target.classList.contains('diff')) {
                        window.level++; window.clickCount = 0;
                        //decrease delta to make life harder
                        window.delta -= (window.level < 20) ? 3 : 2;
                        window.delta = window.delta < 8 ? 8 : window.delta;
                        //update level indicator
                        document.getElementById('score').innerHTML = 'Level: ' + window.level;
                        document.getElementById('delta').innerHTML = 'Achieved Delta: ' + window.delta;
                        //request new level
                        generate(level, delta);
                    } else {
                        window.clickCount++;
                        if (window.clickCount > 10) {
                            alert('5 seconds time penalty for more than 10 clicks');
                            window.time -= 5;
                            document.getElementById('countdown').innerHTML = 'Time: ' + window.time;
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
        //remove diff class form previuosly chosen cell and make all button same to avoid loophole
        document.querySelector('button.cell.diff').classList.remove('diff');
    }
}


let rgbValues = () => {
    return Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(3)), (elem) => {
        //range is delta - (255-delta)
        //to generate color range between 0(0+delta-delta)(min) and 255(255-delta+delta)(MAX)
        return parseInt((elem % (255 - (window.delta * 2))) + window.delta, 10);
    });
}

let diffColor = (rgbValues, delta, level) => {

    let rgbcopy;

    //randomly select sign
    let sign = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % 2; })[0];

    sign = (sign == 0) ? 1 : -1;

    if (level < 9) {
        //randomly select out of three
        let prob = Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(1)), (elem) => { return elem % 3; })[0];

        rgbcopy = rgbValues.map((elem, index) => {
            if (index === prob) {
                console.log(elem + (delta * sign));
                return elem + (delta * sign);//(elem + delta > 255) ? elem - delta : (elem - delta < 0 ? elem + delta : elem + delta * sign);
            } else {
                //let divider = 4;
                //elem = elem + (Math.floor(delta / divider) * sign * (-1));
                return elem; //> 255 ? 255 : (elem < 0 ? 0 : elem);
            }
        });
        delete prob;
    } else {
        rgbcopy = rgbValues.map((elem) => {
            //let temp = elem + delta * sign;
            return elem + delta > 255 ? elem - delta : (elem - delta < 0 ? elem + delta : elem + delta * sign);
        });
    }
    delete sign;
    return rgbcopy;
}

let timer = () => {
    window.time--;
    document.getElementById('countdown').innerHTML = 'Time:' + window.time;

    //fixed negative time bug after penalty
    if (time < 1) {
        window.clearInterval(window.timer);
        let butts = document.querySelectorAll('button.cell');
        for (butt of butts) {
            butt.disabled = true;
        }
        window.started = false;
        delete butts;
    }
}

let start = () => {
    window.level = 1, window.time = 60, window.delta = 80, window.clickCount = 0, window.currentRowCount = 0;
    generate(window.level, window.delta);
    window.started = true;
    window.timer = window.setInterval(timer, 1000);
    document.getElementById('score').innerHTML = 'Level:1';
}

start();

document.getElementById('start').addEventListener('click', (event) => {
    (!window.started) ? start() : alert('Game is already on go...');
});

document.getElementById('hint').addEventListener('click', (event) => {
    let diff = document.querySelector('button.cell.diff');
    diff.classList.add('glow');
    setTimeout(() => {
        //end flicker
        diff.classList.remove('glow');
        delete diff;
    }, 1600);
});

