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
    query(s) {
        return this.shadowRoot.querySelector(s);
    }
    open(snakegame) {
        if(snakegame===null||snakegame===undefined){
            throw "snakegame not passed";
        }
        this.query(".dialog").style.visibility ='visible';
        this.setup(snakegame);        
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
            this.close();
        });
        this.query('button.saver').addEventListener('click', (e) => {
            this.save(snakegame);
        },{once:false});
        this.gamesetup = true;
    }
    save(snakegame){        
        if (snakegame.settings === undefined){
            snakegame.settings = {};           
        }
        const fps = this.query('input[name=fps]').checked;        
        snakegame.settings.enablefps = fps;
        // debugger;
        const free_bound= this.query('input[name=free_bound]').checked;
        snakegame.settings.free_bound = free_bound;
        const modeCmp = this.query('input[name=mode]:checked');
        if(modeCmp !==null) {
            const mode = modeCmp.value;
            snakegame.settings.mode = mode;
        }
        let colorv = this.query('color-box.snake').GetValue();
        snakegame.settings.snakeColor = colorv;
        this.close();        
    }
    close() {
        // this.query(".dialog").style.display = 'none';
        this.query(".dialog").style.visibility ='hidden';
    }
    setDark() {
        const cont = this.query('div.pop-container');
        cont.classList.toggle('dark');
    }
    static Open(snakegame){
        let pop = document.querySelector("settings-dialog");
        pop.open(snakegame);
    }
    static Close(){
        let pop = document.querySelector("settings-dialog");
        pop.close();
    }
}
customElements.define("settings-dialog",SettingsDialog);
Object.freeze(SettingsDialog);