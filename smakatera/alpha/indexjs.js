// import Snake from "snake.js";

const on = "addEventListener";
const query = (s)=>document.body.querySelector(s);
const all = (s)=>document.body.querySelectorAll(s);

const distance = (x1,y1,x2,y2) => Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

// game modes
//free bound:
// speed 4,6,8,10 - as 1,2,3,4

//endurance : you gain [point and] mass in every 10 seconds, your intent is to last longer
//easy every 10 seconds
//medium every 5 seconds
//hard every 2 seconds
//master every second

//challenge mode
//fruits are dropped and have limited time to be eaten
//easy if miss no penalty
//medium if miss penalty on score 5 point (positive constraint)
//hard if miss warning , loss of tail (3 positions)

//fps count
//default 5 frame average, every 5th frame count and display
//user settings applied

class UIController {
    constructor (){
    }
    Setup(snakegame){
        query("#settings")[on]("click",this.DisplayMenu.bind(this,snakegame));
    }
    DisplayScore(game,context,canvas){
        context.fillStyle = "black";//user setting
        const _text = `Score:${game.score}`;
        context.beginPath();
        context.font = "24px Arial";
        context.fillText(_text, canvas.width-(24*_text.length), 30);
        context.closePath();        
    }
    DisplayFPS(game,context,canvas,avg){
        if(game.settings.enablefps!==true){
            return;
        }
        context.fillStyle = "black";
        const _time = Date.now();
        let fps = Math.round((1 / (_time - game.timer1)) * 1000);
        game.timer1 = _time;
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`${fps} FPS`,10, 30);
        context.closePath();
    }
    DisplayTime(context,game){

    }
    DisplayMenu(snakegame){
        // display fps yes no
        //game mode freeboudn endurance challenge
        //snake color
        // text color
        //fps count way
        SettingsDialog.Open(snakegame);
    }
}

const Modes ={
    FreeBound:1,
    Endurance:2,
    Challenge:3,
    valid: function (m) {
        return m === this.FreeBound || m === this.Endurance || m === this.Challenge;
    }
};
class SnakeGame {
    constructor(s, c,mode){
        this.timer1 = Date.now();
        this.score = 0;
        this.metrics ={};//fps
        this.snake = s;
        this.mode = mode;
        this.controller = c;
        this.settings={};
    }
}

try{
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;
    const snake = new Snake(12, 4, 0);
    const snakeCharmer = new SnakeController(snake,context,"freebound");
    const kbController = new KeyboardController(snakeCharmer);
    
    kbController.Setup();
    // const arrowController = new OnScreenArrowsController(snakeCharmer);
    // arrowController.Setup();
    snake.SetHeadPosition(canvas.width/2,canvas.height/2);
    const food = new Food(30,50,12);
    const snakeGame = new SnakeGame(snake, kbController,"freebound");

    const hid = new UIController();
    hid.Setup(snakeGame);
    
    const get_frame =()=>{
        context.clearRect(0,0,canvas.width,canvas.height);
        // snakeCharmer.Update(snakeGame,food,canvas);//=>
        snakeCharmer.Update(snake,snakeGame,food,canvas); 
        snake.Draw(context,snakeGame);
        food.Draw(context);
        hid.DisplayFPS(snakeGame,context,canvas);        
        hid.DisplayScore(snakeGame,context,canvas);
        requestAnimationFrame(get_frame);
    }    
    requestAnimationFrame(get_frame);
}catch(e){
    console.log(e);
    console.log(e.message);
}finally{

}