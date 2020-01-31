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
    onDiagonalChange(e) {
        let data = this.collectData();
        //disabled can't fire
        //ignore phys w and h
        //damn cast
        let diagonal = Number(data.diagonal.value);
        let ratio1 = Number(data.ratio1.value);
        let ratio2 = Number(data.ratio2.value);
        let ratio = ratio1 / ratio2;
        let pixels = Number(data.pixels.value);
        let { width, height } = Helper.calculatefromDiagonal(diagonal, ratio);
        let { rwidth, rheight } = Helper.getResolutions(width, height, pixels);
        this.state = { diagonal, ratio1, ratio2, width, height, rwidth, rheight, pixels };
        this.display();
        // this.state=()
        if (data.rwidth.disabled) { }
    }
    onRatioWidthChange() {

    }
    onRatioHeightChange() {

    }
    onPhysWidthChange() {

    }
    onPhysHeightchange() {

    }
    onResolutionWidthChange() {

    }
    onResolutionHeightChange() {

    }
    onPixelsPerUnitChange() {

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