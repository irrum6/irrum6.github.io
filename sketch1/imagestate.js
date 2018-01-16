class ImageState {
    /**
     * @param {CanvasContext} context 
     */
    constructor(context) {
        this.context = context;
        this.states = [];
    }
    /**
     * @return {integer} length
     */
    get length() {
        return this.states.length;
    }
    /**
     * @param {integer} x 
     * @param {integer} y 
     * @param {integer} w 
     * @param {integer} h 
     */
    add(x, y, w, h) {
        let imageData = this.context.getImageData(x, y, w, h);
        let imageDataElem = {
            imgdata: imageData,
            coords: { sx: x, sy: y }
        };
        this.states.push(imageDataElem);
        //keep only 5 states to operate
        if (this.length > 5) {
            this.state.shift();
        }
    }
    /**
     * remove element
     * @param {integer} n 
     */
    remove(n) {
        this.states = this.states.filter((elem, index) => {
            return index !== n;
        });
    }
    /**
     * get element at positions
     * @param {integer} n 
     */
    elemAt(n) {
        if (Lib.isPositiveInteger(n) && n < this.length) {
            return this.states[n];
        }
        return
    }
    restore(n) {
        if (Lib.isPositiveInteger(n) && n < this.length) {
            let elem = this.elemAt(n);
            this.context.putImageData(elem.imgdata, elem.coords.sx, elem.coords.sy);
        }
    }
}