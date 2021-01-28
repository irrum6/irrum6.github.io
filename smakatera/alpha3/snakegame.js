const Modes ={
    Long:1,
    Endurance:2,
    Challenge:3,
    valid: function (m) {
        return m === this.Long || m === this.Endurance || m === this.Challenge;
    }
};

class SnakeGame {
    constructor(s, c,mode,cs){
        this.timer1 = Date.now();
        this.score = 0;
        this.metrics ={};//fps
        this.snake = s;
        this.canvas = cs;
        this.mode = mode;
        this.controller = c;
        this.settings = { 
            enablefps: true,
            freeBound:true,
            foodColor:"#f2af00",
            snakeColor:"#2af000" 
        };
    }
    New(){
        // debugger;
        const {canvas,snake} = this;
        snake.Shrink();
        snake.SetHeadPosition(canvas.width/2,canvas.height/2);
        this.score = 0;
        this.gameover = false;
        this.alerted = false;
    }
}