const convert = (function () {
    const UNITS = ['Inches', 'Centimetres', 'Millimetres']

    const all = (num, div) => {
        if (!lib.isNumber(num, div)) throw new Error("not a number");
        if (num < 0 || div < 0) throw new Error("negative numbers not allowed");
        return num / div;
    }
    const cmtoi = (cm) => all(cm, 2.54);
    const cmtomm = (cm) => all(cm, 0.1);
    const mmtoi = (mm) => all(mm, 25.4);
    const mmtocm = (mm) => all(mm, 10);
    const itocm = (i) => all(i, (1 / 2.54));
    const itomm = (i) => all(i, (1 / 25.4));

    const getUnitShort = (u) => {
        if (!UNITS.includes(u)) throw new Error("unsupported unit");
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

    let c = { cmtoi, cmtomm, mmtoi, mmtocm, itocm, itomm, getUnitShort };
    Object.freeze(c);
    return c;
}());