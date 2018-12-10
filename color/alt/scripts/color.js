class ColorGame {
    constructor(locale) {
        this.locale = locale;
        this.ApplyDefaultSettings();
    }
    init(options) {
        for (let option in options) {
            this[option] = options[option];
        }
        this.options = options;

        this.supportedModes = ["easy", "normal", "hard", "hardest"];
        //note 
        //since cmyk and rgb are both full color modes but rgb is wider
        //we use rgb for all color mode
        this.SupportedColorModes = ["rgb", "red", "green", "blue", "cyan", "magenta", "yellow", "black"];
        this.supportedLocales = ["english", "georgian", "german", "russian"];
        this.initDeltas();
        this.initColorRAnge();
    }
    initDeltas() {
        this.deltas = {};
        this.deltas["rgb"] = this.getRGBDeltas();
        this.deltas["cmyk"] = this.getCMYKDeltas();
    }
    initColorRAnge() {
        this.ranges = {};
        this.ranges["rgb"] = this.getRGBColorRange();
        this.ranges["cmyk"] = this.getCMYKColorRange();
    }
    /**
     * @returns {Map}
     */
    getRGBDeltas() {
        let deltas = new Map();
        deltas.set("easy", [128, 120, 112, 104, 96, 90, 82, 76, 70, 64, 58, 52, 48, 44, 40, 36, 32, 28, 26,
            24, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3]);
        deltas.set("normal", [96, 86, 76, 68, 60, 52, 46, 40, 34, 30, 26, 22, 20, 18, 16,
            15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3]);
        deltas.set("hard", [48, 40, 32, 26, 20, 17, 14, 11, 9, 8, 7, 6, 5, 4, 3]);
        deltas.set("hardest", [16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3]);
        deltas.set("minimal", 2);
        return deltas;
    }
    /**
     * @returns {Map}
     */
    getCMYKDeltas() {
        let deltas = new Map();
        deltas.set("easy", [0.5, 0.47, 0.44, 0.41, 0.38, 0.35, 0.32, 0.3, 0.28, 0.26, 0.24, 0.22, 0.2, 0.19,
            0.18, 0.17, 0.16, 0.15, 0.14, 0.13, 0.12, 0.11, 0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02]);
        deltas.set("normal"[0.36, 0.33, 0.3, 0.27, 0.24, 0.21, 0.18, 0.15, 0.12, 0.11, 0.1,
            0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02]);
        deltas.set("hard"[0.19, 0.16, 0.13, 0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02]);
        deltas.set("hardest", [0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02]);
        deltas.set("minimal", 0.01);
        return deltas;
    }

    reset() {
        for (let option in this.options) {
            this[option] = this.options[option];
        }
    }
    /**
     * @param {String} l //locale 
     */
    setLocale(l) {
        if (!h5.isString(l) || !this.supportedLocales.includes(l)) return false;
        this.locale = l;
        this.options.locale = l;
        //fire locale change event
        let event = new Event('localechange');
        document.body.dispatchEvent(event);
    }
    /**
     * @param {String} m //mode
     */
    setMode(m) {
        if (!h5.isString(m) || !this.supportedModes.includes(m)) return false;
        this.mode = m;
        this.options.mode = m;
    }
    /**
     * @param {String} c //colormode 
     */
    setColorMode(c) {
        if (!h5.isString(c) || !this.SupportedColorModes.includes(c)) return false
        this.colorMode = c;
        this.options.colorMode = c;
    }
    calculateDelta() {
        if (this.level > 0) {
            let colorspace = ["cyan", "magenta", "yellow", "black"].includes(this.colorMode) ? "cmyk" : "rgb";
            this.delta = (this.level > this.deltas[colorspace].get(this.mode).length) ?
                this.deltas[colorspace].get("minimal") : this.deltas[colorspace].get(this.mode)[this.level - 1]
        }
    }
    /**
     * @returns {Map}
     */
    getRGBColorRange() {
        let range = new Map();
        range.set("easy", [127, 224]);
        range.set("normal", [96, 224]);
        range.set("hard", [48, 240]);
        range.set("hardest", [32, 240]);
        return range;
    }
    /**
     * @returns {Map}
     */
    getCMYKColorRange() {
        let range = new Map();
        range.set("easy", [0.5, 0.9]);
        range.set("normal", [0.38, 0.9]);
        range.set("hard", [0.18, 0.94]);
        range.set("hardest", [0.12, 0.94]);
        return range;
    }
    generateColor() {
        this.selectColorRange();
        this.calculateDelta();
        let colors = ColorToolBox.generate(this.colorRange, this.delta, this.colorMode);
        this.color = colors.color;
        this.differentColor = colors.diff;
    }
    selectColorRange() {
        if (this.level > 0) {
            let colorspace = ["cyan", "magenta", "yellow", "black"].includes(this.colorMode) ? "cmyk" : "rgb";
            this.colorRange = this.ranges[colorspace].get(this.mode);
        }
    }
    ApplyDefaultSettings() {
        let defaultOptions = {
            mode: 'easy',
            colorMode: 'rgb',
            time: 100,
            level: 1,
            visible: true,
            clickCount: 0,
            rowCount: 2,
            maxHints: 99,
            hintCount: 0
        };
        this.init(defaultOptions);
    }
    start(view) {
        view.hideGrid();
        //if game is over or haven't started yet
        if (!this.started) {
            this.started = true;
            //fix no time bug when restarting game after finish
            if (this.timer !== undefined) {
                window.clearInterval(this.tock);
                this.reset();
            }
            this.nextLevel(view);
            //renew timer
            this.tick(view);
            //this.view.updateIndicators();
        } else {
            //action confirm
            setTimeout(() => {
                if (confirm(languages[this.locale].replayText)) {
                    window.clearInterval(this.tock);
                    this.reset();
                    this.nextLevel(view);
                    this.tick(view);
                    view.showGrid();
                } else {
                    view.showGrid();
                }
            }, 200)
        }
    }
    nextLevel(view) {
        this.generateColor();
        view.drawGrid();
        view.showGrid();
    }
    tick(view) {
        this.tock = window.setInterval(() => {
            this.time--;
            view.updateIndicators(this);
            //fixed negative time bug after penalty
            if (this.time <= 0) {
                window.clearInterval(this.tock);
                //as game is over disable grid 
                this.started = false;
                view.disableGrid();
            }
        }, 1000)
    }
}