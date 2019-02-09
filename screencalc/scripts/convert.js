const convert = (function () {
    function all(num, div) {
        if (!lib.isNumber(num, div)) throw "not a number";
        if (num < 0 || div < 0) throw "negative numbers not allowd";
        return num / div;
    }
    class Convert {
        //centimeter to inch
        cmtoi(cm) {
            return all(cm, 2.54);
        }
        cmtomm(cm) {
            return all(cm, 0.1);
        }
        //millimeter to inch
        mmtoi(mm) {
            return all(mm, 25.4);
        }
        //millimeter to inch
        mmtocm(mm) {
            return all(mm, 10);
        }
        itocm(i) {
            return all(i, (1 / 2.54));
        }
        itomm(i) {
            return all(i, (1 / 25.4));
        }
    }
    let c = new Convert();
    Object.freeze(c);
    return c;
}());