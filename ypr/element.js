class ReportBox extends HTMLElement {
    constructor() {
        super();
        const t = document.getElementById('report-box-template');
        const template = t.content;

        const clone = template.cloneNode(true);

        const shadowRoot = this.attachShadow({ mode: 'open' })
            .appendChild(clone);
    }
    query(s) {
        if (typeof s !== 'string') throw "not a string";
        return this.shadowRoot.querySelector(s);
    }
    darken() {
        let cb = this.query('.center-box');
        cb.classList.toggle('dark');
    }
    putValues(w, h, dpr) {
        if (typeof w != 'number' ||
            typeof h != 'number' ||
            typeof dpr != 'number') throw "not a number,moron";
        let width = this.query('span.wp');
        let height = this.query('span.hp');
        let pixels = this.query('span.pr');

        width.textContent = w;
        height.textContent = h;
        pixels.textContent = dpr;

    }
}

customElements.define('report-box', ReportBox);