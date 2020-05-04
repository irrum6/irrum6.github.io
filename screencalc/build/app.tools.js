//let errors happen instead
const q = s => document.body.querySelector(s);
const qa = s => document.body.querySelectorAll(s);
const val = s => q(s).value;
const on = 'addEventListener';
const un = 'removeEventListener';
const attr = 'setAttribute';const lib = (function () {
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
}());const convert = (function () {
    const UNITS = ['Inches', 'Centimetres', 'Millimetres']

    const all = (num, div) => {
        if (!lib.isNumber(num, div)) throw new Error("not a number");
        if (num < 0 || div < 0) throw new Error("negative numbers not allowed");
        return num / div;
    }
    const cmtoi = (cm) => all(cm, 2.54);
    const cmtomm = (cm) => all(cm, 0.1);
    const mmtoi = (mm) => all(mm, 25.4);
    const mmtocm = (mm) => all(mm, 10);
    const itocm = (i) => all(i, (1 / 2.54));
    const itomm = (i) => all(i, (1 / 25.4));

    const getUnitShort = (u) => {
        if (!UNITS.includes(u)) throw new Error("unsupported unit");
        let us;
        switch (u) {
            case 'Inches':
                us = "i";
                break;
            case 'Centimetres':
                us = "cm";
                break;
            case 'Millimetres':
                us = "mm";
                break;
        }
        return us;
    }

    let c = { cmtoi, cmtomm, mmtoi, mmtocm, itocm, itomm, getUnitShort };
    Object.freeze(c);
    return c;
}());const CURRENT_SUPPORTED_TRANSLATIONS = ['eng', 'geo'];
Object.freeze(CURRENT_SUPPORTED_TRANSLATIONS);

const TRANSLATE_DATA = {
    inches: {
        geo: 'დუიმი',
        eng: 'Inches'
    },
    millimetres: {
        geo: 'მილიმეტრი',
        eng: 'Millimetre'
    },
    centimetres: {
        geo: 'სანტიმეტრი',
        eng: 'Centimetres'
    },
    diagonal: {
        geo: 'დიაგონალი',
        eng: 'Diagonal'
    },
    aspect_ratio: {
        geo: 'შეფარდება',
        eng: 'Aspect Ratio'
    },
    width: {
        geo: 'სიგანე',
        eng: 'Width'
    },
    height: {
        geo: 'სიმაღლე',
        eng: 'Height'
    },
    resolutions: {
        geo: 'გაფართოება',
        eng: 'Resolution'
    },
    pixels: {
        geo: 'პიქსელები',
        eng: 'Pixels'
    },
    popup_text: {
        geo: 'გამოიყენეთ ღილაკები ბოქლომით რათა ველის მნიშვნელობა უცვლელი '
            .concat('გახადოთ, დააჭირეთ ღილაკს ისრებით  ველების ერთმანეთთან ')
            .concat('დასაკავშირებლად (განსაკავშირებლად).\n')
            .concat('პიქსელები აღნიშნავს პიქსელების რაოდენობას არჩეულ ')
            .concat('სიგრძის ერთეულზე'),
        eng: 'Use Lock icons to freeze input\'s value, click button with arrows '
            .concat('to link (unlink) on input values (width to height for example); ')
            .concat('so they change together.\n')
            .concat('Pixels indicate number of pixels per user chosen length unit')
    }
}

Object.freeze(TRANSLATE_DATA);