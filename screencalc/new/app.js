class ScreenCalc {
    /**
     * @param {string} u 
     */
    constructor(u) {
        this["-unit"] = u;
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