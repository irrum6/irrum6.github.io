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
const references = ["diagonal", "aspect-ratio", "aspect-ratio-decimal", "pixel-width", "pixel-height",
    "pixels-per-unit", "pixel-area", "unit-width", "unit-height", "unit-area"];
Object.freeze(references);

class ScreenCalc {
    /**
     * 
     * @param {string} u 
     */
    constructor(u) {
        this.Unit = u;
        this.init();
        this.getElements();
        this.calc();
    }
    init() {
    }
    calc() {
        //if(this)
    }
    getElements() {
        this.elements = {};
        let len = references.length;
        for (let i = 0; i < len; i++) {
            let selector = '[data-app-reference="#ref"]'.replace("#ref", references[i]);
            let elem = document.querySelector(selector);
            this.elements[references[i]] = elem;
        }
        console.log(this.elements)
    }
    /**
     * @param {string} u //unit
     */
    set Unit(u) {
        let validunits = ["inch", "centimetre", "millimetre"];
        if (validunits.includes(u)) {
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
}

var myApp = new ScreenCalc("centimetre");

SetUpUnitSwitchers(myApp);