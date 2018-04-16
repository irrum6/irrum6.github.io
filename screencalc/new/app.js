//limits
const LIMITS = {
    //maximum diagonal length
    DIAGONAL_LENGTH_MAX_MM: 2060,
    DIAGONAL_LENGTH_MAX_CM: 206,
    DIAGONAL_LENGTH_MAX_iN: 81,
    //maximum length
    LENGTH_MAX_MM: 1900,
    LENGTH_MAX_CM: 190,
    LENGTH_MAX_IN: 74.5,
    //minimum length
    LENGTH_MIN_CM: 2,
    LENGTH_MIN_MM: 20,
    LENGTH_MIN_IN: 0.8,
    //step
    CENTIMERE_STEP: 0.1,
    MILLIMETRE_STEP: 1,
    INCH_STEP: 0.1
}
Object.freeze(LIMITS);

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
        //unit switcher
        let units = document.querySelectorAll('[name="unitoptions"]');
        let arr = [];
        for (let i = 0, len = units.length; i < len; i++) {
            arr.push(units[i].value);
        }
        this["-valid-units"] = arr;
        this.Unit = 'centimetre';
        this.getAppElement('unit-option-centimetre').checked = true;
        this.getAppElement('diagonal').value = '16';
        this.getAppElement('aspect-ratio').value = '17/9';
        this.getAppElement('pixels-per-unit').value = '160';
        this.calc();
    }
    calc() {
        //if(this)
        let d = this.getAppElement('diagonal');
        let ar = this.getAppElement('aspect-ratio');
        let arc = this.getAppElement('aspect-ratio-calculated');
        let pw = this.getAppElement('pixel-width');
        let ph = this.getAppElement('pixel-height');
        let ppu = this.getAppElement('pixels-per-unit');
        let uw = this.getAppElement('unit-width');
        let uh = this.getAppElement('unit-height');
        let ua = this.getAppElement('unit-area');
        if (d.disabled) {
            //if disdiagonal is disabled, we get physical size inputs
            //which means aspect ratio should be disabled too at this point so
            //we will ignore them
            //unitwidth
            let unitw = Number.parseFloat(uw.value);
            let unith = Number.parseFloat(uh.value);
            let ppunit = Number.parseFloat(ppu.value);

            let asrat = unitw / unith;

            let dd = Math.sqrt((unitw * unitw) + (unith * unith));
            let uarea = unitw * unith;

            d.value = dd.toFixed(1).toString();
            arc.textContent = asrat.toFixed(2) + ':1';
            ua.textContent = uarea.toFixed(2).toString();

            pw.value = (ppunit * unitw).toFixed(0).toString();
            ph.value = (ppunit * unith).toFixed(0).toString();

            ar.value = '0';
            ar.lastChild.text = asrat.toFixed(1).toString();

        } else {
            let dd = Number.parseFloat(d.value);
            //diagonal is enabled , but not aspect ratio
            //get aspect ratio from resolutions
            if (ar.disabled) {
                let pixelw = Number.parseFloat(pw.value);
                let pixelh = Number.parseFloat(ph.value);
                let asrat = pixelw / pixelh;

                let unith = Math.sqrt((dd * dd) / (1 + (asrat * asrat)));
                let unitw = unith * asrat;

                ar.value = '0';
                ar.lastChild.text = (asrat * 9).toFixed(1) + '/9';
                arc.textContent = asrat.toFixed(2) + ':1';

                let uarea = unitw * unith;
                ua.textContent = uarea.toFixed(2).toString();

                uw.value = unitw.toFixed(1).toString();
                uh.value = unith.toFixed(1).toString();

                //disabling aspect ratio disables ppu so
                ppu.value = (pixelw / unitw).toFixed(0).toString();
            } else {
                //if aspect ratio is enabled so is ppu and resolution is disabled
                //we have display aspect ratio and ppu

                let asrs = ar.value.split('/').map((elem) => {
                    return Number.parseFloat(elem);
                });
                let asrat = asrs[0] / asrs[1];

                let unith = Math.sqrt((dd * dd) / (1 + (asrat * asrat)));
                let unitw = unith * asrat;
                let uarea = unitw * unith;
                uw.value = unitw.toFixed(1).toString();
                uh.value = unith.toFixed(1).toString();
                ua.textContent = uarea.toFixed(2).toString();

                arc.textContent = asrat.toFixed(2) + ':1';


                let ppunit = Number.parseFloat(ppu.value);
                pw.value = (ppunit * unitw).toFixed(0).toString();
                ph.value = (ppunit * unith).toFixed(0).toString();
            }
        }
    }
    /**
     * 
     * @param {string} ref
     * @return {HTMLElement} 
     */
    getAppElement(ref) {
        //force convert to string
        let appreference = '' + ref;
        let selector = '[data-app-reference="#ref"]'.replace("#ref", appreference);
        let elem = document.body.querySelector(selector);
        return elem;
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
setElementChangeEvents(myApp);
setToggles();