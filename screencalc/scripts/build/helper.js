class Helper {
    /**
     * @param {number} d diagonal
     * @param {number} r ratio
     * @returns {object}
     */
    static calculatefromDiagonal(d, r) {
        if (typeof d != 'number') throw new Error("first argument not a number");
        if (typeof r != 'number') throw new Error("second argument not a number");
        let d2 = d * d;
        let r2 = r * r;

        let height = Math.sqrt(d2 / (1 + r2));
        let width = height * r;
        return { width, height };
    }
    /**
     * @param {number} w width
     * @param {number} h height
     * @returns {object}
     */
    static calculateFromPhysDimensions(w, h) {
        if (typeof w != 'number') throw new Error("first argument not a number");
        if (typeof h != 'number') throw new Error("second argument not a number");
        let ratio = w / h;
        let diagonal = Math.sqrt(w * w + h * h);
        return { ratio, diagonal };
    }
    /**
     * @param {number} rw width
     * @param {number} rh height
     * @returns {object}
     */
    static calculateFromResolutions(rw, rh, ppi) {
        if (typeof rw != 'number') throw new Error("first argument not a number");
        if (typeof rh != 'number') throw new Error("second argument not a number");
        if (typeof ppi != 'number') throw new Error("third argument not a number");
        let width = rw / ppi;
        let height = rh / ppi;
        let { ratio, diagonal } = Helper.calculateFromPhysDimensions(width, height);
        return { width, height, ratio, diagonal };
    }
    /**
     * get resolutions back
     * @param {number} w 
     * @param {number} h 
     * @param {number} ppi 
     */
    static getResolutions(w, h, ppi) {
        if (typeof w != 'number') throw new Error("first argument not a number");
        if (typeof h != 'number') throw new Error("second argument not a number");
        if (typeof ppi != 'number') throw new Error("third argument not a number");
        let rwidth = Math.round(w * ppi);
        let rheight = Math.round(h * ppi);
        return { rwidth, rheight };
    }
}