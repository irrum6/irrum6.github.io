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

        let changeOnRatio1 = () => {
            this.model.Ratio1 = Number(this.dom.Ratio1.value);
            let ratio = this.model.Ratio1 / this.model.Ratio2;
            this.model.Width = this.model.Height * ratio;
            this.model.ResolutionWidth = this.model.ResolutionHeight * ratio;
            this.model.Diagonal = Math.sqrt(Math.pow(this.model.Width, 2) + Math.pow(this.model.Height, 2));
            this.display();
        }
        this.dom.Ratio1[on]('focus', e => {
            this.dom.Ratio1[on]('change', changeOnRatio1);
        });
        this.dom.Ratio1[on]('focusout', e => {
            this.dom.Ratio1[un]('change', changeOnRatio1);
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
}