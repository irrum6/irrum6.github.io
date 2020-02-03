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
    setupHandlers() {
        q("#darkify")[on]('click', (ev) => {
            this.onDarkChange(ev);
        });
        q("#question")[on]("click", (e) => {
            this.onQuestionPopupAlert();
        });
        q("#diagonal")[on]('ibchange', this.onDiagonalChange.bind(this));
        q("#aswidth")[on]('ibchange', this.onRatioWidthChange.bind(this));
        q("#asheight")[on]('ibchange', this.onRatioHeightChange.bind(this));
        q("#pwidth")[on]('ibchange', this.onPhysWidthChange.bind(this));
        q("#pheight")[on]('ibchange', this.onPhysHeightchange.bind(this));
        q("#rwidth")[on]('ibchange', this.onResolutionWidthChange.bind(this));
        q("#rheight")[on]('ibchange', this.onResolutionHeightChange.bind(this));
        q("#pixelsperunit")[on]('ibchange', this.onPixelsPerUnitChange.bind(this));
    }

    display() {
        q("#diagonal").setState({ value: this.state.diagonal });
        q("#aswidth").setState({ value: this.state.ratio1 });
        q("#asheight").setState({ value: this.state.ratio2 });
        q("#pwidth").setState({ value: this.state.width });
        q("#pheight").setState({ value: this.state.height });
        q("#rwidth").setState({ value: this.state.rwidth });
        q("#rheight").setState({ value: this.state.rheight });
        q("#pixelsperunit").setState({ value: this.state.pixels });
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
     * for testing purposes
     * @param {void}
     * @returns void
     */
    dummy() {
        console.log("gela");
    }
    /**
     * casts all data to numbers
     * @param {Object} data 
     */
    castDataToNumbers(data) {
        let o = {};
        for (let d in data) {
            o[d] = Number(data[d].value);
        }
        return o;
    }
    onDiagonalChange(e) {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        //disabled can't fire
        //ignore phys w and h
        let ratio = data.ratio1 / data.ratio2;
        let { width, height } = Helper.calculatefromDiagonal(data.diagonal, ratio);
        let { rwidth, rheight } = Helper.getResolutions(width, height, data.pixels);
        this.state = { ...data, width, height, rwidth, rheight };
        this.display();
        // this.state=()
        if (data.rwidth.disabled) { }
    }
    onRatioWidthChange() {
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
    onRatioHeightChange() {
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
    onPhysWidthChange() {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        let { ratio, diagonal } = Helper.calculateFromPhysDimensions(data.width, data.height);
        let ratio2 = 9;
        let ratio1 = ratio * 9;
        let { rwidth, rheight } = Helper.getResolutions(data.width, data.height, data.pixels);
        this.state = { ...data, ratio, ratio1, ratio2, diagonal, rwidth, rheight };
        this.display();
    }
    onPhysHeightchange() {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        let { ratio, diagonal } = Helper.calculateFromPhysDimensions(data.width, data.height);
        let ratio2 = 9;
        let ratio1 = ratio * 9;
        let { rwidth, rheight } = Helper.getResolutions(data.width, data.height, data.pixels);
        this.state = { ...data, ratio, ratio1, ratio2, diagonal, rwidth, rheight };
        this.display();
    }
    onResolutionWidthChange() {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        let { width, height, ratio, diagonal } = Helper.calculateFromResolutions(data.rwidth, data.rheight, data.pixels);
        let ratio2 = 9;
        let ratio1 = ratio * 9;
        this.state = { ...data, ratio, ratio1, ratio2, diagonal, width, height };
        this.display();
    }
    onResolutionHeightChange() {
        let dat = this.collectData();
        let data = this.castDataToNumbers(dat);
        let { width, height, ratio, diagonal } = Helper.calculateFromResolutions(data.rwidth, data.rheight, data.pixels);
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
        pop.alert(msg);
    }
    onDarkChange(e) {
        e.target.classList.toggle('darkness');
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