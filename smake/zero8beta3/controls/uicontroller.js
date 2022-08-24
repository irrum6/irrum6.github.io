//
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
        game.updateFPS();
        context.fillStyle = "black";        
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`${game.fps} FPS`, canvas.width - 60, 30);
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