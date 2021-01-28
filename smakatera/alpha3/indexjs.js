// import Snake from "snake.js";

const on = "addEventListener";
const query = (s)=>document.body.querySelector(s);
const all = (s)=>document.body.querySelectorAll(s);

const distance = (x1,y1,x2,y2) => Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

// free bound:  snake moves over bounds and can move over itself and other snakes

// game modes
//long
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

try{
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    canvas[on]("fullscreenchange",(e)=>{
        if (document.fullscreenElement){
            canvas.width = window.screen.width;
            canvas.height = window.screen.height;
        }else{
            let style = window.getComputedStyle(canvas.parentElement);
            canvas.width = style.width.replace("px", ""); //*0.95;
            canvas.height = style.height.replace("px", ""); //*0.95;
        }        
    })
    document.body.addEventListener('keydown',(e)=>{
        // debugger
        if (e.key==="f"){
            canvas.requestFullscreen();
        }
    });    
    context.imageSmoothingEnabled = true;
    const snake = new Snake(12, 4, 0);
    const snakeCharmer = new SnakeController(snake,context,"freebound");
    const kbController = new KeyboardController(snakeCharmer);
    
    kbController.Setup();
    
    
    snake.SetHeadPosition(canvas.width/2,canvas.height/2);
    const food = new Food(30,50,12);
    const snakeGame = new SnakeGame(snake, kbController,"long",canvas);

    const hid = new UIController();
    hid.Setup(snakeGame);
    if(window.innerWidth <800){
        var arrowController = new OnScreenArrowsController(snakeCharmer);
        arrowController.Setup();
        snakeGame.settings.scale =  (window.innerWidth / 1280);
        snakeGame.settings.scaleEnabled = true; 
    }
    
    snakeGame.alerted = false;

    const get_frame =()=>{
        if(snakeGame.gameover){            
            if(!snakeGame.alerted){
                hid.Alert("Game Over!");
                snakeGame.alerted = true;
            }
            requestAnimationFrame(get_frame);
            return;
        }

        if(snakeGame.gameover || snakeGame.pause){
            requestAnimationFrame(get_frame);
            return;
        }
        context.clearRect(0,0,canvas.width,canvas.height);
        snakeCharmer.Update(snake,snakeGame,food,canvas); 
        snake.Draw(context,snakeGame);
        food.Draw(context,snakeGame);
        hid.DisplayFPS(snakeGame,context,canvas);        
        hid.DisplayScore(snakeGame,context,canvas);
        requestAnimationFrame(get_frame);
    }
    // debugger;    
    requestAnimationFrame(get_frame);
}catch(e){
    console.log(e);
    console.log(e.message);
}finally{

}