{
    // setup
    let template = document.createElement('template');
    template.id = "pop_alert_template";
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
    let first = document.body.children[0];
    document.body.insertBefore(template, first);
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
    static OPEN(text, okText){
        const pop = document.body.querySelector('pop-alert');
        if (pop == null){
            let _pop = document.createElement('pop-alert');
            document.body.appendChild(_pop);
            let __pop = document.body.querySelector('pop-alert');
            __pop.open(text, okText);
            return;
        }
        pop.open(text, okText);
    }
}
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
    open(snakegame) {
        if (snakegame === null || snakegame === undefined) {
            throw "snakegame not passed";
        }
        this.query(".dialog").style.visibility = 'visible';
        this.setup(snakegame);
    }
    setup(snakegame) {
        if (this.gamesetup === true) {
            return;
        }
        this.query('button.closer')[on]('click', (e) => {
            this.close(snakegame);
        });
        this.query('button.starter')[on]('click', this.new.bind(this,snakegame), { once: false });
        this.gamesetup = true;
    }
    new(snakeGame,e){
        const s = {}
        const free_bound = this.query('input[name=free_bound]').checked;
        s.freeBound = free_bound;
        s.mode = this.query('radio-box.moder').GetValue();
        s.level = this.query('radio-box.leveler').GetValue();
        const n = this.query('radio-box.player').GetValue();
        this.close();
        snakeGame.NewGame(n,s);
        snakeGame.GetFrame();
        if (n > 1) {
            snakeGame.DisplayMultiControls();
        }
    }
    close() {
        this.query(".dialog").style.visibility = 'hidden';
    }
    setDark() {
        document.body.classList.toggle('dark');
    }
    static Open(snakegame) {
        let pop = document.querySelector("new-dialog");
        pop.open(snakegame);
    }
    static Close(snakegame) {
        let pop = document.querySelector("new-dialog");
        pop.close(snakegame);
    }
}

customElements.define("new-dialog", NewGameDialog);
Object.freeze(NewGameDialog);class SettingsDialog extends HTMLElement {
    constructor(){
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
    open(snakegame) {
        if(snakegame===null||snakegame===undefined){
            throw "snakegame not passed";
        }
        snakegame.Pause();
        this.query(".dialog").style.visibility ='visible';
        this.setup(snakegame);
        this.SetupValues(snakegame);        
    }
    setup(snakegame){
        if(this.gamesetup===true){
            return;
        }
        this.query("button.advanced").addEventListener("click",(e)=>{
            this.query("div.settings.basic").style.display = 'none';
            this.query("div.settings.advanced").style.display = 'block';
            this.query("button.basic").classList.remove('active');
            this.query("button.advanced").classList.add('active');
        });
        this.query("button.basic").addEventListener("click",(e)=>{
            this.query("div.settings.advanced").style.display = 'none';
            this.query("div.settings.basic").style.display = 'block';
            this.query("button.basic").classList.add('active');
            this.query("button.advanced").classList.remove('active');
        });
        this.query('button.closer').addEventListener('click', (e) => {
            this.close(snakegame);
        });
        this.query('button.saver').addEventListener('click', (e) => {
            this.save(snakegame);
        },{once:false});
        this.query('button.darker').addEventListener('click', (e) => {
            this.setDark();
        },{once:false});
        this.gamesetup = true;
    }
    SetupValues(snakegame){
        const {enablefps,snakeColor,foodColor} = snakegame.settings;
        this.query('input[name=fps]').checked = enablefps;
        this.query('color-box.snake').SetValue(snakeColor);
        this.query('color-box.food').SetValue(foodColor);
    }
    save(snakegame){
        let enablefps = this.query('input[name=fps]').checked;
        let snakeColor = this.query('color-box.snake').GetValue();
        let foodColor = this.query('color-box.food').GetValue();
        snakegame.UpdateSettings({enablefps,snakeColor,foodColor});
        this.close(snakegame);        
    }
    close(snakegame) {
        this.query(".dialog").style.visibility ='hidden';
        snakegame.Resume();
    }
    setDark() {
        document.body.classList.toggle('dark');
        
    }
    static Open(snakegame){
        let pop = document.querySelector("settings-dialog");
        pop.open(snakegame);
    }
    static Close(snakegame){
        let pop = document.querySelector("settings-dialog");
        pop.close(snakegame);
    }
}
customElements.define("settings-dialog",SettingsDialog);
Object.freeze(SettingsDialog);{
    let template = document.createElement('template');
    template.id = "radiobox_template";
    template.innerHTML = `<div class="radio-box">
  <div><span data-app-translate="1" data-app-text="translate_text"></span></div>
  <div class="radios">
  </div>
  </div`;
    let first = document.body.children[0];
    document.body.insertBefore(template, first);
}

class RadioBox extends HTMLElement {
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
Object.freeze(RadioBox);{
    // setup
    let template = document.createElement('template');
    template.id = "color_box_template";
    template.innerHTML = `<div class="color-box">
    <span class="text" data-app-translate="1" data-app-text="translate_text"></span>
    <button class="active" data-color="black" style="background-color: black;"></button>
    <button data-color="red" style="background-color: red;"></button>
    <button data-color="green" style="background-color: green;"></button>
    <button data-color="blue" style="background-color: blue;"></button>
    <button data-color="purple" style="background-color: purple;"></button>
    <button data-color="violet" style="background-color: violet;"></button>
    <button data-color="yellow" style="background-color: yellow;"></button>
    <button data-color="orange" style="background-color: orange;"></button>
    <input class="activex" type="color">
</div>`;
    let first = document.body.children[0];
    document.body.insertBefore(template, first);
}
class ColorBox extends HTMLElement {
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