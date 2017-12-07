/**
 * @param {object} view 
 * @return {void}
 */
function ColorGame(view) {
    this.view = view;
}

/**
 * init game
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
 * @param {String} hardness
 * @return {void}
 */
ColorGame.prototype.setHardness = function (hardness) {
    let supportedModes = ["easy", "normal", "hard", "hardest"];

    if (h5.defined(hardness) && typeof hardness === "string" && supportedModes.includes(hardness)) {
        this.hardness = hardness;
    }

};

/**
 * @param {String} color
 * @return {void}
 */
ColorGame.prototype.setColorMode = function (color) {
    let supportedColors = ["all", "red", "green", "blue"];

    if (h5.defined(color) && typeof color === "string" && supportedColors.includes(color)) {
        this.colorMode = color;
    }
};

/**
 * calculateDelta
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

    this.delta = Math.max(delta, this.minimalDelta);
}

/**
 * select color range based on hardness
 * @param {void}
 * @return {void}
 */
ColorGame.prototype.selectColorRange = function () {
    let min, max, interval;
    switch (this.hardness) {
        case "easy":
            min = 127, max = 224;
            break;
        case "normal":
            min = 96, max = 224
            break;
        case "hard":
            min = 48, max = 240;
            break;
        case "hardest":
            min = 32, max = 240;
            break;
    }
    interval = max - min + 1;
    this.colorRange = { min: min, max: max, interval: interval };
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
     * 0 red 1 green 2 blue
     */

    let delta = this.delta;

    let rands = h5.random(3);

    let colorValues = rands.map((elem) => {
        return Math.round(elem * this.colorRange.interval + this.colorRange.min);
    });

    let differentColorValues = colorValues.map((elem) => {
        return elem + delta < 255 ? elem + delta : elem - delta;
    });

    //correct with color mode  after all color calculations
    //It could be done before but that would only complicate

    let [red, green, blue] = colorValues;
    let [dred, dgreen, dblue] = differentColorValues;
    switch (this.colorMode) {
        case "red":
            green = 0, blue = 0;
            dgreen = 0, dblue = 0;
            break;
        case "green":
            red = 0, blue = 0;
            dred = 0, dblue = 0;
            break;
        case "blue":
            red = 0, green = 0;
            dred = 0, dgreen = 0;
            break;
        default:
            break;
    }

    colorValues = [red, green, blue];
    differentColorValues = [dred, dgreen, dblue];

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

ColorGame.prototype.applyDefaultSettings = function () {
    let defaultOptions = {
        hardness: 'easy',
        colorMode: 'all',
        minimalDelta: 2,
        time: 100,
        level: 1,
        visible: true,
        clickCount: 0,
        rowCount: 2,
        maxHints: 99,
        hintCount: 0
    };

    this.init(defaultOptions);
};

/**
 *Start a game
 *@param {void}
 *@return {void} 
 */
ColorGame.prototype.start = function () {
    //if game is over or haven't started yet
    if (!this.started) {
        this.started = true;
        //fix no time bug when restarting game after finish
        if (this.timer !== undefined) {
            window.clearInterval(this.tock);
            this.reset();
        }
        this.nextLevel();
        //renew timer
        this.tick();
        //this.view.updateIndicators();
    } else {
        //action confirm
        setTimeout(() => {
            if (confirm(languages[this.view.locale].replayText)) {
                window.clearInterval(this.tock);
                this.reset();
                this.nextLevel();
                this.tick();
                //this.updateIndicators();
            } else {
                this.show();
            }
        }, 200)
    }
};


ColorGame.prototype.nextLevel = function () {
    this.generateColor();
    this.view.drawGrid(this);
}

ColorGame.prototype.tick = function () {
    this.tock = window.setInterval(() => {
        this.time--;
        this.view.updateIndicators(this);

        //fixed negative time bug after penalty
        if (this.time <= 0) {
            window.clearInterval(this.tock);
            //as game is over disable grid 

            this.started = false;
        }
    }, 1000)
}