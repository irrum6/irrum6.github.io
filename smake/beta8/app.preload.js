const on = "addEventListener";
const query = (s) => document.body.querySelector(s);
const all = (s) => document.body.querySelectorAll(s);

const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

class Utils {
    static IsWholeNumber(z) {
        return Number.isInteger(z) && z > -1;
    }
    static Hash16(n){
        if (!Utils.IsWholeNumber(n)){
            throw "Not a whole number";
        }
        return Array.prototype.map.call(window.crypto.getRandomValues(new Uint16Array(n)),e=>e.toString("16")).join("");
    }
    static Distance(x1, y1, x2, y2){
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
}
Object.freeze(Utils);class PopAlert extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("pop_alert_template");
        let templateContent = template.content;
        let clone = templateContent.cloneNode(true);
        const shadowRoot = this.attachShadow({ mode: 'open' });
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
    static OPEN(text, okText){
        const pop = document.body.querySelector('pop-alert');
        if (pop == null){
            let _pop = document.createElement('pop-alert');
            document.body.appendChild(_pop);
            let __pop = document.body.querySelector('pop-alert');
            __pop.open(text, okText);
            return;
        }
        pop.open(text, okText);
    }
}
Object.freeze(PopAlert);
customElements.define('pop-alert', PopAlert);class NewGameDialog extends HTMLElement {
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
        const freeBound = this.query('input[name=free_bound]').checked;
        const mode = this.query('radio-box.moder').GetValue();
        const level = this.query('radio-box.leveler').GetValue();
        const moveOver = this.query('input[name=move_over]').checked;
        const n = this.query('radio-box.player').GetValue();
        this.close();
        const s = { freeBound, moveOver, mode, level }
        snakeGame.NewGame(n, s);
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
Object.freeze(NewGameDialog);class SettingsDialog extends HTMLElement {
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
        const {enablefps,snakeColor,foodColor} = snakegame.settings;
        this.query('input[name=fps]').checked = enablefps;
        this.query('color-box.snake').SetValue(snakeColor);
        this.query('color-box.food').SetValue(foodColor);
    }
    save(snakegame){
        let enablefps = this.query('input[name=fps]').checked;
        let snakeColor = this.query('color-box.snake').GetValue();
        let foodColor = this.query('color-box.food').GetValue();
        snakegame.UpdateSettings({enablefps,snakeColor,foodColor});
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
Object.freeze(SettingsDialog);class RadioBox extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("radiobox_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/radiobox.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.SetupBoxes();
    }
    Query(s) {
        return this.shadowRoot.querySelector(s);
    }
    QueryAll(s) {
        return this.shadowRoot.querySelectorAll(s);
    }
    ReadData() {
        let names = this.getAttribute("data-names");
        let values = this.getAttribute("data-values");
        let texts = this.getAttribute("data-texts");
        let inputName = this.getAttribute("data-input-name");
        let inputLabel = this.getAttribute("data-input-label");
        let labelName = this.getAttribute("data-label-name");
        return { names, values, texts, inputName, inputLabel, labelName };
    }
    SetupBoxes() {
        if (this.getAttribute("setup") === "1") {
            return;
        }
        let { names, values, texts, inputName, inputLabel, labelName } = this.ReadData();

        let span = this.Query("span");
        span.textContent = inputLabel;
        span.setAttribute("data-app-translate", 1);
        span.setAttribute("data-app-text", labelName);

        names = names.split(";");
        values = values.split(";");
        texts = texts.split(";");
        let container = this.Query("div.radios");
        if (names.length !== values.length || values.length !== texts.length) {
            throw "some data is missing for component:RadioBox";
        }
        for (let i = 0, len = names.length; i < len; i++) {
            this.MakeRadio(container, texts[i], names[i], values[i], inputName, i)
        }
        // if more than 4
        //then display 4 radio boxes and all boxes shown in menu 
        //add button for menu
        this.setAttribute("setup", "1");
    }
    MakeRadio(c, _text, _name, _value, _input_name, index) {
        let label = document.createElement("label");
        label.textContent = _text;
        label.setAttribute("data-app-translate", 1);
        label.setAttribute("data-app-text", _name);
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = _input_name;
        radio.value = _value;
        if (index==0){
            radio.checked = true;
        }
        label.appendChild(radio);
        c.appendChild(label);
    }
    GetValue() {
        const c = this.Query("input[type=radio]:checked");
        return c === null ? "" : c.value;
    }
    SetValue(v) {
        const radios = this.QueryAll("input");
        for (const r of radios) {
            if (r.value === v) {
                r.checked = true;
                return;
            }
        }
    }
    SetLabels() { }
}
customElements.define("radio-box", RadioBox);
Object.freeze(RadioBox);class ColorBox extends HTMLElement {
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
Object.freeze(ColorBox);class Snake {
    constructor(r,v){
        this.radius = r;
        this.velocity = v;
        this.positions = [{x:0,y:0}];
        this.mass = 1;
        this.color ="black";      
    }
    UpdateColor(c){
        this.color = c;
    }
    GetLength(){
        return this.positions.length;
    }
    /**
     * gain mass
     * @returns {void}
     */
    AddMass(){
        let last = this.GetTailPosition();
        // let x = last.x + this.radius / 2;
        // let y = last.y + this.radius / 2;
        let x = last.x;
        let y = last.y;
        this.positions.push({ x, y });
        this.mass++;
        // console.log("mass gained");
    }
    Shrink(m){
        // debugger;
        //if no mass specified shrink all
        let l = this.GetLength();
        if(m===undefined){
            this.positions.splice(0,l-1);
            return;
        }
        this.positions.splice(l-m,m);
    }  
    /**
     * @param {CanvasRenderingContext2D} 
     */
    Draw(rc,snakeGame){
        if (rc.constructor.name != "CanvasRenderingContext2D"){
            throw "not a canvas";
        }
        let {radius } = this;
        rc.fillStyle= this.color;
        if(snakeGame.settings.scaleEnabled){
            radius = radius * snakeGame.settings.scale;
        }
        for(const p of this.positions){
            rc.beginPath();
            rc.arc(p.x, p.y, radius, 0, 2* Math.PI);
            rc.fill();
            rc.closePath();
        }
        //draw eye or something
        rc.fillStyle = "white";
        rc.beginPath();
        let { x, y } = this.GetHeadPosition();
        rc.arc(x, y, radius / 4, 0, 2 * Math.PI);
        rc.fill();
        rc.closePath();
    }
    GetHeadPosition(){
        return this.positions[0];
    }
    SetHeadPosition(x,y){
        if (typeof x == "number" && !Number.isNaN(x)) { this.positions[0].x = x; }
        if (typeof y == "number" && !Number.isNaN(y)) { this.positions[0].y = y; }
    }
    /**
     * @returns {x,y}
     */
    GetTailPosition() {
        return this.positions[this.positions.length - 1];
    }
}
// export default Snake;
class Food {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    /**
     * @param {CanvasRenderingContext2D} 
     */
    Draw(rc, snakeGame) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { x, y, radius } = this;
        rc.fillStyle = "red";
        if (snakeGame && snakeGame.settings && snakeGame.settings.foodColor) {
            rc.fillStyle = snakeGame.settings.foodColor;
        }
        if (snakeGame.settings.scaleEnabled) {
            radius = radius * snakeGame.settings.scale;
        }
        rc.beginPath();
        rc.ellipse(x, y, radius, radius - 1, -0.5 * Math.PI, 0, Math.PI * 2);
        rc.fill();
        rc.closePath();
        rc.beginPath();
        rc.fillStyle = "green";
        rc.ellipse(x + radius - 1, y - radius + 1, radius / 2, radius / 4, -0.25 * Math.PI, 0, Math.PI * 2);
        rc.fill();
        rc.closePath();
    }
    Renew(canvas) {
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        let distance_required = this.radius * 2
        if (x < distance_required) {
            x =  distance_required
        }
        if (x > (canvas.width - distance_required)) {
            x = canvas.width - distance_required;
        }
        if (y < distance_required) {
            y =  distance_required;
        }
        if (y > (canvas.height - distance_required)) {
            y = canvas.height - distance_required;
        }
        this.x = x;
        this.y = y;
    }
}class ActionController {
    constructor(g) {
        // if (!g instanceof SnakeGame) {
        //     throw "improper object";
        // }
        // this.game = g;
    }
    // Action(a, event) {

    // }
    // GoFullScreen() { }
    // Pause() { }
    // Resume() { }
    // DisplayMenu() { }
    // CloseMenu() { }
}

class KeyBoardController extends ActionController {
    constructor() {
        super();
    }
    Setup(snakeGame) {
        document.body[on]("keydown", this.OnKeyDown.bind(this, snakeGame));
    }
    OnKeyDown(snakeGame, e) {
        //debugger;
        const { key } = e;
        switch (key) {
            case "f":
            case "F":
                snakeGame.GoFullScreen();
                break;
            case "z":
            case "Z":
                snakeGame.Pause();
                break;
            case "r":
            case "R":
                snakeGame.Resume();
                break;
            case "m":
            case "M":
                snakeGame.DisplayMenu();
                break;
            case "n":
            case "N":
                // debugger;
                snakeGame.CloseMenu();
                break;
            case "x":
            case "X":
                // snakeGame.Restart();
                break;
            default:
                snakeGame.KeyEvent(key);
        }
    }
}

class OnScreenControls extends ActionController {
    constructor() {
        super();
    }
    /**
     * 
     * @param {SnakeGame} snakeGame 
     */
    Setup(snakeGame) {
        // debugger;
        let buttons = document.body.querySelectorAll('button');

        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i][on]("click", this.OnScreenEvent.bind(this, snakeGame));
        }
    }
    /**
     * 
     * @param {SnakeGame} snakeGame 
     * @param {Event} e 
     */
    OnScreenEvent(snakeGame, e) {
        // debugger;
        let key = e.target.getAttribute("data-app-action");
        switch (key) {
            case "fullscreen":
                snakeGame.GoFullScreen();
                break;
            case "new":
                snakeGame.DisplayNewGameMenu();
                break;
            case "restart":
                snakeGame.Restart();
                break;
            case "settings":
                snakeGame.DisplayMenu();
                break;
            default:
                snakeGame.KeyEvent(key);
        }
    }
}class BaseController {
    constructor(){}
    Left(p){
        if(!p instanceof Player){
            throw "BaseController.Left():incorrect Object"
        }
        p.TurnLeft();
    }
    Right(p){
        if(!p instanceof Player){
            throw "BaseController.Right():incorrect Object"
        }
        p.TurnRight();
    }
    Up(p){
        if(!p instanceof Player){
            throw "BaseController.Up():incorrect Object"
        }
        p.TurnUp();
    }
    Down(p){
        if(!p instanceof Player){
            throw "BaseController.Down():incorrect Object"
        }
        p.TurnDown();
    }
}

