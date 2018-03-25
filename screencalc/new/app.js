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

//list of references to html element 
//constant and immutable
const references = ["diagonal", "aspect-ratio", "aspect-ratio-decimal", "pixel-width", "pixel-height",
    "pixels-per-unit", "pixel-area", "unit-width", "unit-height", "unit-area"];
Object.freeze(references);

class ScreenCalc {
    /**
     * 
     * @param {string} u 
     * @param {number} d 
     * @param {string} ar 
     * @param {float} ard 
     */
    constructor(u, d, ar, ard) {
        //unit
        this["-unit"] = u;
        //diagonal
        this["-diag"] = d;
        //step
        this["-diag-mm-step"] = 1;
        this["-diag-cm-step"] = 0.1;
        this["-diag-in-step"] = 0.1;
        //limits
        this["-diag-mm-max"] = 2060;
        this["-diag-mm-len-max"] = 1891;
        this["-diag-cm-len-max"] = 189.1;
        this["-diag-in-len-max"] = 74.5;
        //aspect ratio
        this["-aspect-ratio"] = ar;
        this["-aspect-ratio-decimal"] = ard;
    }
    getElements() {
        this.elements = {};
        let len = references.length;
        for (let i = 0; i < len; i++) {
            let selector = '[data-app-reference="#ref"]'.replace("#ref", references[i]);
            let elem = document.querySelector(selector);
            this.elements[references[i]] = elem;
        }
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