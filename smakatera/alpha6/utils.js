const on = "addEventListener";
const query = (s)=>document.body.querySelector(s);
const all = (s)=>document.body.querySelectorAll(s);

const distance = (x1,y1,x2,y2) => Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

class Utils {
    static IsWholeNumber(z) {
        return Number.isInteger(z) && z > -1;
    }
}
Object.freeze(Utils);