class ArrowsController  extends BaseController{
    constructor(){
        super();
    }
    OnKey(p,k){
        switch(k){
            case "ArrowUp":
                super.Up(p);
                break;
            case "ArrowLeft":
                super.Left(p);
                break;
            case "ArrowDown":
                super.Down(p);
                break;
            case "ArrowRight":
                super.Right(p);
                break;
        }
    }
}
class WasdController  extends BaseController{
    constructor(){
        super();
    }
    OnKey(p,k){
        switch(k){
            case "w":
            case "W":
                super.Up(p);
                break;
            case "a":
            case "A":
                super.Left(p);
                break;
            case "s":
            case "S":
                super.Down(p);
                break;
            case "d":
            case "D":
                super.Right(p);
                break;
        }
    }
}

class NumpadController extends BaseController {
    OnKey(p,k){
        switch(k){
            case "8":
                super.Up(p);
                break;
            case "4":
                super.Left(p);
                break;
            case "5":
                super.Down(p);
                break;
            case "6":
                super.Right(p);
                break;
        }
    }
}

class UhjkController extends BaseController {
    OnKey(p,k){
        switch(k){
            case "u":
            case "U":
                super.Up(p);
                break;
            case "h":
            case "H":
                super.Left(p);
                break;
            case "j":
            case "J":
                super.Down(p);
                break;
            case "k":
            case "K":
                super.Right(p);
                break;
        }
    }
}
////
class UIController {
    constructor() { }
    static DisplayScore(game, context, canvas) {
        context.fillStyle = "black";//user setting
        let _text = "|";
        for (const e of game.entityList) {
            _text = _text.concat(`-Score:${e.score}-|`);
        }
        context.beginPath();
        context.font = "22px Arial";
        context.fillText(_text, canvas.width - (24 * _text.length), 30);
        context.closePath();
    }
    static DisplayFPS(game, context, canvas, avg) {
        if (game.settings.enablefps !== true) {
            return;
        }
        context.fillStyle = "black";
        const _time = Date.now();
        let fps = Math.round((1000 / (_time - game.timer1)));
        game.timer1 = _time;
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`${fps} FPS`, canvas.width - 60, 30);
        context.closePath();
    }
    static DisplayTime(context, game) {
        if (game.timed !== true) {
            return;
        }
        context.fillStyle = "black";
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`Time: ${game.time}`, 100, 30);
        context.closePath();
    }
    static Alert(msg) {
        PopAlert.OPEN(msg, "OK");
    }
    static DisplayWelcomeScreen(context) {
        context.fillStyle = "black";
        context.beginPath();
        context.font = "24px Arial";
        context.fillText(`Welcome to Smake game`, 300, 60);
        context.fillText("use arrow keys to navigate", 300, 100);
        context.fillText("Press 'z' to pause game, 'r' to resume, f or F to fullscreen", 300, 140);
        context.fillText("'m' to display settings dialog , 'n' to close that dialog", 300, 180);
        context.closePath();
    }
    static DisplayMultiPlayerControls(context) {
        context.fillStyle = "black";
        context.beginPath();
        context.font = "20px Arial";
        context.fillText("Your are playing local machine mulitplayer", 300, 210);
        context.fillText("Game supports up to 4 players", 300, 240);
        context.fillText("First player uses Arrow controls", 300, 270);
        context.fillText("Second Player uses WASD controls", 300, 300);
        context.fillText("Third player can use numpad (must be present on keyboard)", 300, 330);
        context.fillText("With following controls : 8-UP, 4-LEFT, 5-Down, 6-RIGHT", 300, 360);
        context.fillText("4th player can use UHJK keys ", 300, 390);
        context.fillText("with following controls : U-UP, H-LEFT, J-DOWN, K-RIGHT", 300, 420);
        context.fillText("Press 'z' to pause game, 'r' to resume, f or F to fullscreen", 300, 450);
        context.fillText("'m' to display settings dialog , 'n' to close that dialog", 300, 480);
        context.closePath();
    }
}class Enumer {
    constructor(list) {
        //list must be iterable
        if (!Array.isArray(list) || typeof list[Symbol.iterator] !== 'function') {
            throw "Enumer():Array must be passed";
        }
        const o = Object.create(null);
        for (const l of list) {
            if (typeof l !== "string") {
                throw "Enumer():String was expected"
            }
            this[l] = l;
        }
        Object.freeze(this);
    }
    /**
     * Check if value is valid enum property
     * @param {Value} v 
     */
    valid(v) {
        if (typeof v === "function") {
            return false;
        }
        for (const l in this) {
            if (v === this[l]) { return true; }
        }
        return false;
    }
}const KeyLayouts = {
    Arrows: 1,
    WASD: 2,
    Numpad:3,
    UHJK:4,
    valid: function (m) {
        return m === this.Arrows || m === this.WASD ||m === this.Numpad || m===this.UHJK;
    }
};
Object.freeze(KeyLayouts);

