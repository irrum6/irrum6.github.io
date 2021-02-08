const Modes = {
    Long: 1,
    Endurance: 2,
    Challenge: 3,
    valid: function (m) {
        return m === this.Long || m === this.Endurance || m === this.Challenge;
    }
};

class SnakeGame {
    constructor(s, _mode,_canvas,rc) {
        this.timer1 = Date.now();
        this.score = 0;
        this.metrics = {};//fps
        this.snake = s;
        this.canvas = _canvas;
        this.settings = {
            enablefps: true,
            freeBound: true,
            foodColor: "#ff2af0",
            snakeColor: "#22af00"
        };
        this.renderingContext = rc;
        this.entityList = [];
        this.SetMode(_mode);
        //players
        // single player
        //local multiplayer
        //2 players arrows  + wasd
        //3 players arrows + wasd + numpad  2 4 6 8 //numlock needs to be enabled
        // 4players arrows + wasd + numpad + 

    }
    AddEntities(someEntity){
        if (!someEntity instanceof Snake || someEntity instanceof Food){
            throw "not a valid entity";
        }
        this.entityList.push(someEntity);
    }
    New(uic){

    }
    Restart() {
        // debugger;
        const { canvas, snake } = this;
        snake.Shrink();
        snake.SetHeadPosition(canvas.width / 2, canvas.height / 2);
        this.score = 0;
        this.gameover = false;
        this.alerted = false;
    }
    SetMode(m){
        if (!Modes.valid(m)){
            throw "Not a valid mode";
        }
        this.mode = m;
    }
    DetachController() {
        this.controller = null;
    }

    Start() {
        if (typeof this.controller.Setup === "function") {
            this.controller.Setup();
        }
        //game mode endurance
        //implementation
        // ?
    }
    EnduranceMode() {
        //endurance : you gain [point and] mass in every 10 seconds, your intent is to last longer
        //easy every 10 seconds
        //medium every 5 seconds
        //hard every 2 seconds
        //master every second
        window.setInterval(()=>{
            // for in entities
            //if entity type is snake and snake allive mass +1;
            //corresponding player  score +1;

            //in two player mode if one dies other wins
            //
        });
    }
    GetFrame(){
        //for in entities
        //entities draw
        //for in entities
        //if snake 
        //snakecontroller update
    }
    ChallengeMode() {
        //challenge mode
        //fruits are dropped and have limited time to be eaten
        //easy if miss no penalty
        //medium if miss penalty on score 5 point (positive constraint)
        //hard if miss warning , loss of tail (3 positions)
    }
    Pause() {
        this.pause = true;
    }
    Resume() {
        this.pause = false;
    }
}