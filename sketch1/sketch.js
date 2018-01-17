class Sketch {
    /**
     * @param {*} canvas 
     * @param {*} context 
     */
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.color = '#000000';
        this.width = 5;
        //default color for canvas
        this.bgColor = "#a0b0c0";
        //default color for brush
        this.defaultColor = "#000000";
        //remembering actions
        this.actions = { prev: 'none' };
        this.mode = 'pencil';

        this.currentTool = 'point';

        this.lastPixel = undefined;
        this.apromixation = true;
        //mousedown or touchstart
        this.mousedown = false;
        this.touchstart = false;
        this.eraseState = false;
        this.offset = { left: 0, top: 0 };

        this.imageState = new ImageState(this.context);

        this.validModes = ["pencil", "eraser"];
        this.validTools = ["point"];
    }
    //lastpixel
    /**
     * @param {*} x 
     * @param {*} y 
     */
    setLastPixel(x, y) {
        if (Lib.isPositiveNumber(x, y)) {
            this.lastPixel = {};
            this.lastPixel.x = x;
            this.lastPixel.y = y;
        }
    }
    getLastPixel() {
        return this.lastPixel;
    }
    /**
     * @param {String} c 
     */
    setColor(c) {
        //force convert to string
        c = ("" + c);
        //ignore "#" in start
        c = c.substr(1, c.length - 1)
        //check for valid 6 letter hexidecimal string
        let hexreg = new RegExp("^[A-Fa-f0-9]{6}$");
        if (hexreg.test(c)) {
            this.color = '#' + c;
        }
    }
    /**
     * @param {String} mode 
     */
    setMode(mode) {
        if (this.validModes.includes(mode)) {
            this.mode = mode;
        }
    }
    /**
     * set brush(or other tool) width
     * @param {integer} w 
     */
    setWidth(w) {
        if (Lib.isPositiveNumber(w)) {
            this.width = w;
        }
    }
    /**
     * @param {event} event 
     */
    draw(event, istouch) {
        Actions.save(this.canvas);
        if (this.mousedown || this.touchstart) {
            let x, y;
            x = event.clientX - this.offset.left, y = event.clientY - this.offset.top;
            if (istouch) {
                let pointZero = event.touches[0];
                x = pointZero.clientX, y = pointZero.clientY;
            }
            if (this.lastPixel === undefined) {
                this.setLastPixel(x, y);
            }
            let tool = this.currentTool;
            this[tool](x, y);

            //corect slips
            if (this.apromixation) {
                let deltaX = x - this.getLastPixel().x, deltaY = y - this.getLastPixel().y;

                if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
                    //how much pixels we need to add
                    let length = Math.max(Math.abs(deltaX), Math.abs(deltaY));
                    let xStep = deltaX / length, yStep = deltaY / length;

                    for (let counter = 0; counter < length; counter++) {

                        let correctedX = Math.round(this.getLastPixel().x + counter * xStep);
                        let correctedY = Math.round(this.getLastPixel().y + counter * yStep);
                        this[tool](correctedX, correctedY);
                    }
                }
            }
            this.setLastPixel(x, y);
        }
    }

    //--tools
    /**
     * Draw a point
     * @param {integer} x 
     * @param {integer} y 
     */
    point(x, y) {
        if (Lib.isPositiveNumber(x, y)) {
            this.context.beginPath();
            this.context.strokeStyle = this.color;
            this.context.fillStyle = this.color;
            //width as radius
            this.context.arc(x, y, this.width, 0, 2 * Math.PI, false);
            this.context.stroke();
            this.context.fill();
            this.context.save();
        }
    }
    static rectangle(x, y, x1, y1) {

    }

    static line(x, y, x1, y1) {

    }
    static triangle(x, y, x1, y1, x2, y2) {

    }

    static circle(x, y, r) {

    }

    clearCanvas() {
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    correctCanvasSize() {
        if (window.matchMedia('(orientation:landscape)').matches) {
            let style = window.getComputedStyle(this.canvas.parentElement);
            let width = Math.floor(Number.parseInt(style.width) * 0.9) + 'px';
            let height = Math.floor(Number.parseInt(window.innerHeight) * 0.9) + 'px';
            this.canvas.setAttribute("width", width);
            this.canvas.setAttribute("height", height);

        } else {
            let style = window.getComputedStyle(document.querySelector("#canvas-container"));
            let width = Math.floor(Number.parseInt(style.width) * 0.95) + 'px';
            this.canvas.setAttribute("width", width);
            this.canvas.setAttribute("height", width);
        }
    }
    setOffsetCorrection() {
        setInterval(() => {
            this.offset = this.canvas.getBoundingClientRect();
        }, 1000);
    }
}