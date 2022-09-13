//
class UIController {
    constructor() { }
    static DisplayScore(game) {
        let displays = document.body.querySelectorAll("span.display");
        let scoreCards = document.body.querySelectorAll("span.score");
        for (let i = 0, len = game.entityList.length; i < len; i++) {
            scoreCards[i].style.visibility = "visible";
            let player = game.entityList[i];
            displays[i].textContent = player.score;
        }
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
        context.fillText("Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen", 300, 140);
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
        context.fillText("Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen", 300, 450);
        context.fillText("'m' to display/dissmis settings dialog , 'n' to open/close new game dialog", 300, 480);
        context.closePath();
    }
}