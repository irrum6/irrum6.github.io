function TypeException(type1, type2) {
    if (!lib.isString(type1, type2)) return "";
    return `not valid type: ${type1} expected, ${type2} received `
}
//value control
function doValueControl(target, control, step) {
    const t = q(`#${target}`);
    let v = Number(t.value);
    let s = Number(t.step);
    if (Number.isNaN(v)) v = 0;
    if (Number.isNaN(s)) s = 0;
    switch (control) {
        case "plus":
            v += s;
            break;
        case "minus":
            v -= s;
            break;
        default:
    }
    t.value = v;
}

function valueControl(target, control) {
    if (!lib.isString(target)) {
        const ex = TypeException('string', typeof target)
        throw new Error(ex);
    }
    if (!lib.isString(control)) {
        const ex = TypeException('string', typeof control)
        throw new Error(ex);
    }
    if (control === "") throw new Error("empty string");
    doValueControl(target, control);
}

function appValueControl(e) {
    const t = e.target;
    const t2 = t.getAttribute('data-app-target');
    const c = t.getAttribute('data-app-role');
    valueControl(t2, c);
}

const appButtons = qa('button[data-app-behavior=value-control]');

for (let i = 0, len = appButtons.length; i < len; i++) {
    appButtons[i][on]('click', appValueControl);
}

//calculation
// const calculator = {
//     diag: 0,
//     resw: 0,
//     resh: 0,
//     diagmm: 0,
//     widthmm: 0,
//     heightmm: 0,
//     widthin: 0,
//     heightin: 0,
//     ppmm: 0,
//     ppi: 0,
//     ratio: 0,
//     ration: "",
//     areamm: 0,
//     areain: 0,
// }
function displayResults(calculator) {
    if (typeof calculator !== 'object') {
        const ex = TypeException('object', typeof calculator);
        throw new Error(ex);
    }
    const displays = qa('[data-app-behavior=value-display]');
    for (let i = 0, len = displays.length; i < len; i++) {
        let dav = displays[i].getAttribute('data-app-value');
        displays[i].textContent = lib.toPrecision(calculator[dav], 2);
    }
    q('#results').style.visibility = 'visible';
}
function doCalculation() {
    const diag = lib.float(val('#input_diagonal'));
    const resw = lib.int(val('#input_width'));
    const resh = lib.int(val('#input_height'));
    const diagmm = diag * 25.4;
    const ratio = resw / resh;
    const ration = ratio * 9;
    const ds = diagmm * diagmm;
    const rs = ratio * ratio;
    const heightmm = Math.sqrt(ds / (rs + 1));
    const widthmm = heightmm * ratio;
    const heightin = heightmm / 25.4;
    const widthin = widthmm / 25.4;
    const ppmm = resw / widthmm;
    const ppi = resw / widthin;
    const areamm = widthmm * heightmm;
    const areain = widthin * heightin;

    const calc = {
        diag, resw, resh, diagmm, ratio, ration, widthmm, heightmm,
        widthin, heightin, ppmm, ppi, areamm, areain
    };
    displayResults(calc);

}
q('#doCalculation')[on]('click', doCalculation);

//translation
const SUPPORTED_LOCALES = ['eng', 'geo'];

const translateData = {

}

function translate(lang) {
    if (!lib.isString(lang)) {
        const ex = TypeException('string', typeof lang)
        throw new Error(ex);
    }
    lang = lang.toLowerCase();
    if (!SUPPORTED_LOCALES.includes(lang)) throw new Error("Unsupported locale");
}

q('#eng')[on]('click', (e) => {
    translate('eng');
});
q('#geo')[on]('click', (e) => {
    translate('geo');
});