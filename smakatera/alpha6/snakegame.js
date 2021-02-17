const Modes = {
    Long: 1,
    Endurance: 2,
    Challenge: 3,
    valid: function (m) {
        return m === this.Long || m === this.Endurance || m === this.Challenge;
    }
};
Object.freeze(Modes);
const Languages = {
    English:1,
    Georgian:2,
    German:3,
    valid: function (m) {
        for(const l in this){
            if (typeof m !=="function" && m===this[l]){return true;}
        }
        return false;
    }
}
Object.freeze(Languages);

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
            foodColor: "#ff2af0",
            snakeColor: "#22af00"
        };
        this.timerid = null;
        this.renderingContext = rc;
        this.entityList = [];
        this.SetMode(_mode);
    }
    AddEntities(someEntity) {
        if (!someEntity instanceof Snake || someEntity instanceof Food) {
            throw "not a valid entity";
        }
        this.entityList.push(someEntity);
    }
    NewGame(n,s) {
        // debugger;
        if (typeof s === "object") {
            this.settings.freeBound = s.freeBound;
            this.settings.moveOver = s.moveOver;
            this.SetMode(Modes[s.mode]);
        }       

        this.entityList = [];

        let x = this.canvas.width/2;
        let y = this.canvas.height/2;
        let color = "black";
        let ctl = new ArrowsController();
        this.CreatePlayer({x,y},color,ctl);
        if (n>1){
            let x = this.canvas.width/4;
            let y = this.canvas.height/4;
            let color = "green";
            let ctl = new WasdController();
            this.CreatePlayer({x,y},color,ctl);
        }
        if (n>2){
            let x = this.canvas.width/2;
            let y = this.canvas.height/4;
            let color = "orange";
            let ctl = new NumpadController();
            this.CreatePlayer({x,y},color,ctl);
        }
        if (n>3){
            let x = this.canvas.width/4;
            let y = this.canvas.height/2;
            let color = "blue";
            let ctl = new UhjkController();
            this.CreatePlayer({x,y},color,ctl);
        }
        let x1 = this.canvas.width/4;
        let y1 = this.canvas.height/2;
        let food = new Food(x1,y1,12);
        //this.AddEntities(food);
        this.food = food;
    }
    Restart() {
        // debugger;
        const { canvas} = this;
        for (const e of this.entityList){
            if (e instanceof Player){
                e.Shrink();
                e.FreeBound(canvas,this,true);
                e.SetScore(0);
            }
        }
        this.gameover = false;
        this.alerted = false;
    }
    /**
     * creates snake
     * @param {Color} c 
     * @param {Position} p 
     */
    CreatePlayer(p,c,controls) {
        const player = new Player(12, 4);
        player.SetHeadPosition(p.x, p.y);
        player.UpdateColor(c);
        player.AttachController(controls);
        this.AddEntities(player);
    }
    SetMode(m) {
        if (!Modes.valid(m)) {
            throw "Not a valid mode";
        }
        this.mode = m;
    }
    Start() {
        //"r" key to start or resume game
    }
    EnduranceMode() {
        //endurance : you gain [point and] mass in every 20 seconds, your intent is to last longer
        //easy every 20 seconds
        //medium every 10 seconds
        //hard every 5 seconds
        //master 5 second and point isn't given for gained mass you need to eat food (only level to feature food);
        window.setInterval(() => {
            // for in entities
            //if entity type is snake and snake allive mass +1;
            //corresponding player  score +1;

            //in two player mode if one dies other wins
            //
        });
    }
    ChallengeMode() {
        //challenge mode
        //fruits are dropped and have limited time to be eaten
        //easy if miss no penalty
        //medium if miss penalty on score 5 point (positive constraint)
        //hard if miss warning , loss of tail (3 positions)
        //in multi player who eats pardon, who don shrink
    }
    tem() {
        let { snake } = this;
        window.setInterval(() => {
            // console.log("1");
            snake.AddMass();
        }, 2 * 1000);
    }
    GetFrame() {
        // debugger;
        let dis = this;
        const renderctx = this.renderingContext;
        const canvas = this.canvas;

        renderctx.clearRect(0,0,canvas.width,canvas.height);

        for (const e of this.entityList){
            if (e instanceof Player){
                e.Update(this.food,canvas,dis);
            }
        }
        //after all entities got update //then draw
        for (const e of this.entityList){
            if (e instanceof Player){
                e.Draw(renderctx,this);
            }
        }
        
        this.food.Draw(renderctx,this);
        UIController.DisplayFPS(this,renderctx,canvas);        
        UIController.DisplayScore(this,renderctx,canvas);
    }
    KeyEvent(key){
        for (const e of this.entityList){
            if (e instanceof Player){
                e.OnKey(key);
            }
        }
    }
    Pause() {
        this.pause = true;
    }
    Resume() {
        this.pause = false;
    }
    GoFullScreen() {
        debugger;
        let { canvas } = this;
        canvas.requestFullscreen();
    }
    DisplayFPS(){

    }
    DisplayScore(){

    }
    DisplayMultiControls(){
        const {renderingContext} = this;
        UIController.DisplayMultiPlayerControls(renderingContext); 
    }
    DisplayNewGameMenu(){
        NewGameDialog.Open(this);
    }
    CloseMenu(){       
        SettingsDialog.Close(this);
    }
    DisplayMenu() {
        SettingsDialog.Open(this);
    }
    UpdateSettings(s){
        if (typeof s !=="object"){
            throw "UpdateSettings:not an object";
        }
        for(const f in s){
            if(this.settings[f] === undefined){
                console.log("UpdateSettings:not a setting, skipping");
                continue;
            }
            this.settings[f] = s[f];
        }
    }
}