class Lib {
    /**
     * Check if is positive integer
     * @param {*} args
     * @returns {boolean}
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
     * check if is a number
     * @param {*} args
     * @returns {boolean}
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
     * Query one element matching selector
     * @param {string} selector
     * @returns {HTMLElementsCollection}
     */
    static q(selector) {
        //force convert to string and query
        return document.body.querySelector(('' + selector));
    }
    /**
     * Query all elements matching selector
     * @param {string} selector
     * @returns {HTMLElementsCollection}
     */
    static qa(selector) {
        //force convert to string and query
        return document.body.querySelectorAll(('' + selector));
    }
}

class Convert {
    /**
     * @param {string} from 
     * @param {number} number
     * @returns {object}
     */
    static ToInch(from, number) {
        if (typeof number !== "number" || typeof from !== "string") {
            return {
                success: false,
                reason: 'type mismatch'
            }
        } else {
            switch (from) {
                case "centimetre":
                    number = number / 2.54;
                    break;
                case "millimetre":
                    number = number / 25.4;
                    break;
            }
            return {
                success: true,
                result: (number).toFixed(2)
            };
        }
    }
    /**
     * @param {string} from 
     * @param {number} number
     * @returns {object}
     */
    static ToCentimetre(from, number) {
        if (typeof number !== "number" || typeof from !== "string") {
            return {
                success: false,
                reason: 'type mismatch'
            }
        } else {
            switch (from) {
                case "inch":
                    number = number * 2.54;
                    break;
                case "millimetre":
                    number = number / 10;
                    break;
            }
            return {
                success: true,
                result: (number).toFixed(2)
            };
        }
    }
    /**
     * @param {string} from 
     * @param {number} number
     * @returns {object}
     */
    static ToMillimetre(from, number) {
        if (typeof number !== "number" || typeof from !== "string") {
            return {
                success: false,
                reason: 'type mismatch'
            }
        } else {
            switch (from) {
                case "centimetre":
                    number = number * 10;
                    break;
                case "inch":
                    number = number * 25.4;
                    break;
            }
            return {
                success: true,
                result: (number).toFixed(2)
            };
        }
    }
    /**
     * @param {string} from 
     * @param {number} number
     * @returns {object}
     */
    static FromTo(from, to, number) {
        if (typeof number !== "number" || typeof from !== "string" || typeof to !== "string") {
            return {
                success: false,
                reason: 'type mismatch'
            }
        } else {
            let r;
            switch (to) {
                case "inch":
                    r = Convert.ToInch(from, number);
                    break;
                case "centimetre":
                    r = Convert.ToCentimetre(from, number);
                    break;
                case "millimetre":
                    r = Convert.ToMillimetre(from, number);
                    break;
                default: r = {
                    success: false,
                    reason: 'unit not found'
                };
            }
            return r;
        }
    }
}