{
    let template = document.createElement('template');
    template.id = "small_display";
    //define style
    // t
    let style = `
    <style>
        .display {
            font-size: 2.0rem;
            font-weight: bold;
            margin-right: 8px;
            padding: 3px;
            visibility:visible;
        }
        .display>span {
            border: none;
            padding:0;
        }
    </style>
    `;
    // define content
    let content = `
        <span class="display">
            <span class="text">Score</span>
            <span>:</span> 
            <span class="value">999</span>
        </span>
    `;
    template.innerHTML = `${style}${content}`;
    document.body.appendChild(template);
}
class SmallDisplay extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("small_display");
        let templateContent = template.content;
        let clone = templateContent.cloneNode(true);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(clone);
        this.processParameters();
        this.setDecorations();
    }
    static defineStyle() { }

    processParameters() {
        let elem = this.shadowRoot.querySelector(".value");
        if (null === elem) {
            SmallDisplay.PutContent();
            // return;
            elem = this.shadowRoot.querySelector(".value");
        }
        //dtext="Score"
        //dvalue="999"
        let text = this.getAttribute("dtext");
        let value = this.getAttribute("dvalue");
        this.updateValue(value);
        this.updateText(text);
    }

    /**
     * @param {string} _text 
     * @returns {boolean}
     */
    updateValue(_text) {
        if (!Utils.isFullString(_text)) {
            return false;
        }
        let elem = this.shadowRoot.querySelector(".value");
        elem.textContent = _text;
    }

    /**
     * @param {string} _text 
     * @returns {boolean}
     */
    updateText(_text) {
        if (!Utils.isFullString(_text)) {
            return false;
        }
        let elem = this.shadowRoot.querySelector(".text");
        elem.textContent = _text;
        return true;
    }

    setDecorations() {
        let color = this.getAttribute("dcolor");
        let elem = this.shadowRoot.querySelector(".display");
        elem.style.borderRight = `1px solid ${color}`;
        elem.style.borderBottom = `2px solid ${color}`;

        let boxShadow = `1px 1px ${color},2px 2px ${color},3px 3px ${color},4px 4px ${color},5px 5px ${color},6px 6px ${color}`;
        // box-shadow: 1px 1px #357, 2px 2px #357, 3px 3px #357, 4px 4px #357, 5px 5px #357, 6px 6px #357;
        //     border-right: 1px solid #357;
        //     border-bottom: 2px solid #357;
        elem.style.boxShadow = boxShadow;

        let hide = this.getAttribute("hide");
        console.log("1" === hide, this.id);
        if ("1" === hide) {
            this.hide();
        }
    }
    get isHidden() {
        let elem = this.shadowRoot.querySelector(".display");
        return elem.style.visibility == "hidden";
    }

    hide() {
        this.style.visibility = "hidden";
        let elem = this.shadowRoot.querySelector(".display");
        elem.style.visibility = "hidden";
    }
    show() {
        this.style.visibility = "visible";
        let elem = this.shadowRoot.querySelector(".display");
        elem.style.visibility = "visible";
    }
    nonForcedShow() {
        if (!this.isHidden) {
            return;
        }
        this.show();
    }
}

