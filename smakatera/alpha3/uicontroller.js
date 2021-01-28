class UIController {
    constructor (){
    }
    Setup(snakegame){
        query("#settings")[on]("click",this.DisplayMenu.bind(this,snakegame));
        query("#new")[on]("click",this.New.bind(this,snakegame));
    }
    New(snakegame){
        snakegame.New();
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
    Alert(msg){
        alert(msg);
    }
    FullScreen (){
        // window.screen.width;
    }
    DisplayMenu(snakegame){       
        SettingsDialog.Open(snakegame);
        snakegame.pause = true;
    }
}