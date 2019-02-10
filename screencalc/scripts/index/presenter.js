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
            this.dom.Ratio1[on]('change', this.changeOnRatio1.bind(this));
        });
        this.dom.Ratio1[on]('focusout', e => {
            this.dom.Ratio1[un]('change', this.changeOnRatio1.bind(this));
        });

        this.dom.Ratio2[on]('focus', e => {
            this.dom.Ratio2[on]('change', this.changeOnRatio2.bind(this));
        });
        this.dom.Ratio2[on]('focusout', e => {
            this.dom.Ratio2[un]('change', this.changeOnRatio2.bind(this));
        });

        this.dom.Width[on]('focus', e => {
            this.dom.Width[on]('change', this.changeOnWidth.bind(this));
        });
        this.dom.Width[on]('focusout', e => {
            this.dom.Width[un]('change', this.changeOnWidth.bind(this));
        });
        this.dom.Height[on]('focus', e => {
            this.dom.Height[on]('change', this.changeOnHeight.bind(this));
        });
        this.dom.Height[on]('focusout', e => {
            this.dom.Height[un]('change', this.changeOnHeight.bind(this));
        });
    }
    display() {
        this.dom.Ratio1.value = lib.toPrecision(this.model.Ratio1, 1);
        this.dom.Ratio2.value = lib.toPrecision(this.model.Ratio2, 1);
        this.dom.Diagonal.value = lib.toPrecision(this.model.Diagonal, 1);
        this.dom.Width.value = lib.toPrecision(this.model.Width, 1);
        this.dom.Height.value = lib.toPrecision(this.model.Height, 1);

        this.dom.PixelsPerUnit.value = this.model.PixelsPerUnit;
        this.dom.ResolutionWidth.value = this.model.ResolutionWidth;
        this.dom.ResolutionHeight.value = this.model.ResolutionHeight;
    }
    changeOnRatio1() {
        this.model.Ratio1 = Number(this.dom.Ratio1.value);
        let ratio = this.model.Ratio1 / this.model.Ratio2;
        this.model.Width = this.model.Height * ratio;
        this.model.ResolutionWidth = this.model.ResolutionHeight * ratio;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
    changeOnRatio2() {
        this.model.Ratio2 = Number(this.dom.Ratio2.value);
        let ratio = this.model.Ratio1 / this.model.Ratio2;
        this.model.Height = this.model.Width / ratio;
        this.model.ResolutionHeight = this.model.ResolutionWidth / ratio;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
    changeOnWidth() {
        this.model.Width = Number(this.dom.Width.value);
        let ratio = this.model.Width / this.model.Height;
        this.model.Ratio1 = ratio * this.model.Ratio2;
        this.model.ResolutionWidth = this.model.PixelsPerUnit * this.model.Width;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
    changeOnHeight() {
        this.model.Height = Number(this.dom.Height.value);
        let ratio = this.model.Width / this.model.Height;
        this.model.Ratio2 = this.model.Ratio1 / ratio;
        this.model.ResolutionHeight = this.model.PixelsPerUnit * this.model.Height;
        this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
        this.display();
    }
}