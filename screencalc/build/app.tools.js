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
}());const SUPPORTED_UNITS = ["Inches", "Centimetres", "Millimetres"];

class Convert {
    static all(num, div) {
        if (!lib.isNumber(num, div)) throw new Error("not a number");
        if (num < 0 || div < 0) throw new Error("negative numbers not allowed");
        return num / div;
    }
    static getUnitShort(u) {
        //const UNITS = ['Inches', 'Centimetres', 'Millimetres'];
        if (!SUPPORTED_UNITS.includes(u)) throw new Error("unsupported unit");
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
    static cmtoi(cm) { return this.all(cm, 2.54); }
    static cmtomm(cm) { return this.all(cm, 0.1); }
    static mmtoi(mm) { return this.all(mm, 25.4); }
    static mmtocm(mm) { return this.all(mm, 10); }
    static itocm(i) { return this.all(i, (1 / 2.54)); }
    static itomm(i) { return this.all(i, (1 / 25.4)); }
}
Object.freeze(SUPPORTED_UNITS);
Object.freeze(Convert);const SUPPORTED_TRANSLATIONS = ['eng', 'geo'];

const TRANSLATE_DATA = {
    languages: {
        geo: "ქართული",
        eng: "English"
    },
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
    physical_dims_label: {
        geo: 'ფიზიკური ზომები',
        eng: 'Physical Dimmension'
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
    lock: {
        geo: 'გამუდმივება',
        eng: 'Lock'
    },
    popup_text: {
        geo: `გამოიყენეთ ღილაკები ბოქლომით რათა ველის მნიშვნელობა უცვლელი
        გახადოთ.\n პიქსელები აღნიშნავს პიქსელების რაოდენობას არჩეულ
        სიგრძის ერთეულზე`,
        eng: `Use Lock icons to freeze input\'s value.\n
        Pixels indicate number of pixels per user chosen length unit`
    },
    unblock_phys: {
        geo: `გთხოვთ მოხსნათ ფიზიკური ზომების ბლოკი`,
        eng: `Please, unlock physical width and height`
    },
    unblock_res: {
        geo: `გთხოვთ მოხსნათ გარჩევადობის ბლოკი`,
        eng: `Please, unlock resolution width and height`
    },
    unblock_pixels: {
        geo: `გთხოვთ მოხსნათ პიქსელების  ბლოკი`,
        eng: `Please, unlock pixels`
    },
    unblock_ratio: {
        geo: `გთხოვთ მოხსნათ შეფარდების ბლოკი`,
        eng: `Please, unlock ratio`
    },
    unblock_diag: {
        geo: `გთხოვთ მოხსნათ დიაგონალის ბლოკი`,
        eng: `Please, unlock diagonal`
    }
}

class Translator {
    /**
     * 
     * @param {String} word 
     * @param {String} lang 
     */
    static getTranslation(word, lang) {
        //debugger;
        if (!lib.isString(word, lang)) {
            throw new Error("Not a string");
        }
        word = word.toLowerCase();
        if (!SUPPORTED_TRANSLATIONS.includes(lang)) {
            throw new Error('invalid value, language not supported');
        }
        //debugger;
        if (TRANSLATE_DATA[word] === undefined) {
            throw new Error("word not found in dictionary");
        }
        if (TRANSLATE_DATA[word][lang] === undefined) {
            throw new Error("Translation not found for language");
        }
        return TRANSLATE_DATA[word][lang];
    }
}

Object.freeze(SUPPORTED_TRANSLATIONS);
Object.freeze(TRANSLATE_DATA);
Object.freeze(Translator);