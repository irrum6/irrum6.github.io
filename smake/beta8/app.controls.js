class ActionController {
    constructor(g) {
        // if (!g instanceof SnakeGame) {
        //     throw "improper object";
        // }
        // this.game = g;
    }
    // Action(a, event) {

    // }
    // GoFullScreen() { }
    // Pause() { }
    // Resume() { }
    // DisplayMenu() { }
    // CloseMenu() { }
}

class KeyBoardController extends ActionController {
    constructor() {
        super();
    }
    Setup(snakeGame) {
        document.body[on]("keydown", this.OnKeyDown.bind(this, snakeGame));
    }
    OnKeyDown(snakeGame, e) {
        //debugger;
        const { key } = e;
        switch (key) {
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
                // debugger;
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

class OnScreenControls extends ActionController {
    constructor() {
        super();
    }
    /**
     * 
     * @param {SnakeGame} snakeGame 
     */
    Setup(snakeGame) {
        // debugger;
        let buttons = document.body.querySelectorAll('button');

        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i][on]("click", this.OnScreenEvent.bind(this, snakeGame));
        }
    }
    /**
     * 
     * @param {SnakeGame} snakeGame 
     * @param {Event} e 
     */
    OnScreenEvent(snakeGame, e) {
        // debugger;
        let key = e.target.getAttribute("data-app-action");
        switch (key) {
            case "fullscreen":
                snakeGame.GoFullScreen();
                break;
            case "new":
                snakeGame.DisplayNewGameMenu();
                break;
            case "restart":
                snakeGame.Restart();
                break;
            case "settings":
                snakeGame.DisplayMenu();
                break;
            default:
                snakeGame.KeyEvent(key);
        }
    }
}class BaseController {
    constructor(){}
    Left(p){
        if(!p instanceof Player){
            throw "BaseController.Left():incorrect Object"
        }
        p.TurnLeft();
    }
    Right(p){
        if(!p instanceof Player){
            throw "BaseController.Right():incorrect Object"
        }
        p.TurnRight();
    }
    Up(p){
        if(!p instanceof Player){
            throw "BaseController.Up():incorrect Object"
        }
        p.TurnUp();
    }
    Down(p){
        if(!p instanceof Player){
            throw "BaseController.Down():incorrect Object"
        }
        p.TurnDown();
    }
}

class ArrowsController  extends BaseController{
    constructor(){
        super();
    }
    OnKey(p,k){
        switch(k){
            case "ArrowUp":
                super.Up(p);
                break;
            case "ArrowLeft":
                super.Left(p);
                break;
            case "ArrowDown":
                super.Down(p);
                break;
            case "ArrowRight":
                super.Right(p);
                break;
        }
    }
}
class WasdController  extends BaseController{
    constructor(){
        super();
    }
    OnKey(p,k){
        switch(k){
            case "w":
            case "W":
                super.Up(p);
                break;
            case "a":
            case "A":
                super.Left(p);
                break;
            case "s":
            case "S":
                super.Down(p);
                break;
            case "d":
            case "D":
                super.Right(p);
                break;
        }
    }
}

class NumpadController extends BaseController {
    OnKey(p,k){
        switch(k){
            case "8":
                super.Up(p);
                break;
            case "4":
                super.Left(p);
                break;
            case "5":
                super.Down(p);
                break;
            case "6":
                super.Right(p);
                break;
        }
    }
}

class UhjkController extends BaseController {
    OnKey(p,k){
        switch(k){
            case "u":
            case "U":
                super.Up(p);
                break;
            case "h":
            case "H":
                super.Left(p);
                break;
            case "j":
            case "J":
                super.Down(p);
                break;
            case "k":
            case "K":
                super.Right(p);
                break;
        }
    }
}
////
class UIController {
    constructor() { }
    static DisplayScore(game, context, canvas) {
        context.fillStyle = "black";//user setting
        let _text = "|";
        for (const e of game.entityList) {
            _text = _text.concat(`-Score:${e.score}-|`);
        }
        context.beginPath();
        context.font = "22px Arial";
        context.fillText(_text, canvas.width - (24 * _text.length), 30);
        context.closePath();
    }
    static DisplayFPS(game, context, canvas, avg) {
        if (game.settings.enablefps !== true) {
            return;
        }
        context.fillStyle = "black";
        const _time = Date.now();
        let fps = Math.round((1000 / (_time - game.timer1)));
        game.timer1 = _time;
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`${fps} FPS`, canvas.width - 60, 30);
        context.closePath();
    }
    static DisplayTime(context, game) {
        if (game.timed !== true) {
            return;
        }
        context.fillStyle = "black";
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`Time: ${game.time}`, 100, 30);
        context.closePath();
    }
    static Alert(msg) {
        PopAlert.OPEN(msg, "OK");
    }
    static DisplayWelcomeScreen(context) {
        context.fillStyle = "black";
        context.beginPath();
        context.font = "24px Arial";
        context.fillText(`Welcome to Smake game`, 300, 60);
        context.fillText("use arrow keys to navigate", 300, 100);
        context.fillText("Press 'z' to pause game, 'r' to resume, f or F to fullscreen", 300, 140);
        context.fillText("'m' to display settings dialog , 'n' to close that dialog", 300, 180);
        context.closePath();
    }
    static DisplayMultiPlayerControls(context) {
        context.fillStyle = "black";
        context.beginPath();
        context.font = "20px Arial";
        context.fillText("Your are playing local machine mulitplayer", 300, 210);
        context.fillText("Game supports up to 4 players", 300, 240);
        context.fillText("First player uses Arrow controls", 300, 270);
        context.fillText("Second Player uses WASD controls", 300, 300);
        context.fillText("Third player can use numpad (must be present on keyboard)", 300, 330);
        context.fillText("With following controls : 8-UP, 4-LEFT, 5-Down, 6-RIGHT", 300, 360);
        context.fillText("4th player can use UHJK keys ", 300, 390);
        context.fillText("with following controls : U-UP, H-LEFT, J-DOWN, K-RIGHT", 300, 420);
        context.fillText("Press 'z' to pause game, 'r' to resume, f or F to fullscreen", 300, 450);
        context.fillText("'m' to display settings dialog , 'n' to close that dialog", 300, 480);
        context.closePath();
    }
}