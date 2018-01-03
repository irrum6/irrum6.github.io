class Lib {
    /**
     * @param {*} args 
     */
    static isPositiveInteger(...args) {
        if (args.length > 0) {
            args.forEach((elem) => {
                if (!Number.isInteger(elem) || elem < 0) {
                    return false;
                }
            });
            return true;
        }
        return false;
    }
    static toPrecision(number, precision) {
        if (Lib.isPositiveInteger(number, precision)) {
            let digistBeforePoint = number.toString().indexOf(".");
            if (digistBeforePoint < 0) {
                digistBeforePoint = number.toString().length;
                precision = 0;
            }
            return number.toPrecision((digistBeforePoint + precision));
        } else {
            return false;
        }
    }
    static elemP(text) {
        let p = document.createElement('p');
        p.innerText = ("" + text);
        return p;
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