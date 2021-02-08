class SettingsDialog extends HTMLElement {
    constructor(){
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
    open(snakegame) {
        if(snakegame===null||snakegame===undefined){
            throw "snakegame not passed";
        }
        snakegame.Pause();
        this.query(".dialog").style.visibility ='visible';
        this.setup(snakegame);
        this.SetupValues(snakegame);        
    }
    setup(snakegame){
        if(this.gamesetup===true){
            return;
        }
        this.query("button.advanced").addEventListener("click",(e)=>{
            this.query("div.settings.basic").style.display = 'none';
            this.query("div.settings.advanced").style.display = 'block';
            this.query("button.basic").classList.remove('active');
            this.query("button.advanced").classList.add('active');
        });
        this.query("button.basic").addEventListener("click",(e)=>{
            this.query("div.settings.advanced").style.display = 'none';
            this.query("div.settings.basic").style.display = 'block';
            this.query("button.basic").classList.add('active');
            this.query("button.advanced").classList.remove('active');
        });
        this.query('button.closer').addEventListener('click', (e) => {
            this.close(snakegame);
        });
        this.query('button.saver').addEventListener('click', (e) => {
            this.save(snakegame);
        },{once:false});
        this.query('button.darker').addEventListener('click', (e) => {
            this.setDark();
        },{once:false});
        this.gamesetup = true;
    }
    SetupValues(snakegame){
        const {enablefps,freeBound,snakeColor,foodColor} = snakegame.settings;
        const {mode} = snakegame;
        this.query('input[name=fps]').checked = enablefps;
        this.query('input[name=free_bound]').checked = freeBound;
        this.query('color-box.snake').SetValue(snakeColor);
        this.query('color-box.food').SetValue(foodColor);
        this.query('radio-box.moder').SetValue(mode);
    }
    save(snakegame){        
        if (snakegame.settings === undefined){
            snakegame.settings = {};           
        }
        const fps = this.query('input[name=fps]').checked;        
        snakegame.settings.enablefps = fps;
        // debugger;
        const free_bound= this.query('input[name=free_bound]').checked;
        snakegame.settings.freeBound = free_bound;

        snakegame.mode = this.query('radio-box.moder').GetValue();
        snakegame.settings.level = this.query('radio-box.leveler').GetValue();

        let colours = this.query('color-box.snake').GetValue();
        snakegame.settings.snakeColor = colours;
        let colourf = this.query('color-box.food').GetValue();
        snakegame.settings.foodColor = colourf;
        this.close(snakegame);        
    }
    close(snakegame) {
        this.query(".dialog").style.visibility ='hidden';
        snakegame.Resume();
    }
    setDark() {
        document.body.classList.toggle('dark');
        
    }
    static Open(snakegame){
        let pop = document.querySelector("settings-dialog");
        pop.open(snakegame);
    }
    static Close(snakegame){
        let pop = document.querySelector("settings-dialog");
        pop.close(snakegame);
    }
}
customElements.define("settings-dialog",SettingsDialog);
Object.freeze(SettingsDialog);