const Directions = {
    Left: 1,
    Right: 2,
    Up: 3,
    Down: 4,
    valid: function (d) {
        return d === this.Left || d === this.Right || d === this.Up || d === this.Down;
    },
    opposite(d1, d2) {
        return (d1 == this.Left && d2 == this.Right) || (d1 == this.Right && d2 == this.Left) ||
            (d1 == this.Up && d2 == this.Down) || (d1 == this.Down && d2 == this.Up);
    }
};
Object.freeze(Directions);

class Player extends Snake {
    constructor(r, v) {
        super(r, v);
        this.score = 0;
        this.alive = true;
        this.settings = {
            snakeColor: "#22af00",
            keyLayout: KeyLayouts.Arrows
        };
        this.TurnLeft();
        this.hash = Utils.Hash16(8);
    }
    AttachController(c) {
        if (!c instanceof BaseController) {
            throw "it's not a controller";
        }
        this.controller = c;
    }
    OnKey (key){
        this.controller.OnKey(this,key);
    }
    SetScore(s) {
        if (!Utils.IsWholeNumber(s)) {
            throw "Whole number needed";
        }
        this.score =s;
    }
    Die(){
        this.alive = false;
    }
    Reanimate(){
        this.alive = true;
    }
    RandomJump(canvas){
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        let distance_required = this.radius * 4
        if (x < distance_required) {
            x =  distance_required
        }
        if (x > (canvas.width - distance_required)) {
            x = canvas.width - distance_required;
        }
        if (y < distance_required) {
            y =  distance_required;
        }
        if (y > (canvas.height - distance_required)) {
            y = canvas.height - distance_required;
        }
        this.SetHeadPosition(x,y);
    }
    GetScore() {
        return this.score;
    }
    ScoreOne() {
        let s = this.GetScore();
        s++;
        this.SetScore(s);
    }
    Draw(rc, snakeGame) {
        super.Draw(rc, snakeGame);
    }
    /**
     * @returns {Direction}
     */
    GetDirection() {
        return this.direction;
    }
    /**
     * changes a direction
     * @param {Direction} d 
     */
    UpdateDirection(d) {
        if (!Directions.valid(d)) {
            throw "Error: not a valid direction";
        }
        this.lastDirection = this.direction;
        this.direction = d;
        this.QuickSwitch();
    }
    TurnUp(){
        this.UpdateDirection(Directions.Up);
    }
    TurnLeft(){
        this.UpdateDirection(Directions.Left);
    }
    TurnDown(){
        this.UpdateDirection(Directions.Down);
    }
    TurnRight(){
        this.UpdateDirection(Directions.Right);
    }
    /**
     * update player
     * @param {Food} food 
     * @param {Canvas} canvas 
     * @param {SnakeGame} game 
     */
    Update(food, canvas,game) {
        if(!this.alive){
            return;
        }
        const poslen = this.positions.length;

        const current = this.GetDirection();
        const { velocity } = this; 

        //follow head
        for (let i = poslen - 1; i > 0; i--) {
            this.positions[i].x = this.positions[i - 1].x;
            this.positions[i].y = this.positions[i - 1].y;
        }
        
        let { x, y } = this.GetHeadPosition();
        if (current == Directions.Right) { this.SetHeadPosition(x + velocity); }
        if (current == Directions.Left) { this.SetHeadPosition(x - velocity); }
        if (current == Directions.Up) { this.SetHeadPosition(null, y - velocity); }
        if (current == Directions.Down) { this.SetHeadPosition(null, y + velocity); }

        //free bound
        this.FreeBound(canvas,game);
        this.Colision(game);
        this.Eat(food, canvas);
    }
    /**
     * this fixes crashin when quickly switching direction to opposite
     */
    QuickSwitch() {
        // debugger;
        const ld = this.lastDirection;
        const d = this.direction;
        if (ld !== undefined) {
            if (Directions.opposite(d, ld)) {
                this.positions.reverse();
            }
        }
        
    }
    Eat(food, canvas) {
        if (food === null){
            return;
        }
        let { x, y } = this.GetHeadPosition();
        //eat food
        if (distance(x, y, food.x, food.y) < this.radius * 2) {
            food.Renew(canvas);
            // this.ScoreOne();
            this.score++;
            this.AddMass();
        }
    }
    /**
     * free bound:  snake moves over bounds
     * @param {HTMLElement} canvas 
     * @param {SnakeGame} game 
     * @param {Boolean} force 
     */
    FreeBound(canvas,game,force) {
        if (game.settings.freeBound || force) {
            let { x, y } = this.GetHeadPosition();
            if (x < 0) this.SetHeadPosition(canvas.width, null);
            if (x > canvas.width) this.SetHeadPosition(0, null);
            if (y < 0) this.SetHeadPosition(null, canvas.height);
            if (y > canvas.height) this.SetHeadPosition(null, 0);
            return;
        }
        this.BoundsCheck(canvas,game);
    }
    BoundsCheck(canvas,game) {
        let { x, y } = this.GetHeadPosition();
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            // debugger;
            this.Die();
            return;
        }
        for (let i = 1, len = this.positions.length; i < len; i++) {
            let p = this.positions[i];
            if (p.x == x && p.y == y) {
                this.Die();
                return;
            }
        }
    }
    Colision(snakeGame) {
        if (snakeGame.entityList.length < 2) {
            return;
        }
        if (snakeGame.settings.moveOver) {
            return;
        }
        const coords = this.GetHeadPosition();
        let x1 = coords.x;
        let y1 = coords.y;
        for(const e of snakeGame.entityList){
            if(e.hash == this.hash){
                continue;
            }            
            
            let {x,y} = e.GetHeadPosition();
            //if head to head both die
            if(Utils.Distance(x1,y1,x,y)<this.radius){
                this.Die();
                e.Die();
                return;
            }
            //the one who hits head, it dies
            for (const p of e.positions) {
                let { x, y } = p;
                if (x1 == x && y1 == y) {
                    this.Die();
                }
            }
            // if (x == x1 && y == y1) { }
        }
    }
}const Modes = new Enumer(["Long", "Endurance", "Challenge"]);
const Level = new Enumer(["Easy", "Normal", "Hard", "Master"]);
const Languages = new Enumer(["English", "Georgian", "German"]);

