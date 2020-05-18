class Presenter {
    constructor(w, h, ppu, u, l) {
        if (!lib.isNumber(w, h, ppu)) throw new Error('invalid type: not a number');
        if (!lib.isString(u, l)) throw new Error('invalids type:not a string');
        if (!SUPPORTED_UNITS.includes(u)) throw new Error('invalid  value, unit not supported');
        if (!SUPPORTED_TRANSLATIONS.includes(l)) throw new Error('invalid value, language not supported');
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
        if (typeof o !== "string") throw new Error("Presenter::setState- parameter not string");
        if (v === undefined || v === null || Number.isNaN(v) || typeof v === "object") {
            throw new Error("Presenter::setState - invalid value")
        }
        this.state[o] = v;
    }
    query(s) {
        return document.body.querySelector(s);
    }
    queryAll(s) {
        return document.body.querySelectorAll(s);
    }
    setupHandlers() {
        const q = this.query.bind(this);
        q("#darkify")[on]('click', (ev) => {
            this.onDarkChange(ev);
        });
        q("#question")[on]("click", (e) => {
            this.onQuestionPopupAlert();
        });
        q("#lang")[on]("click", this.showLanguageChooser.bind(this));
        q("#unit")[on]("click", this.showUnitChooser.bind(this));

        q("#diagonal")[on]('ibchange', this.onDiagonalChange.bind(this));
        q("#aswidth")[on]('ibchange', this.onRatioChange.bind(this, "width"));
        q("#asheight")[on]('ibchange', this.onRatioChange.bind(this, "height"));
        q("#pwidth")[on]('ibchange', this.onPhysChange.bind(this, "width"));
        q("#pheight")[on]('ibchange', this.onPhysChange.bind(this, "height"));
        q("#rwidth")[on]('ibchange', this.onResolutionChange.bind(this, "rwidth"));
        q("#rheight")[on]('ibchange', this.onResolutionChange.bind(this, "rheight"));
        q("#pixelsperunit")[on]('ibchange', this.onPixelsPerUnitChange.bind(this));
    }

    display() {
        const q = this.query.bind(this);
        const { diagonal, ratio1, ratio2, width, height, rwidth, rheight, pixels } = this.getState();
        q("#diagonal").setState({ value: diagonal });
        q("#aswidth").setState({ value: ratio1 });
        q("#asheight").setState({ value: ratio2 });
        q("#pwidth").setState({ value: width });
        q("#pheight").setState({ value: height });
        q("#rwidth").setState({ value: rwidth });
        q("#rheight").setState({ value: rheight });
        q("#pixelsperunit").setState({ value: pixels });
    }
    collectData() {
        const q = this.query.bind(this);
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

    onDiagonalChange() {
        let dat = this.collectData();
        let data = Helper.castDataToNumbers(dat);
        //debugger;
        //if physical width and height are disabled then return
        if (dat.width.disabled || dat.height.disabled) {
            this.inform("unblock_phys");
            return;
        }
        let ratio = data.ratio1 / data.ratio2;
        let { width, height } = Helper.calculatefromDiagonal(data.diagonal, ratio);
        //see if resolution is disabled too
        if (dat.rwidth.disabled || dat.rheight.disabled) {
            if (dat.pixels.disabled) {
                this.inform("unblock_pixels");
                return;
            }
            let pixels = Helper.getPixelsPerUnit(data.rwidth, width);
            this.state = { ...data, width, height, pixels };
            this.display();
            return;
        }
        let { rwidth, rheight } = Helper.getResolutions(width, height, data.pixels);
        this.state = { ...data, width, height, rwidth, rheight };
        this.display();
    }
    onRatioChange(input) {
        let dat = this.collectData();
        let data = Helper.castDataToNumbers(dat);
        //disabled can't fire
        let ratio = data.ratio1 / data.ratio2;
        if (dat.width.disabled || dat.height.disabled) {
            this.inform("unblock_phys")
            return;
        }
        var { width, height } = data;
        if (dat.diagonal.disabled) {
            let { width, height } = Helper.calculatefromDiagonal(data.diagonal, ratio);
            if (dat.rwidth.disabled || dat.rheight.disabled) {
                let pixels = Helper.getPixelsPerUnit(data.rwidth, width);
                this.state = { ...data, width, height, pixels };
                this.display();
                return;
            }
            let { rwidth, rheight } = Helper.getResolutions(width, height, data.pixels);
            this.state = { ...data, width, height, rwidth, rheight };
            this.display();
            return;
        }

        let diagonal = Helper.calculateFromPhysDimensions(width, height);

        if (dat.rwidth.disabled || dat.rheight.disabled) {
            let pixels = Helper.getPixelsPerUnit(data.rwidth, width);
            this.state = { ...data, width, height, pixels, diagonal };
            this.display();
            return;
        }
        let { rwidth, rheight } = Helper.getResolutions(width, height, data.pixels);
        this.sate = { ...data, width, height, rwidth, rheight, diagonal };
        this.display();
    }
    onPhysChange(input) {
        let dat = this.collectData();
        let data = Helper.castDataToNumbers(dat);
        if (dat.diagonal.disabled) {
            this.inform("unblock_diag");
            return;
        }
        if (dat.width.disabled || dat.height.disabled) {
            this.inform("unblock_phys")
            return;
        }
        if (dat.ratio1.disabled || dat.ratio2.disabled) {
            this.inform("unblock_ratio");
            return;
        }
        let { ratio, diagonal } = Helper.calculateFromPhysDimensions(data.width, data.height);
        let ratio2 = 9;
        let ratio1 = ratio * 9;
        if (dat.rwidth.disabled || dat.rheight.disabled) {
            if (dat.pixels.disabled) {
                this.inform("unblock_pixels");
                return;
            }
            let pixels = Helper.getPixelsPerUnit(data.rwidth, data.width);
            this.state = { ...data, pixels };
            this.display();
            return;
        }
        let { rwidth, rheight } = Helper.getResolutions(data.width, data.height, data.pixels);
        this.state = { ...data, ratio, ratio1, ratio2, diagonal, rwidth, rheight };
        this.display();
    }
    onResolutionChange(input) {
        let dat = this.collectData();
        let data = Helper.castDataToNumbers(dat);
        //if diagonal disabled, it can't be changed   
        //then width and height will be inadequate
        //so it's the same then
        if (dat.width.disabled || data.height.disabled || dat.diagonal.disabled) {
            //then only pixels can be changed
            if (dat.pixels.disabled) {
                return;//darn it;
            }
            let pixels = Helper.getPixelsPerUnit(data.rwidth, data.width);
            if (input === "rheight") {
                pixels = Helper.getPixelsPerUnit(data.rheight, data.height);
            }
            let { rwidth, rheight } = Helper.getResolutions(data.width, data.height, pixels);
            if (!dat.rwidth.disabled) {
                this.setState("rwidth", rwidth);
            }
            if (!dat.rheight.disabled) {
                this.setState("rheight", rheight);
            }
            this.setState("pixels", pixels);
            this.display();
            return;
        }

        let { width, height, ratio, diagonal } = Helper.calculateFromResolutions(data.rwidth, data.rheight, data.pixels);

        let ratio2 = 9;
        let ratio1 = ratio * 9;

        if (dat.ratio1.disabled && dat.ratio2.disabled) {
            this.inform("unblock_ratio");
            return;
        }

        if (dat.ratio2.disabled) {
            let ratio1 = ratio2 * data.ratio2;
            this.state = { ...data, ratio, ratio1, diagonal, width, height };
            this.display();
            return;
        }
        if (dat.ratio1.disabled) {
            let ratio2 = data.ratio1 / ratio;
            this.state = { ...data, ratio, ratio2, diagonal, width, height };
            this.display();
            return;
        }

        this.state = { ...data, ratio, ratio1, ratio2, diagonal, width, height };
        this.display();
    }
    onPixelsPerUnitChange() {
        let dat = this.collectData();
        let data = Helper.castDataToNumbers(dat);
        let { rwidth, rheight } = Helper.getResolutions(data.width, data.height, data.pixels);
        if (dat.rwidth.disabled || dat.rheight.disabled) {
            this.inform("unblock_res");
            return;
        }
        this.state = { ...data, rwidth, rheight };
        this.display();
    }
    onQuestionPopupAlert() {
        const { language } = this.state;
        //debugger;
        const translation = Translator.getTranslation("popup_text", language);
        if (typeof translation === "string" && translation !== "") {
            Pop.alert(translation, "Ok");
        }
    }
    onDarkChange(e) {
        e.target.classList.toggle('darkness');
        e.target.classList.toggle('border-light');
        document.body.classList.toggle('body-dark');
        //search for every element with significance i.e ID
        let elements = this.queryAll("input-box , pop-alert, pop-menu");
        for (const el of elements) {
            if (el.id !== undefined) {
                el.setDark();
            }
        }
    }
    showLanguageChooser() {
        const languages = SUPPORTED_TRANSLATIONS.map(e => {
            return {
                display: Translator.getTranslation("languages", e),
                attrValue: e
            }
        });
        const fun = (e) => {
            const lang = e.target.getAttribute("data-lang");
            this.setState("language", lang);
            this.translate();
        }
        PopperMenu.open(languages, "data-lang", fun);
    }
    translate() {
        const { language } = this.getState();
        let translatables = this.queryAll('[data-app-translate="1"]');
        for (let i = 0, len = translatables.length; i < len; i++) {
            let text = translatables[i].getAttribute('data-app-text');
            let translation = Translator.getTranslation(text, language);
            translatables[i].textContent = translation;
        }
        let inputs = this.queryAll('input-box');
        for (let i = 0, len = inputs.length; i < len; i++) {
            inputs[i].translateLabel(language);
        }
    }
    showUnitChooser() {
        const { language } = this.getState();
        const units = SUPPORTED_UNITS.map(e => {
            return {
                display: Translator.getTranslation(e, language),
                attrValue: e
            }
        });
        const fun = (e) => {
            const oldUnit = this.getState().unit;
            const unit = e.target.getAttribute("data-unit");
            q("#unit").textContent = e.target.textContent;
            this.setState("unit", unit);
            this.convertValues(oldUnit);
        }
        PopperMenu.open(units, "data-unit", fun);
    }
    convertValues(oldUnit) {
        let state = this.getState();
        const { unit } = state;

        const oldShort = Convert.getUnitShort(oldUnit);
        const newShort = Convert.getUnitShort(unit);

        const fun = `${oldShort}to${newShort}`;

        let { width, height, pixels } = state;

        width = Convert[fun](width);
        height = Convert[fun](height);
        pixels = pixels / Convert[fun](1);

        this.setState("width", width);
        this.setState("height", height);
        this.setState("pixels", pixels);

        this.display();
    }
    inform(text) {
        const { language } = this.state;
        //debugger;
        const translation = Translator.getTranslation(text, language);
        if (typeof translation === "string" && translation !== "") {
            Pop.alert(translation, "Ok");
        }
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