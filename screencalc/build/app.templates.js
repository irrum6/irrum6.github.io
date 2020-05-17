/**
 * Popup Alert
 */
class PopAlert extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("pop-alert-template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/pop.all.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
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
}
customElements.define('pop-alert', PopAlert);

class Pop {
    static alert(text, okText) {
        let pop = document.querySelector('pop-alert');
        if (typeof okText !== "string" || okText === "") { okText = "ok"; }
        pop.open(text, okText);
    }
}
Object.freeze(Pop);
Object.freeze(PopAlert);

/**
 * Popup Menu
 */

class PopMenu extends HTMLElement {
    constructor() {
        super();
        const t = document.getElementById('pop-menu-template');
        const template = t.content;

        const clone = template.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/pop.all.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.appendChild(stylee)
        shadowRoot.appendChild(clone);

        const on = "addEventListener";
        this.query("div.closex>button")[on]("click", (e) => {
            this.close();
        })
    }
    query(s) {
        if (typeof s !== 'string') throw "not a string";
        return this.shadowRoot.querySelector(s);
    }
    setDark() {
        let mb = this.query('.menu-box');
        mb.classList.toggle("dark");
    }
    open() {
        let mb = this.query('.menu-box');
        mb.style.display = 'flex';
        this.style.display = 'flex';
    }
    close() {
        let mb = this.query('.menu-box');
        mb.style.display = 'none';
        this.style.display = 'none';
    }
    /**
     * 
     * @param {Array} list 
     * @param {String} attr 
     * @param {Function} fun 
     */
    fill(list, attr, fun) {
        //[{display,attrValue}]
        //attr like "data-lang"
        let mb = this.query('.menu-box');
        for (const el of list) {
            let button = document.createElement('button');
            button.setAttribute(attr, el.attrValue);
            button.textContent = el.display;
            button[on]('click', fun);
            let div = document.createElement('div');
            div.appendChild(button);
            mb.appendChild(div);
        }
    }
}

customElements.define('pop-menu', PopMenu);class InputBox extends HTMLElement {
    constructor() {
        super();
        // debugger;
        let template = document.getElementById('input-box-template');
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'styles/box.all.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(linkElem);
        shadowRoot.appendChild(clone);
    }
    connectedCallback() {
        this.setInputID();
        this.setInputFocus();
        this.setIncreaser();
        this.setDecreaser();
        this.setLocker();
        this.setInitialLabel();
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName != 'inname') return;
    }
    /**
     * @param {void}
     * @returns {Object}
     */
    getState() {
        let inp = this.getInput();
        let value = inp.value;
        let disabled = inp.disabled;
        return { value, disabled };
    }
    /**
     * @param {Object}
     * @returns {void}
     * @throws {invalid}
     */
    setState(s) {
        if (typeof s !== 'object') throw new Error("InputBox::setState-invalid type:not an object");
        let { value, disabled } = s;
        let inp = this.getInput();
        let type = inp.getAttribute('type');
        disabled = (typeof disabled === 'boolean') ? disabled : this.getState().disabled;
        (disabled) ? inp.setAttribute('disabled', true) : inp.removeAttribute('disabled');
        if (disabled) {
            return;//throw new Error("InputBox::setState - can't set new value on disabled");
        }
        if (value === undefined) {
            return;
        }
        if (typeof value !== type) {
            throw new Error("InputBox::setState - value type not match");
        }
        inp.value = value;
    }
    /**
     * @param {String} s
     * @returns {HTMLElement}
     */
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    /**
     * @param {String} s
     * @returns {HTMLCollection}
     */
    queryAll(s) {
        return this.shadowRoot.querySelectorAll(s);
    }
    /**
     * @param {void}
     * @returns {void}
     */
    setInitialLabel() {
        let text = this.getAttribute("data-app-label");
        let label = this.query('label');
        label.children[0].textContent = text;
        let input = this.getInput();
        label.setAttribute("for", input.id);
    }
    setLabel(text) {
        if (typeof text !== "string" || text == "") return;
        let label = this.query('label');
        label.children[0].textContent = text;
    }
    translateLabel(lan) {
        if (typeof lan !== "string") return;
        if (lan === "") return;
        const text = this.getAttribute("data-app-label");
        const translation = Translator.getTranslation(text, lan);
        this.setLabel(translation);
    }
    /**
     * @param {void}
     * @returns {HTMLElement}
     */
    getInput() {
        return this.query('input');
    }
    /**
     * @param {void}
     * @returns {void}
     */
    setInputID() {
        let inputid = `${this.id}-input`;
        let input = this.getInput();
        input.setAttribute("id", inputid);
    }
    /** 
     * @param {number} s
     * @returns {void} 
     */
    setInputStep(s) {
        if (typeof s !== 'number') throw new Error("setInputStep:argument not a number");
        if (s < 0) throw new Error("setInputStep:argument negative,not valid");
        if (s == 0) throw new Error("setInputStep:argument zero,not valid");
        let input = this.getInput();
        input.setAttribute("step", s);
    }
    /** 
     * @param {void}
     * @returns {number} 
     */
    getInputStep() {
        let input = this.getInput();
        let step = input.step;
        if (step == "") return 1;//cause 1 is default for input[type=number]
        return Number(step);
    }
    /**
     * @param {void}
     * @returns {void}
     */
    setInputFocus() {
        let onChange = (e) => {
            this.fireChange(e);
        }
        let inp = this.getInput();
        inp[on]('focus', (e) => {
            inp[on]('change', onChange);
        });
        inp[on]('blur', (e) => {
            inp[un]('change', onChange);
        });
    }
    /**
     * @param {void}
     * @returns {void}
     */
    setIncreaser() {
        let plus = this.query('[data-app-behavior=plus]');
        plus[on]('click', (e) => {
            let { value, disabled } = this.getState();
            if (disabled) return;
            value = Number(value);
            let step = this.getInputStep();
            if (Number.isNaN(value)) value = 0;
            value += step;
            this.setState({ value });
            this.fireChange(e);
        });
    }
    /**
     * @param {void}
     * @returns {void}
     */
    setDecreaser() {
        let minus = this.query('[data-app-behavior=minus]');
        minus[on]('click', (e) => {
            let { value, disabled } = this.getState();
            if (disabled) return;
            value = Number(value);
            let step = this.getInputStep();
            if (Number.isNaN(value)) value = 1;
            value -= step;
            this.setState({ value });
            this.fireChange(e);
        });
    }
    /**
     * @param {void}
     * @returns {void}
     */
    setLocker() {
        let lock = this.query('[data-app-behavior=lock]');
        lock[on]('click', () => {
            let { disabled } = this.getState();
            disabled = !disabled;
            this.setState({ disabled });
        });
    }
    /**
     * fire custom event to handle all change events
     * @param {void}
     * @returns {void}
     */
    fireChange(e) {
        let event = new CustomEvent('ibchange', { detail: e });//inputbox change
        this.dispatchEvent(event);
    }
    /**
     * change appeareance for dark tones
     * @param {void}
     * @returns {void}
     */
    setDark() {
        let inp = this.getInput();
        inp.classList.toggle('input-dark');
        let buttons = this.queryAll('button.btn');
        for (const butt of buttons) {
            butt.classList.toggle('btn-dark');
        }
    }
}
customElements.define('input-box', InputBox);