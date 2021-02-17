// game modes
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

    const snakeGame = new SnakeGame(Modes.Long,canvas,context);
    snakeGame.NewGame(1,undefined);

    if(window.innerWidth <800){
        snakeGame.settings.scale =  (window.innerWidth / 1280);
        snakeGame.settings.scaleEnabled = true;
        document.getElementById("new").textContent = "";
        document.getElementById("restart").textContent = ""; 
    }
    snakeGame.alerted = false;

    const get_frame =()=>{
        if(snakeGame.gameover){            
            if(!snakeGame.alerted){
                UIController.Alert("Game Over!");
                snakeGame.alerted = true;
            }
            requestAnimationFrame(get_frame);
            return;
        }

        if(snakeGame.gameover || snakeGame.pause){
            requestAnimationFrame(get_frame);
            return;
        }
        
        snakeGame.GetFrame();
        requestAnimationFrame(get_frame);
    }
    query("#fullscreen")[on]("click",()=>{
        canvas.requestFullscreen();
    });
    snakeGame.Pause();

    snakeGame.GetFrame();
    
    const kb1 = new KeyBoardController();
    kb1.Setup(snakeGame);

    const osc = new OnScreenControls();
    osc.Setup(snakeGame);

    if(window.innerWidth > 1000){
        UIController.DisplayWelcomeScreen(context);
    }

    requestAnimationFrame(get_frame);
}catch(e){
    console.log(e);
    console.log(e.message);
}finally{

}