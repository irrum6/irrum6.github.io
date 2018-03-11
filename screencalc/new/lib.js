class Lib {
    /**
     * Check if is positive integer
     * @param {*} args 
     */
    static isPositiveInteger(...args) {
        if (args.length > 0) {
            for (let i = 0, len = args.length; i < len; i++) {
                if (!Number.isInteger(args[i]) || args[i] < 0) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * check if is number
     * @param {*} args 
     */
    static isNumber(...args) {
        if (args.length > 0) {
            for (let i = 0, len = args.length; i < len; i++) {
                if (Number.isNaN(args[i]) || typeof args[i] !== "number") {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * round number
     * @param {Number} number 
     * @param {Integer} precision 
     */
    static toPrecision(number, precision) {
        if (Lib.isNumber(number) && Lib.isPositiveInteger(precision)) {
            let digistBeforePoint = number.toString().indexOf(".");
            if (digistBeforePoint < 0) {
                digistBeforePoint = number.toString().length;
                precision = 0;
            }
            return number.toPrecision((digistBeforePoint + precision));
        } else {
            return 0;
        }
    }
    /**
     * Query one element matching selector
     * @param {string} selector 
     */
    static q(selector) {
        //force convert to string and query
        return document.body.querySelector(('' + selector));
    }
    /**
     * Query all elements matching selector
     * @param {string} selector 
     */
    static qa(selector) {
        //force convert to string and query
        return document.body.querySelectorAll(('' + selector));
    }
}