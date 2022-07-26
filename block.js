class DisplayBlock extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("display_block");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'bootstrap.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.setup();
    }
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    setup() {
        let imgsrc = this.getAttribute("data-img");
        let href = this.getAttribute("data-href");
        let text = this.getAttribute("data-text");

        this.query("h4").textContent = text;
        this.query("img").setAttribute("src", imgsrc);
        this.query("a").setAttribute("href", href);
    }
}

customElements.define("display-block", DisplayBlock);
Object.freeze(DisplayBlock);