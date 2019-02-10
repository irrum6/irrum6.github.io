//glue code between html(view) and model
class Presenter {
    constructor(model) {
        if (!(model instanceof Screen)) throw "model was not passed to presenter constructor";
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
        let elem = q(`#${prop}`);
        if (elem === undefined || elem === null) throw "dom element not found";
        this._dom_[prop] = elem;
    }
    setupDom() {
        const strArray = ['Ratio1', 'Ratio2', 'Diagonal', 'Width', 'Height',
            'PixelsPerUnit', 'ResolutionWidth', 'ResolutionHeight', 'inches',
            'centi', 'milli'];
        for (let str of strArray) this.dom = str;
    }
    setupHandlers() {
        this.dom.Ratio1[on]('focus', e => {
            this.dom.Ratio1[on]('change', this.onRatio1Change.bind(this));
        });
        this.dom.Ratio1[on]('focusout', e => {
            this.dom.Ratio1[un]('change', this.onRatio1Change.bind(this));
        });

        this.dom.Ratio2[on]('focus', e => {
            this.dom.Ratio2[on]('change', this.onRatio2Change.bind(this));
        });
        this.dom.Ratio2[on]('focusout', e => {
            this.dom.Ratio2[un]('change', this.onRatio2Change.bind(this));
        });

        this.dom.Width[on]('focus', e => {
            this.dom.Width[on]('change', this.onWidthChange.bind(this));
        });
        this.dom.Width[on]('focusout', e => {
            this.dom.Width[un]('change', this.onWidthChange.bind(this));
        });

        this.dom.Height[on]('focus', e => {
            this.dom.Height[on]('change', this.onHeightChange.bind(this));
        });
        this.dom.Height[on]('focusout', e => {
            this.dom.Height[un]('change', this.onHeightChange.bind(this));
        });

        this.dom.Diagonal[on]('focus', e => {
            this.dom.Diagonal[on]('change', this.onDiagonalChange.bind(this));
        });
        this.dom.Diagonal[on]('focusout', e => {
            this.dom.Diagonal[un]('change', this.onDiagonalChange.bind(this));
        });

        this.dom.ResolutionWidth[on]('focus', e => {
            this.dom.ResolutionWidth[on]('change', this.onResolutionWidthChange.bind(this));
        });
        this.dom.ResolutionWidth[on]('focusout', e => {
            this.dom.ResolutionWidth[un]('change', this.onResolutionWidthChange.bind(this));
        });

        this.dom.ResolutionHeight[on]('focus', e => {
            this.dom.ResolutionHeight[on]('change', this.onResolutionHeightChange.bind(this));
        });
        this.dom.ResolutionHeight[on]('focusout', e => {
            this.dom.ResolutionHeight[un]('change', this.onResolutionHeightChange.bind(this));
        });

        this.dom.PixelsPerUnit[on]('focus', e => {
            this.dom.PixelsPerUnit[on]('change', this.onPixelsPerUnitChange.bind(this));
        });
        this.dom.PixelsPerUnit[on]('focusout', e => {
            this.dom.PixelsPerUnit[un]('change', this.onPixelsPerUnitChange.bind(this));
        });

        this.dom.milli[on]('click', this.onUnitChangeMM.bind(this));
        this.dom.centi[on]('click', this.onUnitChangeCM.bind(this));
        this.dom.inches[on]('click', this.onUnitChangeIn.bind(this));
    }
    display() {
        this.dom.Ratio1.value = lib.toPrecision(this.model.Ratio1, 2);
        this.dom.Ratio2.value = lib.toPrecision(this.model.Ratio2, 2);
        this.dom.Diagonal.value = lib.toPrecision(this.model.Diagonal, 2);
        this.dom.Width.value = lib.toPrecision(this.model.Width, 2);
        this.dom.Height.value = lib.toPrecision(this.model.Height, 2);

        this.dom.PixelsPerUnit.value = this.model.PixelsPerUnit;
        this.dom.ResolutionWidth.value = this.model.ResolutionWidth;
        this.dom.ResolutionHeight.value = this.model.ResolutionHeight;
    }
    onRatio1Change() {
        this.model.Ratio1 = Number(this.dom.Ratio1.value);
        let ratio = this.model.Ratio1 / this.model.Ratio2;
        this.model.Width = this.model.Height * ratio;
        this.model.ResolutionWidth = this.model.ResolutionHeight * ratio;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
    onRatio2Change() {
        this.model.Ratio2 = Number(this.dom.Ratio2.value);
        let ratio = this.model.Ratio1 / this.model.Ratio2;
        this.model.Height = this.model.Width / ratio;
        this.model.ResolutionHeight = this.model.ResolutionWidth / ratio;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
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
        let ratio = this.model.Ratio1 / this.model.Ratio2;
        this.model.Height = Math.sqrt((Math.pow(this.model.Diagonal, 2) / (1 + (ratio * ratio))));
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
    onUnitChangeMM() {
        this.dom.inches.classList.remove('darkness');
        this.dom.centi.classList.remove('darkness');

        this.dom.milli.classList.remove('darkify');
        this.dom.milli.classList.add('darkness');

        let unit = this.model.Unit;
        this.model.Unit = "Millimetres";
        this.onUnitChange(unit);
    }
    onUnitChangeCM() {
        this.dom.inches.classList.remove('darkness');
        this.dom.milli.classList.remove('darkness');

        this.dom.centi.classList.remove('darkify');
        this.dom.centi.classList.add('darkness');

        let unit = this.model.Unit;
        this.model.Unit = "Centimetres";
        this.onUnitChange(unit);
    }
    onUnitChangeIn() {
        this.dom.centi.classList.remove('darkness');
        this.dom.milli.classList.remove('darkness');

        this.dom.inches.classList.remove('darkify');
        this.dom.inches.classList.add('darkness');

        let unit = this.model.Unit;
        this.model.Unit = "Inches";
        this.onUnitChange(unit);
    }
    onUnitChange(unitFrom) {
        let f;
        let fromto = `${unitFrom}:${this.model.Unit}`;
        switch (fromto) {
            case 'Inches:Millimetres':
                f = convert.itomm;
                break;
            case 'Inches:Centimetres':
                f = convert.itocm;
                break;
            case 'Centimetres:Inches':
                f = convert.cmtoi;
                break;
            case 'Centimetres:Millimetres':
                f = convert.cmtomm;
                break;
            case 'Millimetres:Inches':
                f = convert.mmtoi;
                break;
            case 'Millimetres:Centimetres':
                f = convert.mmtocm;
                break;
        }
        this.model.Width = f(this.model.Width);
        this.model.Height = f(this.model.Height);
        this.model.Diagonal = f(this.model.Diagonal);
        this.model.PixelsPerUnit = this.model.PixelsPerUnit / f(1);
        this.display();
    }
}