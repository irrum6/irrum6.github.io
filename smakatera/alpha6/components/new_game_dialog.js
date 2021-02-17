class NewGameDialog extends HTMLElement {
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
Object.freeze(NewGameDialog);