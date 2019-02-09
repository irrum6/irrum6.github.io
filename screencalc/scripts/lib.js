const lib = (function () {
    class Lib {
        /**
         * Check if is positive integer
        * @param {*} args
        * $@returns {Boolean} 
        */
        isPositiveInteger(...args) {
            let len = args.length;
            if (len === 0) return false;
            for (let i = 0; i < len; i++) {
                if (!Number.isInteger(args[i]) || args[i] < 0) return false;
            }
            return true;
        }
        /**
         * check if is number
         * @param {*} args
         * @returns {Boolean} 
         */
        isNumber(...args) {
            let len = args.length;
            if (len === 0) return false;
            for (let i = 0; i < len; i++) {
                if (typeof args[i] !== "number") return false;
                if (Number.isNaN(args[i])) return false;
            }
            return true;
        }
        /**
         * rounds a number
         * if parameters are incorrect type, exception is thrown
         * @param {Number} number 
         * @param {Integer} precision
         * @returns {String}
         */
        toPrecision(number, precision) {
            if (!this.isNumber(number)) throw "invalid: not a number";
            if (!this.isPositiveInteger(precision)) throw "invalid : precision not an integer";
            let digistBeforePoint = number.toString().indexOf(".");
            if (digistBeforePoint < 0) {
                digistBeforePoint = number.toString().length;
                precision = 0;
            }
            return number.toPrecision((digistBeforePoint + precision));
        }
        /**
        * @param {string} str
        * @returns {float} 
        */
        float(str) {
            let n = Number.parseFloat(str);
            if (Number.isNaN(n)) throw "String couldn't be parsed to FLOAT";
            return n;
        }
        /**
         * @param {string} str
         * @returns {int} 
         */
        int(str) {
            let n = Number.parseInt(str);
            if (Number.isNaN(n)) throw "String couldn't be parsed to INT";
            return n;
        }
    }
    let l = new Lib();
    Object.freeze(l);
    return l;
}());