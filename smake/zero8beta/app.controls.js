class ActionController {
    constructor(g) {
        // if (!g instanceof game) {
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
    Setup(game) {
        document.body[on]("keydown", this.OnKeyDown.bind(this, game));
    }
    OnKeyDown(game, e) {
        //debugger;
        const { key } = e;
        switch (key) {
            case "f":
            case "F":
                game.GoFullScreen();
                break;
            case "z":
            case "Z":
                //z single time revival, if option for lives enabled
                //p pause/resume
                game.Pause();
                break;
            case "r":
            case "R":
                // r restart
                game.Resume();
                break;
            case "m":
            case "M":
                game.ToggleMenu();
                break;
            case "n":
            case "N":
                // debugger;
                game.ToggleNewGameMenu();
                break;
            case "x":
            case "X":
                // die single player only
                // game.Restart();
                break;
            default:
                game.KeyEvent(key);
        }
    }
}

class OnScreenControls extends ActionController {
    constructor() {
        super();
    }
    /**
     * 
     * @param {game} game 
     */
    Setup(game) {
        // debugger;
        let buttons = document.body.querySelectorAll('button');

        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i][on]("click", this.OnScreenEvent.bind(this, game));
        }
    }
    /**
     * 
     * @param {game} game 
     * @param {Event} e 
     */
    OnScreenEvent(game, e) {
        // debugger;
        let key = e.target.getAttribute("data-app-action");
        switch (key) {
            case "fullscreen":
                game.GoFullScreen();
                break;
            case "new":
                game.DisplayNewGameMenu();
                break;
            case "restart":
                game.Restart();
                break;
            case "settings":
                game.DisplayMenu();
                break;
            default:
                game.KeyEvent(key);
        }
    }
}class InputController {
    #name;
    #controls;
    #actions;
    constructor() {
        this.#name = "InputController";
        //key-key, value-action
        this.#controls = new Map();
        this.#actions = new Set(["Left", "Right", "Up", "Down"]);
    }
    setKeys(l, r, u, d) {
        // if some are undefined, throw
        if (l == undefined || r == undefined || u == undefined || d == undefined) {
            Utils.throw(this.name, "not a string");
        }
        this.left = l;
        this.right = r;
        this.up = u;
        this.down = d;
    }

    get name() {
        return this.#name
    }
    //each key can contain multiple leters split by :
    set left(key) {
        //left
        let lefties = key.split(":");
        for (const left of lefties) {
            this.#controls.set(left, "Left")
        }

    }

    set right(key) {
        //right
        let righties = key.split(":");
        for (const right of righties) {
            this.#controls.set(right, "Right")
        }

    }

    set up(key) {
        //ups
        let ups = key.split(":");
        for (const up of ups) {
            this.#controls.set(up, "Up")
        }

    }

    set down(key) {
        //downs
        let downs = key.split(":");
        for (const down of downs) {
            this.#controls.set(down, "Down")
        }
    }

    replaceKey(key, action) {
        if(!this.#actions.has(action)){
            Utils.throw(this.name, "action is not defined");
        }
    }

    getAction(key) {
        return this.#controls.get(key);
    }

    loadConfig(v) {
        let cfgMap = new Map();
        cfgMap.set("Arrows", 0);
        cfgMap.set("WASD", 1);
        cfgMap.set("UHJK", 2);
        cfgMap.set("Numpad", 3);

        if (typeof v === "string") {
            v = cfgMap.get(v);
        }

        let validValues = [0, 1, 2, 3];

        if (!validValues.includes(v)) {
            Utils.throw(this.name, "config number not in list");
        }
        switch (v) {
            case 0:
                this.loadArrows();
                break;
            case 1:
                this.loadWASD();
                break;
            case 2:
                this.loadUHJK();
                break;
            case 3:
                this.loadNumpad();
                break;
        }
    }

    loadArrows() {
        this.left = "ArrowLeft";
        this.right = "ArrowRight";
        this.up = "ArrowUp";
        this.down = "ArrowDown";
    }

    loadWASD() {
        this.left = "a:A";
        this.right = "d:D";
        this.up = "w:W";
        this.down = "s:S";
    }

    loadUHJK() {
        this.left = "h:H";
        this.right = "k:K";
        this.up = "u:U";
        this.down = "j:J";
    }

    loadNumpad() {
        this.left = "4";
        this.right = "6";
        this.up = "8";
        this.down = "5";
    }

    loadDefaultConfig() {
        this.loadConfig(0);
    }
    /**
     * 
     * @param {Player} p 
     * @param {Key} k 
     * @param {Game} g 
     */
    OnKey(p, k, g) {
        if (!p instanceof Player) {
            Utils.throw(this.name, "incorrect Object");
        }
        let action = this.getAction(k);
        switch (action) {
            case "Left":
                p.TurnLeft(g);
                break;
            case "Right":
                p.TurnRight(g);
                break;
            case "Up":
                p.TurnUp(g);
                break;
            case "Down":
                p.TurnDown(g);
                break;
        }
    }
}//
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
        context.fillText(_text, canvas.width - (48 * _text.length), 30);
        context.closePath();
    }
    static DisplayFPS(game, context, canvas, avg) {
        if (game.settings.enablefps !== true) {
            return;
        }
        context.fillStyle = "black";
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`${game.fps} FPS`, canvas.width - 200, 30);
        context.closePath();
    }
    static DisplayFrameDelta(game, context, canvas, avg) {
        if (game.settings.enabledelta !== true) {
            return;
        }
        context.fillStyle = "black";
        context.beginPath();
        context.font = "16px Arial";
        let d = game.delta;
        let d2 = game.delta2;

        if (d > 0) {
            context.fillText(`Δh: ${d}ms`, canvas.width - 130, 30);
        } else {
            context.fillText(`Δh: NA`, canvas.width - 130, 30);
        }

        if (game.settings.enabledeltalow !== true) {
            context.closePath();
            return;
        }

        if (d2 < 1000) {
            context.fillText(`Δl: ${d2}ms`, canvas.width - 60, 30);
        } else {
            context.fillText(`Δl: NA`, canvas.width - 60, 30);
        }
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
        context.fillText(`Welcome to Montivipera Redemption`, 300, 60);
        context.fillText("use arrow keys to navigate", 300, 100);
        context.fillText("Press 'z' to pause game, 'r' to resume, 'f' to fullscreen", 300, 140);
        context.fillText("'m' to display/dissmis settings dialog , 'n' to open/close new game dialog", 300, 180);
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
        context.fillText("Press 'z' to pause game, 'r' to resume, 'f' to fullscreen", 300, 450);
        context.fillText("'m' to display/dissmis settings dialog , 'n' to open/close new game dialog", 300, 480);
        context.closePath();
    }
}