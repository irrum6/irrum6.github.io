const on = "addEventListener";
const query = (s)=>document.body.querySelector(s);
const all = (s)=>document.body.querySelectorAll(s);

const distance = (x1,y1,x2,y2) => Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

// free bound:  snake moves over bounds and can move over itself and other snakes

// game modes
//long
// speed 4,6,8,10 - as 1,2,3,4

//fps count
//default 5 frame average, every 5th frame count and display
//user settings applied

try{
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");

    let style = window.getComputedStyle(canvas.parentElement);
    canvas.width = style.width.replace("px", ""); //*0.95;
    canvas.height = style.height.replace("px", ""); //*0.95;

    canvas[on]("fullscreenchange",(e)=>{
        if (document.fullscreenElement){
            window.savedCanvasWidth = canvas.width;
            window.savedCanvasHeight = canvas.height;
            canvas.width = window.screen.width;
            canvas.height = window.screen.height;
        }else{
            canvas.width = window.savedCanvasWidth;
            canvas.height = window.savedCanvasHeight;
        }        
    })
    context.imageSmoothingEnabled = true;

    const snake = new Snake(12, 4, 0);
    const snakeCharmer = new SnakeController(snake,context,"freebound");
    let  inputControler = new KeyboardController(snakeCharmer);    
    
    snake.SetHeadPosition(canvas.width/2,canvas.height/2);
    const food = new Food(30,50,12);
    const snakeGame = new SnakeGame(snake,Modes.Long,canvas);

    const hid = new UIController();
    hid.Setup(snakeGame);
    if(window.innerWidth <800){
        inputControler = new OnScreenArrowsController(snakeCharmer);
        snakeGame.settings.scale =  (window.innerWidth / 1280);
        snakeGame.settings.scaleEnabled = true;
        document.getElementById("new").textContent = "";
        document.getElementById("restart").textContent = ""; 
    }
    inputControler.Setup(true);
    snakeGame.alerted = false;
    // snakeGame.AttachController(inputControler);

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
    //
    document.body[on]('keydown',(e)=>{
        // debugger
        const {key} = e;
        if (key==="f"||key==="F"){
            canvas.requestFullscreen();
        }
        if (key ==="z" || key==="Z"){
            snakeGame.Pause();
        }
        if (key ==="r" || key==="R"){
            snakeGame.Resume();
        }
        if (key ==="m"|| key === "M"){
            hid.DisplayMenu(snakeGame);
        }
        if (key ==="n"|| key === "N"){
            hid.CloseMenu(snakeGame);
        }
        // console.log(e.key);
    });
    query("#fullscreen")[on]("click",()=>{
        canvas.requestFullscreen();
    });
    snakeGame.Pause();
    snake.Draw(context,snakeGame);
    
    if (snakeGame.controller instanceof KeyboardController) {
        
        hid.DisplayWelcomeScreen(context);
    }
    // debugger;    
    requestAnimationFrame(get_frame);
}catch(e){
    console.log(e);
    console.log(e.message);
}finally{

}