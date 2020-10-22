"use strict"
//query
let q = (s) => document.body.querySelector(('' + s));
let qa = (s) => document.body.querySelectorAll(('' + s));

const isPositiveInteger = (num) => (typeof num === "number" && Number.isInteger(num) && num > -1);
const strokefp = (fp, c) => fp.style.stroke = c;

class FigureHandler {
    constructor() {
        this.parts = q('svg').children;
    }
    _get(index) {
        return this.parts[index];
    }
    animate(index) {
        strokefp(this._get(index), "black",);
    }
    deAnimate(index) {
        strokefp(this._get(index), "transparent",);
    }
    animateAll() {
        for (const p of this.parts) {
            strokefp(p, "black");
        }
    }
    deAnimateAll() {
        for (const p of this.parts) {
            strokefp(p, "transparent");
        }
    }
}

class InputHandler {
    constructor() {
        this.inputs = qa("#input > span");
        this.len = this.inputs.length;
    }
    show(i) {
        this.inputs[i].textContent = "_";
        this.inputs[i].style.display = "inline";
    }
    hide(i) {
        this.inputs[i].style.display = "none";
    }
    setLetter(index, letter) {
        letter = letter.toLowerCase();
        if (!this.isValidChar(letter)) {
            return false;
        }
        this.inputs[index].textContent = letter;
    }
    isValidChar(c) {
        return /[a-z_]/.test(c);
    }
    clear() {
        for (const inp of this.inputs) {
            inp.textContent = "";
        }
    }
    showOnlyXInputs(x) {
        // debugger;
        if (!isPositiveInteger(x)) {
            return false;
        }
        for (let i = 0; i < this.len; i++) {
            i > x ? this.hide(i) : this.show(i);
        }
    }
}

class VirtualKeyboard {
    constructor() {
        this.chars = "abcdefghijklmnopqrstuvwxyz".split("");
        this.chars.push("space");
        this.vkeys = [];
        this._vkeys();
    }
    _get(key) {
        return q(`#key_${key}`);
    }
    _vkeys() {
        for (let c of this.chars) {
            this.vkeys.push(this._get(c));
        }
    }
    activate(key) {
        this._get(key).disabled = false
    }
    deactivate(key) {
        this._get(key).disabled = true;
    }

    activateAll() {
        for (const vk of this.vkeys) {
            vk.disabled = false;
        }
    }
    deactivateAll() {
        for (const vk of this.vkeys) {
            vk.disabled = true;
        }
    }

}

class HangmanHelper {
    constructor(hangman) {
        this.figure = new FigureHandler();
        this.virtualKeys = new VirtualKeyboard();
        this.inputs = new InputHandler();
        this.how = hangman;
    }
    hint(text) {
        if (typeof text !== 'string' || text === "") {
            throw "text is null";
        }
        q("#hint>span").innerHTML = text;
    }
    reset() {
        this.figure.deAnimateAll();
        this.virtualKeys.activateAll();
        this.inputs.clear();
    }
    write() {
        let i = 0;
        let letters = this.how.word.split("");
        for (let l of letters) {
            this.inputs.setLetter(i, l);
            i++;
        }
    }
    getKey(e) {
        // return only a valid key
        // debugger;
        if (/[a-zA-Z]/.test(e.key) && e.key.length === 1) {
            return e.key;
        }
        if (e.code === "space") {
            return e.code;
        }
        return null;
    }
    onKeyEvent(event) {
        let key = this.getKey(event);
        if (key === null) {
            return false;
        }
        key = key.toLowerCase();
        this.virtualKeys.deactivate(key);
        this.key(key);
    }    
    onVirtualKeyEvent(event) {
        // debugger;
        event.target.disabled = true;
        let key = event.target.innerHTML;
        this.key(key);
    }
    setupKeyboard() {
        document.addEventListener('keydown', this.onKeyEvent.bind(this));
    }
    setupVirtualKeyboard() {
        // debugger;
        for (const vk of this.virtualKeys.vkeys) {
            vk.addEventListener('click', this.onVirtualKeyEvent.bind(this));
        }
    }
    key(key) {       
        key = key.toLowerCase();
        if(this.how.crossed.includes(key)){
            return false;
        }
        this.how.crossed.push(key);
        if (key == "space") key = " ";

        if (this.how.letters.includes(key)) {
            for (let i = 0, len = this.how.letters.length; i < len; i++) {
                if (this.how.letters[i] === key) {
                    this.inputs.setLetter(i, key);
                    this.how.letters[i] = null;
                }
            }
        } else {
            this.figure.animate(this.how.count++);//hang
        }

        let letters = this.how.letters.filter(elem => elem !== null);

        let len = letters.length;
        if (len === 0) {
            let int = setTimeout(() => {
                this.how.loadLevel();
                clearTimeout(int)
            }, 2000);
        }
        if (this.how.count >= 8 && len > 0) {
            this.figure.animate(this.how.count);
            let int = setTimeout(() => {
                this.how.loadLevel();
                clearTimeout(int)
            }, 3000);
            this.write();
        }
    }
}

let helper;

class HangMan {
    constructor() {
        this.count = 0;
        this.letters = null;
        this.crossed = null;
        this.word = ";"
        this.scale = 1;
    }
    setup() {
        helper = new HangmanHelper(this);
        helper.setupKeyboard();
        helper.setupVirtualKeyboard();
    }
    loadLevel() {
        this.count = 0;
        let rand = Math.floor(Math.random() * words.length);
        let word = words[rand]
        this.word = word.name;

        this.letters = word.name.split("");
        this.crossed = [];
        let len = this.letters.length;

        helper.reset();
        helper.hint(word.type);

        helper.inputs.showOnlyXInputs(len-1);        
        helper.inputs.setLetter(0, this.letters[0]);

        this.letters[0] = null;
    }
}
let hm = new HangMan();
hm.setup();
hm.loadLevel();