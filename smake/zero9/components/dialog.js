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
        const { snakeColor, foodColor } = game.settings;
        const { fps, delta, deltaLow, timers } = game.settings2;
        this.query('input[name=fps]').checked = fps;
        this.query('input[name=delta_high]').checked = delta;
        this.query('input[name=delta_low]').checked = deltaLow;
        this.query('input[name=show_timers]').checked = timers;
        this.query('color-box.snake').SetValue(snakeColor);
        this.query('color-box.food').SetValue(foodColor);
    }
    save(game) {
        let fps = this.query('input[name=fps]').checked;
        let delta = this.query('input[name=delta_high]').checked;
        let deltaLow = this.query('input[name=delta_low]').checked;
        let timers = this.query('input[name=show_timers]').checked;
        let snakeColor = this.query('color-box.snake').GetValue();
        let foodColor = this.query('color-box.food').GetValue();
        game.UpdateSettings({ fps, delta, deltaLow, timers, snakeColor, foodColor });
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