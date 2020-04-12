class PopMenu extends HTMLElement {
    constructor() {
        super();
        const t = document.getElementById('pop-menu-template');
        const template = t.content;

        const clone = template.cloneNode(true);

        const shadowRoot = this.attachShadow({ mode: 'open' })
            .appendChild(clone);

        this.query("div.closex>button").addEventListener("click", (e) => {
            this.close();
        })
    }
    query(s) {
        if (typeof s !== 'string') throw "not a string";
        return this.shadowRoot.querySelector(s);
    }
    darken() {
        let mb = this.query('.menu-box');
        mb.classList.toggle("dark");
    }
    show() {
        let mb = this.query('.menu-box');
        mb.style.display = 'flex';
    }
    close() {
        let mb = this.query('.menu-box');
        mb.style.display = 'none';
    }
    fill(list, fun) {
        //array of strings like ["abc","def","ghi"]
        let mb = this.query('.menu-box');
        for (const el of list) {
            let button = document.createElement('button');
            button.setAttribute("data-lang", el);
            button.textContent = el;
            button.addEventListener('click', fun);
            let div = document.createElement('div');
            div.appendChild(button);
            mb.appendChild(div);
        }
    }
}

class TranslateMenu extends PopMenu {
    constructor() {
        super();
        const list = ["ქართული", "English", "Deutsch", "Русский"];
        this.fill(list, (e) => {
            const lang = e.target.getAttribute("data-lang");
            localStorage.lang = lang;
            translate();
            this.close()
        });
    }
}

customElements.define('pop-menu', PopMenu);
customElements.define('translate-menu', TranslateMenu);

