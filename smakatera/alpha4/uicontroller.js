class UIController {
    constructor() { }
    Setup(snakegame) {
        query("#settings")[on]("click", this.DisplayMenu.bind(this, snakegame));
        query("#restart")[on]("click", this.Restart.bind(this, snakegame));
    }
    New(snakegame) {
        snakegame.New();
    }
    Restart(snakegame){
        snakegame.Restart();
    }
    PutTextOnCanvas(ctx, text, x, y) {

    }
    DisplayScore(game, context, canvas) {
        context.fillStyle = "black";//user setting
        const _text = `Score:${game.score}`;
        context.beginPath();
        context.font = "24px Arial";
        context.fillText(_text, canvas.width - (24 * _text.length), 30);
        context.closePath();
    }
    DisplayFPS(game, context, canvas, avg) {
        if (game.settings.enablefps !== true) {
            return;
        }
        context.fillStyle = "black";
        const _time = Date.now();
        let fps = Math.round((1000 / (_time - game.timer1)));
        game.timer1 = _time;
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`${fps} FPS`, 10, 30);
        context.closePath();
    }
    DisplayTime(context, game) {
        if (game.timed !== true) {
            return;
        }
        context.fillStyle = "black";
        context.beginPath();
        context.font = "16px Arial";
        context.fillText(`Time: ${game.time}`, 100, 30);
        context.closePath();
    }
    Alert(msg) {
        alert(msg);
    }
    FullScreen() {
        // window.screen.width;
    }
    DisplayNewMenu(snakegame){}
    DisplayMenu(snakegame) {
        SettingsDialog.Open(snakegame);
    }
    CloseMenu(snakegame){
        SettingsDialog.Close(snakegame);
    }
    DisplayWelcomeScreen(context) {
        context.fillStyle = "black";
        context.beginPath();
        context.font = "30px Arial";
        context.fillText(`Welcome to Smake game`, 300, 60);
        context.fillText("use arrow keys to navigate", 300, 100);
        context.fillText("Press 'j' to pause game, 'r' to resume, f or F to fullscreen", 300, 140);
        context.closePath();

    }
}