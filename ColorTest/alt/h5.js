let h5 = (function () {

    function H5() { }

    /**
     * Note it when passed two or more arguments will return true if all arguments are defined
    * @param {type} args (pass as many arguments as you want)
    * @return {boolean}
    */
    H5.prototype.defined = function (...args) {
        if (args.length > 0) {
            for (arg of args) {
                if (typeof arg === 'undefined' || arg === null) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };

    /**
     * If you pass two or more arguments true will be returned only if all of them are not empty
     * @param {type} args (pass as many arguments as you want)
     * @return {boolean}
     */
    H5.prototype.notEmpty = function (...args) {
        if (args.length > 0) {
            for (arg of args) {
                if (!this.defined(arg) || arg === "" || Number.isNaN(arg)
                    || (typeof arg === "object" && Object.keys(arg).length === 0)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     * checks whether or not passed argument is positive integer
     * @param {number} arg
     * @return {boolean}
     */
    H5.prototype.isPositiveInteger = function (arg) {
        //if not defined, then isn't integer'
        if (!this.defined(arg)) {
            return false;
        }
        return (Number.isInteger(arg) && Math.sign(arg) === 1) ? true : false;
    };

    /**
     * returns random number(s) in range [0,1] it will ignore negative numbers and strings
     * @param {number} many 
     * @return {float}
     */
    H5.prototype.random = function (many) {
        if (this.isPositiveInteger(many)) {
            let rands = new Uint32Array(many);
            window.crypto.getRandomValues(rands);
            return Array.prototype.map.call(rands, (elem) => {
                return elem / 4294967296;
            });
        }
        var rands = new Uint32Array(1);
        window.crypto.getRandomValues(rands);
        return rands[0] / 4294967296;
    };

    /**
     * Make a HTML Element
     * @param {String} tag
     * @param {String} id
     * @param {String} className
     * @param {String} style
     * @return {HTMLElement}
     */
    H5.prototype.make = function (tag, id, className, style) {
        if (this.notEmpty(tag, id)) {
            let element = document.createElement(tag);
            element.id = id;

            if (this.notEmpty(className)) { element.className = className; }

            if (this.notEmpty(style)) { element.style = style; }

            return element;
        }
    };

    H5.prototype.button = function (id, className, style, innerText) {
        let button = this.make('button', id, className, style);
        button.innerText = innerText;
        return button;
    };

    H5.prototype.div = function (id, className, style) {
        return this.make('div', id, className, style);
    };

    /**
     * @param {String} id
     * @param {String} className
     * @param {String} style
     * @param {String} href
     * @param {String} text
     * @return {void}
     */
    H5.prototype.anchor = function (id, className, style, href, text) {
        let anchor = this.make('a', id, className, style);
        anchor.textContent = text;
        anchor.href = href;
        return anchor;
    }

    H5.prototype.span = function (id, className, style) {
        return this.make('span', id, className, style);
    };

    /**
     * Query Elements
     * will return all elements if not specified
     * @param {String} selector
     * @param {Boolean} sole
     * @return {HTMLElements}
     */
    H5.prototype.q = function (queryString, sole) {
        if (this.notEmpty(queryString)) {
            if (this.notEmpty(sole)) {
                return sole ? document.querySelector(queryString) : document.querySelectorAll(queryString);
            }
            return document.querySelectorAll(queryString);
        }
    };

    return new H5();
} ());