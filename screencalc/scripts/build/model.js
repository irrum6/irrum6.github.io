const UNITS = ["Inches", "Centimetres", "Millimetres"];
Object.freeze(UNITS);
class Screen {
    constructor(w, h, ppu, u) {
        //private fields
        const inner = {
            width: {
                type: 'number',
            },
            height: {
                type: 'number',
            },
            pixelsPerUnit: {
                type: 'number',
            },
            ratio1: {
                type: 'number',
            },
            ratio2: {
                type: 'number',
            },
            resolutionWidth: {
                type: 'number',
            },
            resolutionHeight: {
                type: 'number',
            },
            unit: {
                type: 'string',
                restriction: UNITS
            },
            language: {
                type: 'string',
                restriction: CURRENT_SUPPORTED_TRANSLATIONS
            },
        };
        //define constraints
        this.bindFunctionsToInnerFields(inner);
        this.setValues(w, h, ppu, u);
    }
    bindFunctionsToInnerFields(inner) {
        if (typeof inner !== 'object') {
            throw new Error("Inner field must be an object, this style to work !")
        }
        this.getProperty = this.getProperty.bind(this, inner);
        this.getPropertyValue = this.getPropertyValue.bind(this, inner);
        this.setPropertyValue = this.setPropertyValue.bind(this, inner);
    }
    /**
     * @param {Object} p //bind 
     * @param {String} prop 
     * @returns {any}
     */
    getProperty(p, prop) {
        return p[prop]
    }
    /** 
     * @param {Object} p //bind 
     * @param {String} prop 
     * @returns {any}
     */
    getPropertyValue(p, prop) {
        return p[prop].value;
    }
    /** 
     * @param {Object} p //bind 
     * @param {String} prop
     * @param {any} val 
     * @returns {any}
     */
    setPropertyValue(p, prop, val) {
        if (typeof val !== p[prop].type) {
            throw new Error(`type ${p[prop].type} expected, ${typeof val} was provided`);
        }
        if (p[prop].restriction && !p[prop].restriction.includes(val)) {
            throw new Error(`value not in range`);
        }
        p[prop].value = val;
    }
    setValues(w, h, ppu, u) {
        this.setPropertyValue('width', w);
        this.setPropertyValue('height', h);
        this.setPropertyValue('pixelsPerUnit', ppu);
        this.setPropertyValue('ratio1', (w / h) * 9);
        this.setPropertyValue('ratio2', 9);
        this.setPropertyValue('resolutionWidth', Math.round(ppu * w));
        this.setPropertyValue('resolutionHeight', Math.round(ppu * h));
        this.setPropertyValue('unit', u);
        this.setPropertyValue('language', 'eng');
    }
}