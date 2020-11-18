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
    q('#results').style.display = 'grid';
    q('#calcform').style.display = 'none';
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
q('#returner')[on]('click',()=>{
    q('#results').style.display = 'none';
    q('#calcform').style.display = 'grid';
})

//translation
const SUPPORTED_LOCALES = ['eng', 'geo'];

const translateData = {
    "diag": {
        "eng": "Diagonal(inches)-",
        "geo": "დიაგონალი(დუიმებში)-"
    },
    "resw": {
        "eng": "Resolution:Width-",
        "geo": "გაფართოება:სიგანე-"
    },
    "resh": {
        "eng": "Resolution:Height-",
        "geo": "გაფართოება:სიმაღლე-"
    },
    "diagmm": {
        "eng": "Size of Diagonal(Millimetres)-",
        "geo": "დიაგონალის ზომა (მილიმეტრებში)-"
    },
    "widthp": {
        "eng": "Width (pixels):",
        "geo": "სიგანე(პიქსელებში):"
    },
    "heightp": {
        "eng": "Height (pixels):",
        "geo": "სიმაღლე(პიქსელებში):"
    },
    "widthmm": {
        "eng": "Width(Millimetres)-",
        "geo": "სიგანე(მილიმეტრებში)-"
    },
    "heightmm": {
        "eng": "Height(Millimetres)-",
        "geo": "სიმაღლე(მილიმეტრებში)-"
    },
    "widthin": {
        "eng": "Width(Icnhes)-",
        "geo": "სიგანე(დუიმებში)-"
    },
    "heightin": {
        "eng": "Height(Icnhes)-",
        "geo": "სიმაღლე(დუიმებში)-"
    },
    "ppmm": {
        "eng": "Pixels per Unit(Millimetres)-",
        "geo": "პიქსელები ერთეულზე(მილიმეტრი)-"
    },
    "ppi": {
        "eng": "Pixels per Unit(Icnhes)-",
        "geo": "პიქსელები ერთეულზე(დუიმი)-"
    },
    "ratio": {
        "eng": "Aspect Ratio-",
        "geo": "შეფარდება"
    },
    "ration": {
        "eng": "Aspect Ratio (nornmalized in /9 notation)-",
        "geo": "შეფარდება (/9 ფორმატში)-"
    },
    "areamm": {
        "eng": "Screen Area(Square Millimetres)",
        "geo": "ეკრანის ფართობი(კვადრატულ მილიმეტრებში)"
    },
    "areain": {
        "eng": "Screen Area(Square Icnhes)",
        "geo": "ეკრანის ფართობი(კვადრატულ დუიმებში)"
    },
    "input": {
        "eng": "Input data:",
        "geo": "შეყვანილი მონაცემები:"
    },
    "resolution": {
        "eng": "Resolution:",
        "geo": "გაფართოება:"
    },
    "calculate": {
        "eng": "Calculate",
        "geo": "გამოთვლა"
    },
    "calculated": {
        "eng": "Calculated data:",
        "geo": "გამოთვლილი მონაცემები:"
    },
    "mm": {
        "eng": "mm",
        "geo": "მმ"
    },
    "in": {
        "eng": "In",
        "geo": "დმ"
    },
    "return_to_form":{
        "eng": "Return to form",
        "geo": "ფორმაზე გადასვლა"
    }
}

function translate(lang) {
    if (!lib.isString(lang)) {
        const ex = TypeException('string', typeof lang)
        throw new Error(ex);
    }
    lang = lang.toLowerCase();
    if (!SUPPORTED_LOCALES.includes(lang)) throw new Error("Unsupported locale");
    const translates = qa('[data-app-translate=enabled]');
    for (let i = 0, len = translates.length; i < len; i++) {
        const text = translates[i].getAttribute('data-app-text');
        translates[i].textContent = translateData[text][lang];
    }
}

q('#eng')[on]('click', (e) => {
    translate('eng');
});
q('#geo')[on]('click', (e) => {
    translate('geo');
});

/**
 * use template to create display node
 * @param string
 * @param string
 * @param string
 * @returns void
 * @adds HTMLElement
 */
function createDisplayNode(text, valuetext, lang) {
    let t = document.createElement('template');
    if ('content' in t) {
        let template = q('#displayT');
        let clone = document.importNode(template.content, true);
        let p = clone.children[0];
        p.children[0].setAttribute('data-app-text', text);
        p.children[1].setAttribute('data-app-value', valuetext);
        p.children[0].textContent = translateData[text][lang];
        let res = q('#results');
        let ret = res.children[res.children.length-1]
        res.insertBefore(clone,ret);
    }
}

let currentLocale = 'eng';

let displaybars = ["diagmm", "widthmm", "widthin", "heightmm", "heightin", "ppmm", "ppi", "ratio", "ration", "areamm", "areain"]

for (const dbar of displaybars) {
    createDisplayNode(dbar, dbar, currentLocale);
}