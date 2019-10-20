const UNITS = ["Inches", "Centimetres", "Millimetres"];
Object.freeze(UNITS);
class Screen {
    constructor(w, h, ppu, u) {
        //private fields
        const inner = {
            width: w,
            height: h,
            pixelsPerUnit: ppu,
            ratio1: (w / h) * 9,
            ratio2: 9,
            resolutionWidth: Math.round(ppu * w),
            resolutionHeight: Math.round(ppu * h),
            unit: u,
            language: 'eng',
        };
        //define constraints

        this.bindFunctionsToInnerFields(inner);
    }
    bindFunctionsToInnerFields(inner) {
        if (typeof inner !== 'object') {
            throw new Error("Inner field must be an object, this style to work !")
        }
        this.getWidth = this.getWidth.bind(this, inner);
        this.setWidth = this.setWidth.bind(this, inner);
        this.getHeight = this.getHeight.bind(this, inner);
        this.setHeight = this.setHeight.bind(this, inner);
        this.getDiagonal = this.getDiagonal.bind(this, inner);
        this.setDiagonal = this.setDiagonal.bind(this, inner);
        this.getPixelsPerUnit = this.getPixelsPerUnit.bind(this, inner);
        this.setPixelsPerUnit = this.setPixelsPerUnit.bind(this, inner);
        this.getResolutionWidth = this.getResolutionWidth.bind(this, inner);
        this.setResolutionWidth = this.setResolutionWidth.bind(this, inner);
        this.getResolutionHeight = this.getResolutionHeight.bind(this, inner);
        this.setResolutionHeight = this.setResolutionHeight.bind(this, inner);
        this.getUnit = this.getUnit.bind(this, inner);
        this.setUnit = this.setUnit.bind(this, inner);
        this.getRatio1 = this.getRatio1.bind(this, inner);
        this.setRatio1 = this.setRatio1.bind(this, inner);
        this.getRatio2 = this.getRatio2.bind(this, inner);
        this.setRatio2 = this.setRatio2.bind(this, inner);
        this.getLanguage = this.getLanguage.bind(this, inner);
        this.setLanguage = this.setLanguage.bind(this, inner);
    }
    /**
     * 
     * @param {Object} p //bind 
     * @param {String} prop 
     * @returns {any}
     */
    getProp(p, prop) {
        return p[prop]
    }
    getWidth(p) {
        return p.width;
    }
    setWidth(p, w) {
        if (!lib.isNumber(w)) throw new Error(" width is not a number");
        if (w < 0) throw new Error("width is a negative number");
        p.width = w;
    }
    getHeight(p) {
        return p.height;
    }
    setHeight(p, h) {
        if (!lib.isNumber(h)) throw new Error("height is not a number");
        if (h < 0) throw new Error("height is a negative number");
        p.height = h;
    }
    getDiagonal(p) {
        return p.diagonal;
    }
    setDiagonal(p, d) {
        if (!lib.isNumber(d)) throw new Error("diagonal is not a number");
        if (d < 0) throw new Error("diagonal is a negative number");
        p.diagonal = d;
    }
    getPixelsPerUnit(p) {
        return p.pixelsPerUnit;
    }
    setPixelsPerUnit(p, ppu) {
        if (!lib.isNumber(ppu)) throw new Error("pixels_per_unit is not a number");
        if (ppu < 0) throw new Error("pixels_per_unit is a negative number");
        p.pixelsPerUnit = ppu;
    }
    getResolutionWidth(p) {
        return p.resolutionWidth;
    }
    setResolutionWidth(p, w) {
        if (!lib.isNumber(w)) throw new Error("resolution : width is not a number");
        if (w < 0) throw new Error("resolution : width is a negative number");
        p.resolutionWidth = Math.round(w);
        return true;
    }
    getResolutionHeight(p) {
        return p.resolutionHeight;
    }
    setResolutionHeight(p, h) {
        if (!lib.isNumber(h)) throw new Error("resolution : height is not a number");
        if (h < 0) throw new Error("resolution :height is a negative number");
        p.resolutionHeight = Math.round(h);
    }
    getUnit(p) {
        return p.unit;
    }
    setUnit(p, u) {
        if (!UNITS.includes(u)) throw new Error("Incompatible unit");
        p.unit = u;
    }
    getRatio1(p) {
        return p.ratio1;
    }
    setRatio1(p, r) {
        if (!lib.isNumber(r)) throw new Error("ratio1 is not a number");
        if (r < 0) throw new Error("ratio1 is a negative number");
        p.ratio1 = r;
    }
    getRatio2(p) {
        return p.ratio2;
    }
    setRatio2(p, r) {
        if (!lib.isNumber(r)) throw new Error("ratio2 is not a number");
        if (r < 0) throw new Error("ratio2 is a negative number");
        p.ratio2 = r;
    }
    getLanguage(p) {
        return p.language;
    }
    setLanguage(l) {
        if (!lib.isString(l)) throw new Error("Language must be a string");
        if (!CURRENT_SUPPORTED_TRANSLATIONS.includes(l)) throw new Error("language not supported");
        p.language = l;
    }
}