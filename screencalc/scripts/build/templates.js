class InputBox extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('input-box-template');
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'styles/build/box.css');

        const linkElemDark = document.createElement('link');
        linkElemDark.setAttribute('rel', 'stylesheet');
        linkElemDark.setAttribute('href', 'styles/build/box_dark.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(linkElem);
        shadowRoot.appendChild(linkElemDark);
        shadowRoot.appendChild(clone);
    }
    connectedCallback() {
        this.setInputFocus();
        this.setIncreaser();
        this.setDecreaser();
        this.setLocker();
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName != 'inname') return;
    }
    getState() {
        let inp = this.getInput();
        let value = inp.value;
        let disabled = inp.disabled;
        return { value, disabled };
    }
    setState(s) {
        if (typeof s !== 'object') throw new Error('setState:invalid type:not an object');
        let { value, disabled } = s;
        let inp = this.getInput();
        let type = inp.getAttribute('type');
        if (typeof value !== type) return false;
        inp.value = value;
        if (typeof disabled !== 'boolean') return false;
        (disabled) ? inp.setAttribute('disabled', true) : inp.removeAttribute('disabled');
    }
    getInput() {
        return this.shadowRoot.querySelector('input');
    }
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
    setIncreaser() {
        let plus = this.shadowRoot.querySelector('[data-app-behavior=plus]');
        plus[on]('click', (e) => {
            let { value, disabled } = this.getState();
            if (disabled) return;
            value = Number(value)
            if (Number.isNaN(value)) value = 0;
            value++;
            this.setState({ value, disabled });
            this.fireChange(e);
        });
    }
    setDecreaser() {
        let minus = this.shadowRoot.querySelector('[data-app-behavior=minus]');
        minus[on]('click', (e) => {
            let { value, disabled } = this.getState();
            if (disabled) return;
            value = Number(value)
            if (Number.isNaN(value)) value = 1;
            value--;
            this.setState({ value, disabled });
            this.fireChange(e);
        });
    }
    setLocker() {
        let lock = this.shadowRoot.querySelector('[data-app-behavior=lock]');
        lock[on]('click', () => {
            let { value, disabled } = this.getState();
            disabled = !disabled;
            value = Number(value);//ohmg , cast
            this.setState({ value, disabled });
        });
    }
    fireChange(e) {
        let event = new CustomEvent('ibchange', { detail: e });//inputbox change
        this.dispatchEvent(event);
    }
}
customElements.define('input-box', InputBox);