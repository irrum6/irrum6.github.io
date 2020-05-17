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
        this.empty();
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
            div.classList.add("menu-item");
            div.appendChild(button);
            mb.appendChild(div);
        }
    }
    empty() {
        let mb = this.query('.menu-box');
        let hasItems = true;
        while (hasItems) {
            let index = -1, allcount = -1;//to zero properly 1st to be 0
            for (const chi of mb.childNodes) {
                allcount++
                if (chi.classList !== undefined && chi.classList.contains("menu-item")) {
                    index = allcount;
                }
            }
            if (index < 0) {
                hasItems = false;
                break;
            }
            const chill = mb.childNodes[index];
            chill.remove();//ha ha  remove self go brrr...
        }
    }
}

customElements.define('pop-menu', PopMenu);