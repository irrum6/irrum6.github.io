//global fucntion and synonims
function q(str) {
    let result = null;
    //this way invalid selector will return null like selector for which element wasn't found
    try {
        result = document.body.querySelector(str);
    } catch (err) {
        console.log(err.message);
    }
    return result;
}
function qa(str) {
    let results = null;
    //this way invalid selector will return null like selector for which elements weren't found
    try {
        results = document.body.querySelectorAll(str);
    } catch (err) {
        console.log(err.message);
    }
    return results;
}

var on = "addEventListener";

var h5 = (function () {

    class Helper {
        /**
         * Note: it when passed two or more arguments will return true if all arguments are defined
         *@param {type} args (pass as many arguments as you want)
         *@returns {boolean}
         */
        defined(...args) {
            let len = args.length;
            if (len === 0) return false;
            for (let i = 0; i < len; i++) {
                if (typeof args[i] === 'undefined' || args[i] === null) return false;
            }
            return true;
        }
        /**
         *Note:If you pass two or more arguments true will be returned only if all of them are not empty
         *@param {type} args (pass as many arguments as you want)
         *@returns {boolean}
         */
        notEmpty(...args) {
            let len = args.length;
            if (len === 0) return false;
            for (let i = 0; i < len; i++) {
                if (!this.defined(args[i]) || args[i] === "" || Number.isNaN(args[i])
                    || (typeof args[i] === "object" && Object.keys(args[i]).length === 0)) {
                    return false;
                }
            }
            return true;
        }
        /**
         *Note:If you pass two or more arguments true will be returned only if all of them are strings
         *@param {type} args (pass as many arguments as you want)
         *@returns {boolean}
         */
        isString(...args) {
            let len = args.length;
            if (len === 0) return false;
            for (let i = 0; i < len; i++) {
                if (!this.defined(args[i]) || typeof args[i] !== 'string') return false;
            }
            return true;
        }
        /**
         *Note:If you pass two or more arguments true will be returned only if all of them are Positive Integers
         *@param {Number} args (pass as many arguments as you want)
         *@returns {Boolean}
         */
        isPositiveInteger(...args) {
            let len = args.length;
            if (len === 0) return false;
            for (let i = 0; i < len; i++) {
                if (!this.defined(args[i]) || !Number.isInteger(args[i]) || Math.sign(args[i]) !== 1) return false;
            }
            return true;
        }
        /**
         *returns random number(s) in range [0,1] it will ignore negative numbers and strings
         *@param {number} many 
         *@returns {float}
         */
        random(many) {
            if (this.isPositiveInteger(many)) {
                let rands = new Uint32Array(many);
                window.crypto.getRandomValues(rands);
                return Array.prototype.map.call(rands, (elem) => (elem / 4294967296));
            }
            var rands = new Uint32Array(1);
            window.crypto.getRandomValues(rands);
            return rands[0] / 4294967296;
        }
        /**
         *Make a HTML Element
         *@param {String} tag
         *@param {*} args // other parameters [optional]
         *@returns {HTMLElement}
        */
        make(tag, ...args) {
            if (this.notEmpty(tag)) {
                let element = document.createElement(tag);
                if (this.notEmpty(args[0])) element.id = args[0];
                if (this.notEmpty(args[1])) element.className = args[1];
                if (this.notEmpty(args[2])) element.style = args[2];
                if (this.notEmpty(args[3])) element.textContent = args[3];
                if (this.notEmpty(args[4])) element.innerText = args[4];
                if (this.notEmpty(args[5])) element.href = args[5];
                return element;
            }
            return null;
        };
    }
    return new Helper();
}());