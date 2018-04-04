//limits
//maximum diagonal length
const DIAGONAL_LENGTH_MAX_MM = 2060;
const DIAGONAL_LENGTH_MAX_CM = 206;
const DIAGONAL_LENGTH_MAX_iN = 81;
//maximum length
const LENGTH_MAX_MM = 1900;
const LENGTH_MAX_CM = 190;
const LENGTH_MAX_IN = 74.5;
//minimum length
const LENGTH_MIN_CM = 2;
const LENGTH_MIN_MM = 20;
const LENGTH_MIN_IN = 0.8
//step
const CENTIMERE_STEP = 0.1;
const MILLIMETRE_STEP = 1;
const INCH_STEP = 0.1;

//list of references to html element 
//constant and immutable
const references = ["diagonal", "aspect-ratio", "aspect-ratio-calculated", "pixel-width", "pixel-height",
    "pixels-per-unit", "unit-width", "unit-height", "unit-area"];
Object.freeze(references);

class ScreenCalc {

    /**
     * @param {string} name 
     */
    constructor(name) {
        //force converto to string
        name = '' + name;
        Object.defineProperty(this, "name", {
            value: name,
            writable: false,
            enumerable: true,
            configurable: true
        });
        this.init();
    }
    init() {
        this.elements = {};
        this.addElements();
        let len = this.UnitSwitch.length;
        for (let i = 0; i < len; i++) {
            if (this.UnitSwitch[i].classList.contains('selected-unit')) {
                this.Unit = this.UnitSwitch[i].getAttribute('data-value');
            }
        }
        this.calc();
    }
    calc() {
        //if(this)        
    }
    //add references to html elements to app
    //get unit switchers
    get UnitSwitch() {
        return this.elements["-units"];
    }
    switchUnit(event) {
        Lib.q('.selected-unit').classList.remove('selected-unit');
        event.target.classList.add('selected-unit');
        if (1) {
            let from = this.Unit;
            let to = event.target.getAttribute('data-value');
            this.Unit = to;
        }
    }
    addElements() {
        if (typeof this.elements === 'undefined' || this.elements === null) {
            this.elements = {};
        }
        //inputs
        for (let i = 0, len = references.length; i < len; i++) {
            let selector = '[data-app-reference="#ref"]'.replace("#ref", references[i]);
            let elem = document.querySelector(selector);
            this.elements[references[i]] = elem;
        }
        //unit switcher
        let units = document.querySelectorAll('[data-app-reference="unit"]');
        let arr = [];
        for (let i = 0, len = units.length; i < len; i++) {
            arr.push(units[i].getAttribute('data-value'));
        }
        this["-valid-units"] = arr;
        this.elements["-units"] = units;

    }
    get ValidUnits() {
        return this["-valid-units"];
    }
    /**
     * @param {string} u //unit
     */
    set Unit(u) {
        if (this.ValidUnits.includes(u)) {
            this["-unit"] = u;
        } else {
            console.log("unsupported or invalid type");
        }
    }
    /**
     * @return {string}
     */
    get Unit() {
        return this["-unit"];
    }
    static w600() {
        if (window.innerWidth < 600) {
            document.getElementById('Calc_button').classList.add('btn-block');
            document.getElementById('mainbox').classList.add('container_fluid');
        }
    }
}

ScreenCalc.w600();
var myApp = new ScreenCalc('myApp');

function clickf(event) {
    Lib.q('.selected-unit').classList.remove('selected-unit');
    event.target.classList.add('selected-unit');
    //alert('clickf');
    //myApp.switchUnit(event);
}