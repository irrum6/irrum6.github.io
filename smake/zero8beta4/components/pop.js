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
Object.freeze(PopAlert);
customElements.define('pop-alert', PopAlert);