Object.freeze(SmallDisplay);
customElements.define("small-display", SmallDisplay);{
    let template = document.getElementById("pop_alert_template");
    template.innerHTML = `
    <style>
        /* pop-alert */
        div.pop-container {
            padding: 0.5rem;
            position: absolute;
            top: 40vh;
            left: 40vw;
            width: 20vw;
            display: flex;
            flex-direction: column;
            border: 0.25rem solid #606060;
            background-color: #c0c060;
            z-index: 9;
        }

        div.button-box {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        @media screen and (max-aspect-ratio:1/1) {
            div.pop-container {
                position: absolute;
                top: 20vh;
                left: 5vw;
                width: 80vw;
                z-index: 9;
            }
        }

        /*dark*/
        div.pop-container.dark {
            border: 0.25rem solid #c0c060;
            background-color: #606060;
            color: #c0c060;
            }
    </style>
    <div class="pop-container">
        <div class="text-content">
            <!-- text here -->
        </div>
            <div class="button-box">
            <span><button name="ok">OK</button></span>
        </div>
    </div>`;
}
class PopAlert extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("pop_alert_template");
        let templateContent = template.content;
        let clone = templateContent.cloneNode(true);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(clone);
    }
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    open(text, okText) {
        if (typeof text !== 'string') throw "text must be string";
        this.query('div.text-content').textContent = text;
        if (typeof okText !== "string") throw "text must be string";
        this.query('button[name=ok]').textContent = okText;
        this.style.display = 'flex';
        this.query('button').addEventListener('click', (e) => {
            this.close()
        });
    }
    close() {
        this.style.display = 'none';
    }
    setDark() {
        const cont = this.query('div.pop-container');
        cont.classList.toggle('dark');
    }
    static OPEN(text, okText) {
        const pop = document.body.querySelector('pop-alert');
        if (pop == null) {
            let _pop = document.createElement('pop-alert');
            document.body.appendChild(_pop);
            let __pop = document.body.querySelector('pop-alert');
            __pop.open(text, okText);
            return;
        }
        pop.open(text, okText);
    }
}
Object.freeze(PopAlert);
customElements.define('pop-alert', PopAlert);class NewGameDialog extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("newgame_dialog_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/newdialog.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
    }
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    setup(game) {
        if (this.gamesetup === true) {
            return;
        }
        this.query('button.closer')[on]('click', (e) => {
            this.close(game);
        });
        this.query('button.starter')[on]('click', this.startNewGame.bind(this, game), { once: false });
        this.query('input[name=move_over]')[on]('click', this.toggleRollOverState.bind(this), { once: false });
        this.gamesetup = true;
    }
    toggleRollOverState() {
        const moveOver = this.query('input[name=move_over]').checked;
        const overBody = this.query('input[name=move_over_body]');
        if (moveOver) {
            overBody.disabled = false;
            return;
        }
        overBody.disabled = true;
    }
    startNewGame(game, e) {
        const freeBound = this.query('input[name=free_bound]').checked;
        const moveOver = this.query('input[name=move_over]').checked;
        const moveOverBody = this.query('input[name=move_over_body]').checked;
        const quickSwitch = this.query('input[name=quickswitch]').checked;

        const mode = this.query('radio-box.moder').GetValue();
        const level = this.query('radio-box.leveler').GetValue();

        const n = this.query('radio-box.player').GetValue();
        this.close();
        const s = { freeBound, moveOver, moveOverBody, quickSwitch, mode, level }
        game.NewGame(n, s);
        game.GetFrame();
        if (n > 1) {
            game.DisplayMultiControls();
        }
    }
    open(game) {
        if (game === null || game === undefined) {
            throw "game not passed";
        }
        this.query(".dialog").style.visibility = 'visible';
        this.setup(game);
    }
    close() {
        this.query(".dialog").style.visibility = 'hidden';
    }
    get isOpen() {
        return this.query(".dialog").style.visibility === 'visible';
    }
    setDark() {
        document.body.classList.toggle('dark');
    }
    /**
     * @param {Game} game 
     * @param {boolean} close 
     * @returns 
     */
    static OpenClose(game, close) {
        let pop = document.querySelector("new-dialog");
        if (pop.isOpen) {
            pop.close(game);
            return;
        }
        if (true === close) {
            pop.close(game);
            return;
        }
        pop.open(game);
    }
}