class SnakeGame {
    /**
     * @param {Modes} _mode 
     * @param {Canvas} _canvas 
     * @param {RenderingContext} rc
     */
    constructor(_mode, _canvas, rc) {
        this.timer1 = Date.now();
        this.score = 0;
        this.metrics = {};//fps
        this.canvas = _canvas;
        this.settings = {
            enablefps: true,
            freeBound: true,
            moveOver: false,
            foodColor: "#ff2af0",
            snakeColor: "#22af00"
        };
        this.timerid = null;
        this.renderingContext = rc;
        this.entityList = [];
        this.SetMode(_mode);
        //this.level = "easy";
    }
    AddEntities(someEntity) {
        if (!someEntity instanceof Snake || someEntity instanceof Food) {
            throw "not a valid entity";
        }
        this.entityList.push(someEntity);
    }
    NewGame(n, s) {
        this.timerid = null;
        // debugger;
        if (typeof s === "object") {
            this.UpdateSettings(s);
            this.SetMode(Modes[s.mode]);
            this.SetLevel(s.level);
        }

        this.entityList = [];
        this.ClearTimers();

        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        let color = "black";
        let ctl = new ArrowsController();
        this.CreatePlayer({ x, y }, color, ctl);
        if (n > 1) {
            let x = this.canvas.width / 4;
            let y = this.canvas.height / 4;
            let color = "green";
            let ctl = new WasdController();
            this.CreatePlayer({ x, y }, color, ctl);
        }
        if (n > 2) {
            let x = this.canvas.width / 2;
            let y = this.canvas.height / 4;
            let color = "orange";
            let ctl = new NumpadController();
            this.CreatePlayer({ x, y }, color, ctl);
        }
        if (n > 3) {
            let x = this.canvas.width / 4;
            let y = this.canvas.height / 2;
            let color = "blue";
            let ctl = new UhjkController();
            this.CreatePlayer({ x, y }, color, ctl);
        }
        let x1 = this.canvas.width / 4;
        let y1 = this.canvas.height / 2;
        let food = new Food(x1, y1, 12);
        //this.AddEntities(food);
        this.food = food;
        this.food.Renew(this.canvas);
        this.Pause();
        this.gameover = false;
    }
    Restart() {
        // debugger;
        this.Pause();
        const { canvas } = this;
        for (const e of this.entityList) {
            if (e instanceof Player) {
                e.Shrink();
                //this doesn't work if players have colided
                e.FreeBound(canvas, this, true);
                e.RandomJump(canvas);
                e.SetScore(0);
                e.Reanimate();
            }
        }
        this.gameover = false;
        this.alerted = false;
        this.Resume();
    }
    /**
     * creates snake
     * @param {Color} c 
     * @param {Position} p 
     */
    CreatePlayer(p, c, controls) {
        let velocity = this.SelectVelocity();
        const player = new Player(12, velocity);
        player.SetHeadPosition(p.x, p.y);
        player.UpdateColor(c);
        player.AttachController(controls);
        this.AddEntities(player);
    }
    SelectVelocity() {
        //pixel per 1/10 second
        let v = 2;
        switch (this.level) {
            case Level.Easy:
                v = 2;
                break;
            case Level.Normal:
                v = 4;
                break;
            case Level.Hard:
                v = 6;
                break;
            case Level.Master:
                v = 8;
                break;
            default:
                v = 2;
        }
        return v;
    }
    SetMode(m) {
        if (!Modes.valid(m)) {
            throw "Not a valid mode";
        }
        this.mode = m;
    }
    SetLevel(l) {
        if (!Level.valid(l)) {
            throw "Not a valid level";
        }
        this.level = l;
    }
    Start() {
        //"r" key to start or resume game
    }
    ClearTimers() {
        if (this.timerid !== null) {
            window.clearInterval(this.timerid);
            this.timerid = null;
        }

    }
    GetEnduranceInterval() {
        let i = 20;
        switch (this.level) {
            case Level.Easy:
                i = 20;
                break;
            case Level.Normal:
                i = 10;
                break;
            case Level.Hard:
            case Level.Master:
                i = 5;
                break;
            default:
                i = 10;
        }
        return i;
    }
    /**
     * Endurance : you gain [point and] mass in every 20 seconds, your intent is to last longer
     * easy every 20 seconds
     * medium every 10 seconds
     * hard every 5 seconds
     * master 5 second and point isn't given for gained mass you need to eat food (only level to feature food);
     */
    EnduranceMode() {
        if (this.timerid !== null) {
            return;
        }
        let interval = this.GetEnduranceInterval() * 1000;
        if (this.level !== Level.Master) {
            this.food = null;
        }

        this.timerid = window.setInterval(() => {
            //debugger;
            const { canvas } = this;
            if (this.gameover) {
                window.clearInterval(this.timerid);
                this.timerid = null;
                return;
            }
            if (this.pause) {
                return;
            }
            for (const e of this.entityList) {
                if (e instanceof Player) {
                    e.AddMass();
                    if (this.level !== Level.Master) {
                        e.score++;
                    }
                }
            }

            //in two player mode if one dies other wins
        }, interval);
        // 
    }
    GetChallengeInterval() {
        let i = 20;
        switch (this.level) {
            case Level.Easy:
                i = 30;
                break;
            case Level.Normal:
                i = 20;
                break;
            case Level.Hard:
                i = 10;
                break;
            case Level.Master:
                i = 5;
                break;
            default:
                i = 20;
        }
        return i;
    }
    ChallengeMode() {
        //challenge mode
        //fruits are dropped and have limited time to be eaten
        //easy if miss no penalty
        //medium if miss penalty on score 1 point (positive constraint)
        //hard if miss warning , loss of tail (3 positions)
        //in multi player who eats pardon, who don shrink
        if (this.timerid !== null) {
            return;
        }
        let SECOND = 1000;
        let interval = this.GetChallengeInterval() * SECOND;

        this.timerid = window.setInterval(() => {
            //debugger;
            if (this.gameover) {
                window.clearInterval(this.timerid);
                this.timerid = null;
                return;
            }
            if (this.pause) {
                return;
            }
            this.food.Renew(this.canvas);
        }, interval);
    }

