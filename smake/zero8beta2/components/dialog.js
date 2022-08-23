class SettingsDialog extends HTMLElement {
    constructor() {
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
    open(game) {
        if (game === null || game === undefined) {
            throw "game not passed";
        }
        game.Pause();
        this.query(".dialog").style.visibility = 'visible';
        this.setup(game);
        this.SetupValues(game);
    }
    setup(game) {
        if (this.gamesetup === true) {
            return;
        }
        this.query("button.advanced").addEventListener("click", (e) => {
            this.query("div.settings.basic").style.display = 'none';
            this.query("div.settings.advanced").style.display = 'block';
            this.query("button.basic").classList.remove('active');
            this.query("button.advanced").classList.add('active');
        });
        this.query("button.basic").addEventListener("click", (e) => {
            this.query("div.settings.advanced").style.display = 'none';
            this.query("div.settings.basic").style.display = 'block';
            this.query("button.basic").classList.add('active');
            this.query("button.advanced").classList.remove('active');
        });
        this.query('button.closer').addEventListener('click', (e) => {
            this.close(game);
        });
        this.query('button.saver').addEventListener('click', (e) => {
            this.save(game);
        }, { once: false });
        this.query('button.darker').addEventListener('click', (e) => {
            this.setDark();
        }, { once: false });

        this.query(".info.name").textContent = game.name;
        this.query(".info.version").textContent = game.version;
        this.gamesetup = true;
    }
    SetupValues(game) {
        const { enablefps, snakeColor, foodColor } = game.settings;
        this.query('input[name=fps]').checked = enablefps;
        this.query('color-box.snake').SetValue(snakeColor);
        this.query('color-box.food').SetValue(foodColor);
    }
    save(game) {
        let enablefps = this.query('input[name=fps]').checked;
        let snakeColor = this.query('color-box.snake').GetValue();
        let foodColor = this.query('color-box.food').GetValue();
        game.UpdateSettings({ enablefps, snakeColor, foodColor });
        this.close(game);
    }
    close(game) {
        this.query(".dialog").style.visibility = 'hidden';
        game.Resume();
    }
    setDark() {
        document.body.classList.toggle('dark');

    }
    get isOpen() {
        return this.query(".dialog").style.visibility === 'visible';
    }
    /**
     * @param {Game} game 
     * @param {boolean} close 
     * @returns 
     */
    static OpenClose(game, close) {
        let pop = document.querySelector("settings-dialog");
        if (pop.isOpen) {
            pop.close(game);
            return;
        }
        if (true === close) {
            pop.close(game);
            return;
        }
        pop.open(game);
    }
}
customElements.define("settings-dialog", SettingsDialog);
Object.freeze(SettingsDialog);