class ActionController {
    constructor (){}
    Setup(){

    }
    Action(a){

    }
}
//class Wasdcontroller extends Playercontroller

class KeyBoardController1 extends ActionController{
    constructor(){
        super();
    }
    Setup(snakeGame){
        document.body[on]("keydown",this.OnKeyDown.bind(this,snakeGame));   
    }
    OnKeyDown(snakeGame,e){
        const {key} = e;
        switch (key){
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