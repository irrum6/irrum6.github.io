const lib = (function () {
    const SUPPORTED_HTML_TAGS = ['div', 'p', 'button', 'label', 'input'];
    Object.freeze(SUPPORTED_HTML_TAGS);
    class Lib {
        /**
        * @param {*} args
        * $@returns {Boolean} 
        */
        isPositiveInteger(...args) {
            if (args.length === 0) return false;
            for (const arg of args) {
                if (!Number.isInteger(arg) || arg < 0) return false;
            }
            return true;
        }
        /**
         * @param {*} args
         * @returns {Boolean} 
         */
        isNumber(...args) {
            if (args.length === 0) return false;
            for (const arg of args) {
                if (typeof arg !== "number") return false;
                if (Number.isNaN(arg)) return false;
            }
            return true;
        }
        /**
         * @param  {...any} args
         * @returns {Boolean}
         */
        isString(...args) {
            if (args.length === 0) return false;
            for (const arg of args) {
                if (typeof arg !== 'string') return false;
            }
            return true;
        }
        /**
         * @param  {...any} args
         * @returns {Boolean}
         */
        isFunction(...args) {
            if (args.length === 0) return false;
            for (const arg of args) {
                if (typeof arg !== 'function') return false;
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
            if (!this.isNumber(number)) throw new Error("not a number");
            if (!this.isPositiveInteger(precision)) throw new Error("precision not an integer");
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
            if (Number.isNaN(n)) throw new Error("String couldn't be parsed to FLOAT");
            return n;
        }
        /**
         * @param {string} str
         * @returns {int} 
         */
        int(str) {
            let n = Number.parseInt(str);
            if (Number.isNaN(n)) throw new Error("String couldn't be parsed to INT");
            return n;
        }
        make(tag, classesArray) {
            if (!this.isString(tag)) throw new Error("Tag must be a string");
            if (!SUPPORTED_HTML_TAGS.includes(tag)) throw new Error("tag not supported");
            let elem = document.createElement(tag);
            if (Array.isArray(classesArray) && classesArray.length > 0) {
                for (const cssClass of classesArray) {
                    elem.classList.add(cssClass);
                }
            }
            return elem;
        }
    }
    let l = new Lib();
    Object.freeze(l);
    return l;
}());