customElements.define("new-dialog", NewGameDialog);
Object.freeze(NewGameDialog);class SettingsDialog extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("dialog_for_settings");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/dialog.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
    }
    //fps count way
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    open(game) {
        if (game === null || game === undefined) {
            throw "game not passed";
        }
        game.Pause();
        this.query(".dialog").style.visibility = 'visible';
        this.setup(game);
        this.SetupValues(game);
    }
    setup(game) {
        if (this.gamesetup === true) {
            return;
        }
        this.query("button.advanced").addEventListener("click", (e) => {
            this.query("div.settings.basic").style.display = 'none';
            this.query("div.settings.advanced").style.display = 'block';
            this.query("button.basic").classList.remove('active');
            this.query("button.advanced").classList.add('active');
        });
        this.query("button.basic").addEventListener("click", (e) => {
            this.query("div.settings.advanced").style.display = 'none';
            this.query("div.settings.basic").style.display = 'block';
            this.query("button.basic").classList.add('active');
            this.query("button.advanced").classList.remove('active');
        });
        this.query('button.closer').addEventListener('click', (e) => {
            this.close(game);
        });
        this.query('button.saver').addEventListener('click', (e) => {
            this.save(game);
        }, { once: false });
        this.query('button.darker').addEventListener('click', (e) => {
            this.setDark();
        }, { once: false });

        this.query(".info.name").textContent = game.name;
        this.query(".info.version").textContent = game.version;
        this.gamesetup = true;
    }
    SetupValues(game) {
        const {snakeColor, foodColor } = game.settings;
        const {fps,delta,deltaLow} = game.settings2;
        this.query('input[name=fps]').checked = fps;
        this.query('input[name=delta_high]').checked = delta;
        this.query('input[name=delta_low]').checked = deltaLow;
        this.query('color-box.snake').SetValue(snakeColor);
        this.query('color-box.food').SetValue(foodColor);
    }
    save(game) {
        let fps = this.query('input[name=fps]').checked;
        let delta = this.query('input[name=delta_high]').checked;
        let deltaLow = this.query('input[name=delta_low]').checked;
        let snakeColor = this.query('color-box.snake').GetValue();
        let foodColor = this.query('color-box.food').GetValue();
        game.UpdateSettings({ fps, delta, deltaLow, snakeColor, foodColor });
        this.close(game);
    }
    close(game) {
        this.query(".dialog").style.visibility = 'hidden';
        game.Resume();
    }
    setDark() {
        document.body.classList.toggle('dark');

    }
    get isOpen() {
        return this.query(".dialog").style.visibility === 'visible';
    }
    /**
     * @param {Game} game 
     * @param {boolean} close 
     * @returns 
     */
    static OpenClose(game, close) {
        let pop = document.querySelector("settings-dialog");
        if (pop.isOpen) {
            pop.close(game);
            return;
        }
        if (true === close) {
            pop.close(game);
            return;
        }
        pop.open(game);
    }
}
customElements.define("settings-dialog", SettingsDialog);
Object.freeze(SettingsDialog);class RadioBox extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("radiobox_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/radiobox.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.SetupBoxes();
    }
    Query(s) {
        return this.shadowRoot.querySelector(s);
    }
    QueryAll(s) {
        return this.shadowRoot.querySelectorAll(s);
    }
    ReadData() {
        let names = this.getAttribute("data-names");
        let values = this.getAttribute("data-values");
        let texts = this.getAttribute("data-texts");
        let inputName = this.getAttribute("data-input-name");
        let inputLabel = this.getAttribute("data-input-label");
        let labelName = this.getAttribute("data-label-name");
        return { names, values, texts, inputName, inputLabel, labelName };
    }
    SetupBoxes() {
        if (this.getAttribute("setup") === "1") {
            return;
        }
        let { names, values, texts, inputName, inputLabel, labelName } = this.ReadData();

        let span = this.Query("span");
        span.textContent = inputLabel;
        span.setAttribute("data-app-translate", 1);
        span.setAttribute("data-app-text", labelName);

        names = names.split(";");
        values = values.split(";");
        texts = texts.split(";");
        let container = this.Query("div.radios");
        if (names.length !== values.length || values.length !== texts.length) {
            throw "some data is missing for component:RadioBox";
        }
        for (let i = 0, len = names.length; i < len; i++) {
            this.MakeRadio(container, texts[i], names[i], values[i], inputName, i)
        }
        // if more than 4
        //then display 4 radio boxes and all boxes shown in menu 
        //add button for menu
        this.setAttribute("setup", "1");
    }
    MakeRadio(c, _text, _name, _value, _input_name, index) {
        let label = document.createElement("label");
        label.textContent = _text;
        label.setAttribute("data-app-translate", 1);
        label.setAttribute("data-app-text", _name);
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = _input_name;
        radio.value = _value;
        if (index==0){
            radio.checked = true;
        }
        label.appendChild(radio);
        c.appendChild(label);
    }
    GetValue() {
        const c = this.Query("input[type=radio]:checked");
        return c === null ? "" : c.value;
    }
    SetValue(v) {
        const radios = this.QueryAll("input");
        for (const r of radios) {
            if (r.value === v) {
                r.checked = true;
                return;
            }
        }
    }
    SetLabels() { }
}
customElements.define("radio-box", RadioBox);
Object.freeze(RadioBox);class ColorBox extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("color_box_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/colorbox.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.SetLabel();
        this.Setup();
    }
    SetLabel() {
        let label = this.getAttribute("data-text");
        let span = this.Query('span');
        span.textContent = label;
    }
    Query(s) {
        return this.shadowRoot.querySelector(s);
    }
    QueryAll(s) {
        return this.shadowRoot.querySelectorAll(s);
    }
    FindActive() {
        return this.Query(".active");
    }
    SetActive(e, nonEvent) {
        let active = this.FindActive();
        if (active == null) {
            return;
        }
        active.classList.remove('active');
        if (nonEvent === true) {
            e.classList.add('active');
            return;
        }
        e.target.classList.add('active');
    }
    GetValue() {
        // find active 
        let active = this.FindActive();
        //debugger;
        if (active === null) {
            return "";
        }
        return active.tagName === "INPUT" ? active.value : active.getAttribute("data-color");
    }
    /**
     * @param {String} c
     */
    SetValue(c) {
        if (typeof c !== "string") {
            throw "ColorBox:incorrect type"
        }
        let buttons = this.QueryAll("button");
        c = c.toLowerCase();
        for (const b of buttons) {
            const bc = b.getAttribute("data-color").toLowerCase();
            if (bc === c) {
                this.SetActive(b, true);
                return;
            }
        }
        let i = this.Query('input');
        i.value = c;
        this.SetActive(i, true);
    }
    Setup() {
        let buttons = this.QueryAll("button");
        for (const b of buttons) {
            b.addEventListener("click", this.SetActive.bind(this));
        }
        this.Query('input').addEventListener("click", this.SetActive.bind(this));
    }

}
customElements.define("color-box", ColorBox);
Object.freeze(ColorBox);