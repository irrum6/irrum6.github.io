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
     * check if is a number
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

class Convert {
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
                case "millimetre":
                    number = number * 25.4;
                    break;
            }
            return {
                success: true,
                result: (number).toFixed(2)
            };
        }
    }
}