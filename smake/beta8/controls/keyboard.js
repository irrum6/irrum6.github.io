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
}