    UpdatePlayers() {
        if (this.gameover) {
            return;
        }
        if (this.pause) {
            return;
        }
        const canvas = this.canvas;
        let dis = this;
        for (const e of this.entityList) {
            if (e instanceof Player) {
                e.Update(this.food, canvas, dis);
            }
        }
    }
    setUpdater() {
        this.timer3 = window.setInterval(() => {
            this.UpdatePlayers();
        }, 20);
    }
    GetFrame() {
        // if all are dead, then end game
        let i = 0;
        for (const e of this.entityList) {
            if (!e.alive) { i++ };
        }
        if (i === this.entityList.length) {
            this.gameover = true;
            return;
        }
        // debugger;
        let dis = this;
        const renderctx = this.renderingContext;
        const canvas = this.canvas;

        //compensated velocity
        //60fps standard
        //define as pixel/second
        //time between frames
        //update location
        //define map 480x270
        //scale down up

        renderctx.clearRect(0, 0, canvas.width, canvas.height);

        //this.UpdatePlayers();
        //after all entities got update //then draw
        for (const e of this.entityList) {
            if (e instanceof Player) {
                e.Draw(renderctx, this);
            }
        }
        if (this.food !== null) {
            this.food.Draw(renderctx, this);
        }
        UIController.DisplayFPS(this, renderctx, canvas);
        UIController.DisplayScore(this, renderctx, canvas);
    }
    KeyEvent(key) {
        for (const e of this.entityList) {
            if (e instanceof Player) {
                e.OnKey(key);
            }
        }
    }
    Pause() {
        this.pause = true;
    }
    Resume() {
        // debugger;
        if (this.mode === Modes.Endurance) {
            this.EnduranceMode();
        }
        if (this.mode === Modes["Challenge"]) {
            this.ChallengeMode();
        }
        this.pause = false;
    }
    GoFullScreen() {
        //debugger;
        let { canvas } = this;
        canvas.requestFullscreen();
    }
    DisplayFPS() {

    }
    DisplayScore() {

    }
    DisplayMultiControls() {
        const { renderingContext } = this;
        UIController.DisplayMultiPlayerControls(renderingContext);
    }
    DisplayNewGameMenu() {
        NewGameDialog.Open(this);
    }
    CloseMenu() {
        SettingsDialog.Close(this);
    }
    DisplayMenu() {
        SettingsDialog.Open(this);
    }
    UpdateSettings(s) {
        if (typeof s !== "object") {
            throw "UpdateSettings:not an object";
        }
        for (const f in s) {
            if (this.settings[f] === undefined) {
                console.log(`UpdateSettings: ${f} not a setting, skipping`);
                continue;
            }
            this.settings[f] = s[f];
        }
    }
}const translateData ={
    "show_fps_counter":{
        "geo":"კადრმთვლელის გამოჩენა",
        "eng":"Show FPS Counter"
    },
    "enable_dark_mode":{
        "geo":"მუქი ფონის გააქტიურება",
        "eng" :"Enable Dark Mode"
    },
    "game_mode":{
        "geo":"თამაშის ტიპი",
        "eng" :"Game Mode"
    },
    "hardness" : {
        "geo":"სირთულე",
        "eng" :"Hardness"
    },
    "easy" :{
        "geo":"იოლი",
        "eng":"easy"
    },
    "normal":{
        "geo":"ჩვეულებრივი",
        "eng":"normal"
    },
    "hard":{
        "geo":"რთული",
        "eng":"hard"
    },
    "hardest":{
        "geo":"ურთულესი",
        "eng":"hardest"
    },
    "resolution(canvas)":{
        "geo":"",
        "eng":""
    }

}

const Translator = Object.create(null);
Translator.translate =()=>{

}