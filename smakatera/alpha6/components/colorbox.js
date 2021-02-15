{
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