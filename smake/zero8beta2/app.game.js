class Enumer {
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

class Player extends Vipera {
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
    Draw(rc, game) {
        super.Draw(rc, game);
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
     * @param {game} game 
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
     * free bound:  vipera moves over bounds
     * @param {HTMLElement} canvas 
     * @param {game} game 
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
    Colision(game) {
        if (game.entityList.length < 2) {
            return;
        }
        if (game.settings.moveOver) {
            return;
        }
        const coords = this.GetHeadPosition();
        let x1 = coords.x;
        let y1 = coords.y;
        for(const e of game.entityList){
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

class MontiviperaGame {
    #version;
    #name;
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
            snakeColor: "#c63",
            foodColor: "#cc6"
        };
        this.timerid = null;
        this.renderingContext = rc;
        this.entityList = [];
        this.SetMode(_mode);
        this.#version = "0.8 beta 2"
        this.#name = "Montivipera Redemption"
        //this.level = "easy";
    }
    get version() {
        return this.#version;
    }
    get name(){
        return this.#name;
    }
    AddEntities(someEntity) {
        if (!someEntity instanceof Vipera || someEntity instanceof Food) {
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
     * creates Vipera
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
        NewGameDialog.OpenClose(this,false);
    }
    CloseNewGameMenu() {
        NewGameDialog.OpenClose(this, true);
    }
    ToggleNewGameMenu(){
        NewGameDialog.OpenClose(this);
    }
    CloseMenu() {
        SettingsDialog.OpenClose(this, true);
    }
    DisplayMenu() {
        SettingsDialog.OpenClose(this, false);
    }
    ToggleMenu(){
        SettingsDialog.OpenClose(this);
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