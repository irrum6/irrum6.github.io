const SUPPORTED_UNITS = ["Inches", "Centimetres", "Millimetres"];

class Convert {
    static all(num, div) {
        if (!lib.isNumber(num, div)) throw new Error("not a number");
        if (num < 0 || div < 0) throw new Error("negative numbers not allowed");
        return num / div;
    }
    static getUnitShort(u) {
        //const UNITS = ['Inches', 'Centimetres', 'Millimetres'];
        if (!SUPPORTED_UNITS.includes(u)) throw new Error("unsupported unit");
        let us;
        switch (u) {
            case 'Inches':
                us = "i";
                break;
            case 'Centimetres':
                us = "cm";
                break;
            case 'Millimetres':
                us = "mm";
                break;
        }
        return us;
    }
    static cmtoi(cm) { return this.all(cm, 2.54); }
    static cmtomm(cm) { return this.all(cm, 0.1); }
    static mmtoi(mm) { return this.all(mm, 25.4); }
    static mmtocm(mm) { return this.all(mm, 10); }
    static itocm(i) { return this.all(i, (1 / 2.54)); }
    static itomm(i) { return this.all(i, (1 / 25.4)); }
}
Object.freeze(SUPPORTED_UNITS);
Object.freeze(Convert);