const UNITS = ["Inches", "Centimetres", "Millimetres"];
class Screen {
    constructor(w, h, ppu, u) {
        this.Width = w;
        this.Height = h;
        this.PixelsPerUnit = ppu;
        this.Ratio1 = (w / h) * 9;
        this.Ratio2 = 9;
        this.Diagonal = Math.sqrt(w * w + h * h);
        this.ResolutionWidth = Math.round(this.PixelsPerUnit * this.Width);
        this.ResolutionHeight = Math.round(this.PixelsPerUnit * this.Height);
        this.Unit = u;
    }
    get Width() {
        return this._width_;
    }
    set Width(w) {
        if (!lib.isNumber(w)) throw " width is not a number";
        if (w < 0) throw "width is a negative number";
        this._width_ = w;
    }
    get Height() {
        return this._height_;
    }
    set Height(h) {
        if (!lib.isNumber(h)) throw "height is not a number";
        if (h < 0) throw "height is a negative number";
        this._height_ = h;
    }
    get Diagonal() {
        return this._diagonal_;
    }
    set Diagonal(d) {
        if (!lib.isNumber(d)) throw "diagonal is not a number";
        if (d < 0) throw "diagonal is a negative number";
        this._diagonal_ = d;
    }
    get PixelsPerUnit() {
        return this._pixels_per_unit_;
    }
    set PixelsPerUnit(ppu) {
        if (!lib.isNumber(ppu)) throw "pixels_per_unit is not a number";
        if (ppu < 0) throw "pixels_per_unit is a negative number";
        this._pixels_per_unit_ = ppu;
    }
    get ResolutionWidth() {
        return this._res_width_;
    }
    set ResolutionWidth(w) {
        if (!lib.isNumber(w)) throw "resolution : width is not a number";
        if (w < 0) throw "resolution : width is a negative number";
        this._res_width_ = Math.round(w);
    }
    get ResolutionHeight() {
        return this._res_height_;
    }
    set ResolutionHeight(h) {
        if (!lib.isNumber(h)) throw "resolution : height is not a number";
        if (h < 0) throw "resolution :height is a negative number";
        this._res_height_ = Math.round(h);
    }
    get Unit() {
        return this._unit_;
    }
    set Unit(u) {
        if (!UNITS.includes(u)) throw "Incompatible unit";
        this._unit_ = u;
    }
    get Ratio1() {
        return this._ratio1_;
    }
    set Ratio1(r) {
        if (!lib.isNumber(r)) throw "ratio1 is not a number";
        if (r < 0) throw "ratio1 is a negative number";
        this._ratio1_ = r;
    }
    get Ratio2() {
        return this._ratio2_;
    }
    set Ratio2(r) {
        if (!lib.isNumber(r)) throw "ratio2 is not a number";
        if (r < 0) throw "ratio2 is a negative number";
        this._ratio2_ = r;
    }
}