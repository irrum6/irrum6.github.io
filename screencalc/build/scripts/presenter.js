const UNITS = ["Inches", "Centimetres", "Millimetres"];

class Presenter {
    constructor(w, h, ppu, u, l) {
        if (!lib.isNumber(w, h, ppu)) throw new Error('invalid type: not a number');
        if (!lib.isString(u, l)) throw new Error('invalids type:not a string');
        if (!UNITS.includes(u)) throw new Error('invalid  value, unit not supported');
        if (!CURRENT_SUPPORTED_TRANSLATIONS.includes(l)) throw new Error('invalid value, language not supported');
        let { ratio, diagonal } = Helper.calculateFromPhysDimensions(w, h);
        let ratio2 = 9;//ratio height
        let ratio1 = Math.round(ratio * 9); //ratio width
        let { rwidth, rheight } = Helper.getResolutions(w, h, ppu);
        this.state = { width: w, height: h, pixels: ppu, unit: u, language: l, rwidth, rheight, ratio, diagonal, ratio1, ratio2 };
        this.setupHandlers();
    }
    getState() {
        return this.state;
    }
    setState(o, v) {
        if (typeof o === "string") throw new Error("Presenter::setState- parameter not string");
        if (v === undefined || v === null || Number.isNaN(v) || typeof v === "object") {
            throw new Error("Presenter::setState - invalid value")
        }
        this.state[o] = v;
    }
    query(s) {
        return document.body.querySelector(s);
    }
    setupHandlers() {
        this.query("#darkify")[on]('click', (ev) => {
            this.onDarkChange(ev);
        });
        this.query("#question")[on]("click", (e) => {
            this.onQuestionPopupAlert();
        });
        this.query("#diagonal")[on]('ibchange', this.onDiagonalChange.bind(this));
        this.query("#aswidth")[on]('ibchange', this.onRatioChange.bind(this, "width"));
        this.query("#asheight")[on]('ibchange', this.onRatioChange.bind(this, "height"));
        this.query("#pwidth")[on]('ibchange', this.onPhysChange.bind(this, "width"));
        this.query("#pheight")[on]('ibchange', this.onPhysChange.bind(this, "height"));
        this.query("#rwidth")[on]('ibchange', this.onResolutionChange.bind(this, "width"));
        this.query("#rheight")[on]('ibchange', this.onResolutionChange.bind(this, "height"));
        this.query("#pixelsperunit")[on]('ibchange', this.onPixelsPerUnitChange.bind(this));
    }

    display() {
        this.query("#diagonal").setState({ value: this.state.diagonal });
        this.query("#aswidth").setState({ value: this.state.ratio1 });
        this.query("#asheight").setState({ value: this.state.ratio2 });
        this.query("#pwidth").setState({ value: this.state.width });
        this.query("#pheight").setState({ value: this.state.height });
        this.query("#rwidth").setState({ value: this.state.rwidth });
        this.query("#rheight").setState({ value: this.state.rheight });
        this.query("#pixelsperunit").setState({ value: this.state.pixels });
    }
    collectData() {
        let diagonal = q("#diagonal").getState();
        let ratio1 = q("#aswidth").getState();
        let ratio2 = q("#asheight").getState();
        let width = q("#pwidth").getState();
        let height = q("#pheight").getState();
        let rwidth = q("#rwidth").getState();
        let rheight = q("#rheight").getState();
        let pixels = q("#pixelsperunit").getState();
        return { diagonal, ratio1, ratio2, width, height, rwidth, rheight, pixels };
    }
    /**
     * casts all data to numbers
     * @param {Object} data
     * @return {Object} 
     */
    castDataToNumbers(data) {
        let o = {};
        for (let d in data) {
            o[d] = Number(data[d].value);
        }
        return o;
    }
    onDiagonalChange() {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        //disabled can't fire
        // debugger;
        //if physical width and height are disabled then diagonal can't grow
        if (dat.width.disabled || dat.height.disabled) {
            return;
        }
        let ratio = data.ratio1 / data.ratio2;
        let { width, height } = Helper.calculatefromDiagonal(data.diagonal, ratio);
        //see if resolution is disabled too
        if (dat.rwidth.disabled || dat.rheight.disabled) {
            
        }
        let { rwidth, rheight } = Helper.getResolutions(width, height, data.pixels);
        this.state = { ...data, width, height, rwidth, rheight };
        this.display();
    }
    onRatioChange(input) {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        //disabled can't fire
        //ignore phys w and h
        let ratio = data.ratio1 / data.ratio2;
        let { width, height } = Helper.calculatefromDiagonal(data.diagonal, ratio);
        let { rwidth, rheight } = Helper.getResolutions(width, height, data.pixels);
        this.state = { ...data, width, height, rwidth, rheight };
        this.display();
    }
    onPhysChange(input) {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        let { ratio, diagonal } = Helper.calculateFromPhysDimensions(data.width, data.height);
        let ratio2 = 9;
        let ratio1 = ratio * 9;
        let { rwidth, rheight } = Helper.getResolutions(data.width, data.height, data.pixels);
        this.state = { ...data, ratio, ratio1, ratio2, diagonal, rwidth, rheight };
        this.display();
    }
    onResolutionChange(input) {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        let { width, height, ratio, diagonal } = Helper.calculateFromResolutions(data.rwidth, data.rheight, data.pixels);

        if (dat.width.disabled || data.height.disabled) {
            //then only pixels can be changed
        }

        if (dat.diagonal.disabled) {
            //if diagonal disabled, it can't be changed   
        }

        let ratio2 = 9;
        let ratio1 = ratio * 9;


        this.state = { ...data, ratio, ratio1, ratio2, diagonal, width, height };
        this.display();
    }
    onPixelsPerUnitChange() {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        let { rwidth, rheight } = Helper.getResolutions(data.width, data.height, data.pixels);
        this.state = { ...data, rwidth, rheight };
        this.display();
    }
    onQuestionPopupAlert() {
        let msg = TRANSLATE_DATA['popup_text'][this.state.language]
        Pop.alert(msg);
    }
    onDarkChange(e) {
        e.target.classList.toggle('darkness');
        e.target.classList.toggle('border-light');
        document.body.classList.toggle('body-dark');
        q("#diagonal").setDark();
        q("#aswidth").setDark();
        q("#asheight").setDark();
        q("#pwidth").setDark();
        q("#pheight").setDark();
        q("#rwidth").setDark();
        q("#rheight").setDark();
        q("#pixelsperunit").setDark();
    }
    translate(lang) {
        // if (lang === 'geo') {
        //     // this.dom.eng.classList.remove('darkness');
        //     // this.dom.geo.classList.add('darkness');
        // }
        // if (lang === 'eng') {
        //     // this.dom.geo.classList.remove('darkness');
        //     // this.dom.eng.classList.add('darkness');
        // }
        // let translatables = qa('[data-app-translate="1"]');
        // for (let i = 0, len = translatables.length; i < len; i++) {
        //     let text = translatables[i].getAttribute('data-app-text');
        //     translatables[i].textContent = TRANSLATE_DATA[text][lang];
        // }
        // this.state.Language = lang;
    }
    drawRedrawCanvas() {
        let canvas = q('#display-canvas');
        let ratio = 1.78;
        let proportion = innerWidth > innerHeight ? 0.45 : 0.9;
        let w = Math.round(innerWidth * proportion);
        let h = w / ratio;
        canvas.width = w;
        canvas.height = h;
        let color = 'rgb(160,192,176)';
        canvas.style.backgroundColor = color;
        let state = this.getState();

        let wid = canvas.width;
        let hei = wid / state.ratio;
    }
}