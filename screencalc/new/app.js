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
    "pixels-per-unit","unit-width", "unit-height", "unit-area"];
Object.freeze(references);

class ScreenCalc {
    constructor() {
        this.init();
    }
    init() {
        this.elements = {};
        this.addElements();
        this.addUnitElements();
        let len = this.UnitSwitch.length;
        for (let i = 0; i < len; i++) {
            if (this.UnitSwitch[i].checked) {
                this.Unit = this.UnitSwitch[i].value;
            }
        }
        this.calc();
    }
    calc() {
        //if(this)        
    }
    //add references to html elements to app
    //unit switcher
    addUnitElements() {
        if (typeof this.elements === 'undefined' || this.elements === null) {
            this.elements = {};
        }
        let units = document.querySelectorAll('[data-app-reference="unit"]');
        let arr = [];
        for (let i = 0, len = units.length; i < len; i++) {
            arr.push(units[i].value);
            units[i].addEventListener('click', (event) => {
                let checked = event.target.checked;
                if (checked) {
                    let from = this.Unit;
                    let to = event.target.value;
                    let convertables = Lib.qa('[data-app-convertable="1"]');
                    for (let i = 0, len = convertables.length; i < len; i++) {
                        let value = Number.parseFloat(convertables[i].value);
                        value = Convert.FromTo(from, to, value);
                        if (value.success) {
                            convertables[i].value = Number.parseFloat(value.result);
                        }
                    }
                    this.Unit = event.target.value;
                }
            });
        }
        this["-valid-units"] = arr;
        this.elements["-units"] = units;
    }
    //get unit switchers
    get UnitSwitch() {
        return this.elements["-units"];
    }
    addElements() {
        let len = references.length;
        for (let i = 0; i < len; i++) {
            let selector = '[data-app-reference="#ref"]'.replace("#ref", references[i]);
            let elem = document.querySelector(selector);
            this.elements[references[i]] = elem;
        }
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
var myApp = new ScreenCalc();