//glue code between html(view) and model
class Presenter {
    constructor(model) {
        if (!(model instanceof Screen)) {
            throw new Error("argument type:screen, not passed");
        }
        this.model = model;
        this._dom_ = {};
        this.setupDom();
        this.setupHandlers();
    }
    get dom() {
        return this._dom_;
    }
    //this indeed effectively ovverrides = operator
    //as it adds property intead of reassigning
    set dom(prop) {
        // let elem = q(`#${prop}`);
        let el = document.getElementById(prop);
        if (el === undefined || el === null) throw new Error("dom element not found");
        this._dom_[prop] = el;
    }
    setupDom() {
        const arr = ['Ratio1', 'Ratio2', 'Diagonal', 'Width', 'Height',
            'PixelsPerUnit', 'ResolutionWidth', 'ResolutionHeight', 'inches',
            'centi', 'milli', 'eng', 'geo', 'question'];
        for (const str of arr) this.dom = str;
    }
    setupHandlers() {
        this.setupElementFocusHandler('Ratio1', 'onRatio1Change');
        this.setupElementFocusHandler('Ratio2', 'onRatio2Change');

        this.setupElementFocusHandler('Width', 'onWidthChange');
        this.setupElementFocusHandler('Height', 'onHeightChange');

        this.setupElementFocusHandler('Diagonal', 'onDiagonalChange');

        this.setupElementFocusHandler('ResolutionWidth', 'onResolutionWidthChange');
        this.setupElementFocusHandler('ResolutionHeight', 'onResolutionHeightChange');

        this.setupElementFocusHandler('PixelsPerUnit', 'onPixelsPerUnitChange');

        this.dom.milli[on]('click', this.onUnitChange.bind(this, "Millimetres"));
        this.dom.centi[on]('click', this.onUnitChange.bind(this, "Centimetres"));
        this.dom.inches[on]('click', this.onUnitChange.bind(this, "Inches"));
        //
        this.dom.eng[on]('click', this.translate.bind(this, 'eng'));
        this.dom.geo[on]('click', this.translate.bind(this, 'geo'));

        //question mark
        this.dom.question[on]('click', this.onQuestionPopupAlert.bind(this));
    }
    setupElementFocusHandler(el, func) {
        if (!this.dom[el]) {
            throw new Error('arg1: el not found in dom');
        }
        if (!lib.isFunction(this[func])) {
            throw new Error('arg2 function needed, not passed');
        }
        this.dom[el][on]('focus', e => {
            this.dom[el][on]('change', this[func].bind(this))
        });
        this.dom[el][on]('focusout', e => {
            this.dom[el][un]('change', this[func].bind(this))
        });
    }
    display() {
        this.dom.Ratio1.value = lib.toPrecision(this.model.Ratio1, 2);
        this.dom.Ratio2.value = lib.toPrecision(this.model.Ratio2, 2);
        this.dom.Diagonal.value = lib.toPrecision(this.model.Diagonal, 2);
        this.dom.Width.value = lib.toPrecision(this.model.Width, 2);
        this.dom.Height.value = lib.toPrecision(this.model.Height, 2);

        this.dom.PixelsPerUnit.value = lib.toPrecision(this.model.PixelsPerUnit, 2);
        this.dom.ResolutionWidth.value = this.model.ResolutionWidth;
        this.dom.ResolutionHeight.value = this.model.ResolutionHeight;
    }
    onRatio1Change() {
        this.model.Ratio1 = Number(this.dom.Ratio1.value);
        let ratio = this.model.Ratio1 / this.model.Ratio2;
        this.model.Width = this.model.Height * ratio;
        this.model.ResolutionWidth = this.model.Width * this.model.PixelsPerUnit;
        this.model.ResolutionHeight = this.model.Height * this.model.PixelsPerUnit;
        this.display();
    }
    onRatio2Change() {
        this.model.Ratio2 = Number(this.dom.Ratio2.value);
        let ratio = this.model.Ratio1 / this.model.Ratio2;
        this.model.Width = this.model.Height * ratio;
        this.model.ResolutionWidth = this.model.Width * this.model.PixelsPerUnit;
        this.model.ResolutionHeight = this.model.Height * this.model.PixelsPerUnit;
        this.display();
    }
    onWidthChange() {
        this.model.Width = Number(this.dom.Width.value);
        let ratio = this.model.Width / this.model.Height;
        this.model.Ratio1 = ratio * this.model.Ratio2;
        this.model.ResolutionWidth = this.model.PixelsPerUnit * this.model.Width;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
    onHeightChange() {
        this.model.Height = Number(this.dom.Height.value);
        let ratio = this.model.Width / this.model.Height;
        this.model.Ratio2 = this.model.Ratio1 / ratio;
        this.model.ResolutionHeight = this.model.PixelsPerUnit * this.model.Height;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
    onDiagonalChange() {
        this.model.Diagonal = Number(this.dom.Diagonal.value);
        const ratio = this.model.Ratio1 / this.model.Ratio2;
        const rs = ratio * ratio;
        const ds = Math.pow(this.model.Diagonal, 2)
        this.model.Height = Math.sqrt(ds / (1 + rs));
        this.model.Width = this.model.Height * ratio;
        this.model.ResolutionWidth = this.model.PixelsPerUnit * this.model.Width;
        this.model.ResolutionHeight = this.model.PixelsPerUnit * this.model.Height;
        this.display();
    }
    onResolutionWidthChange() {
        this.model.ResolutionWidth = Number(this.dom.ResolutionWidth.value);
        this.model.Width = this.model.ResolutionWidth / this.model.PixelsPerUnit;
        let ratio = this.model.Width / this.model.Height;
        this.model.Ratio1 = ratio * this.model.Ratio2;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
    onResolutionHeightChange() {
        this.model.ResolutionHeight = Number(this.dom.ResolutionHeight.value);
        this.model.Height = this.model.ResolutionHeight / this.model.PixelsPerUnit;
        let ratio = this.model.Width / this.model.Height;
        this.model.Ratio2 = this.model.Ratio1 / ratio;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
    onPixelsPerUnitChange() {
        this.model.PixelsPerUnit = Number(this.dom.PixelsPerUnit.value)
        this.model.ResolutionWidth = this.model.PixelsPerUnit * this.model.Width;
        this.model.ResolutionHeight = this.model.PixelsPerUnit * this.model.Height;
        this.display();
    }
    onUnitChange(newUnit) {
        this.dom.centi.classList.remove('darkness');
        this.dom.milli.classList.remove('darkness');
        this.dom.inches.classList.remove('darkness');

        let f, func;//function, function name;
        const u1 = this.model.getUnit();
        const u2 = newUnit;

        func = `${u1}to${u2}`;
        f = convert[func];

        this.model.setWidth(f(this.model.getWidth()));
        this.model.setHeight(f(this.model.getHeight()));
        this.model.setDiagonal(f(this.model.getDiagonal()));
        this.model.setPixelsPerUnit(this.model.PixelsPerUnit() / f(1));

        switch (newUnit) {
            case "Centimetres":
                this.dom.centi.classList.add('darkness');
                this.dom.PixelsPerUnit.setAttribute('step', '0.01');
                break;
            case "Millimetres":
                this.dom.milli.classList.add('darkness');
                this.dom.PixelsPerUnit.setAttribute('step', '0.01');
                break;
            case "Inches":
                this.dom.inches.classList.add('darkness');
                this.dom.PixelsPerUnit.setAttribute('step', '1');
                break;

            default:
        }
        if (u2 === 'i') {
            this.model.PixelsPerUnit = lib.toPrecision(this.model.PixelsPerUnit, 0);
        }
        this.display();
    }

    onQuestionPopupAlert() {
        pop.alert(TRANSLATE_DATA['popup_text'][this.model.Language]);
    }
    translate(lang) {
        if (lang === 'geo') {
            this.dom.eng.classList.remove('darkness');
            this.dom.geo.classList.add('darkness');
        }
        if (lang === 'eng') {
            this.dom.geo.classList.remove('darkness');
            this.dom.eng.classList.add('darkness');
        }
        let translatables = qa('[data-app-translate="1"]');
        for (let i = 0, len = translatables.length; i < len; i++) {
            let text = translatables[i].getAttribute('data-app-text');
            translatables[i].textContent = TRANSLATE_DATA[text][lang];
        }
        this.model.Language = lang;
    }
}