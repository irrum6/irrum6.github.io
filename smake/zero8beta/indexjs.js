// game modes
// speed 4,6,8,10 - as 1,2,3,4

//fps count
//default 5 frame average, every 5th frame count and display
//user settings applied

try {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");

    let style = window.getComputedStyle(canvas.parentElement);
    canvas.width = style.width.replace("px", ""); //*0.95;
    canvas.height = style.height.replace("px", ""); //*0.95;

    canvas[on]("fullscreenchange", (e) => {
        if (document.fullscreenElement) {
            window.savedCanvasWidth = canvas.width;
            window.savedCanvasHeight = canvas.height;
            canvas.width = window.screen.width;
            canvas.height = window.screen.height;
        } else {
            canvas.width = window.savedCanvasWidth;
            canvas.height = window.savedCanvasHeight;
        }
    })
    context.imageSmoothingEnabled = true;

    const viperaGame = new MontiviperaGame(Modes.Long, canvas, context);
    viperaGame.NewGame(1, undefined);

    viperaGame.alerted = false;

    const get_frame = () => {
        if (viperaGame.gameover) {
            if (!viperaGame.alerted) {
                UIController.Alert("Game Over!");
                viperaGame.alerted = true;
            }
            requestAnimationFrame(get_frame);
            return;
        }

        if (viperaGame.gameover || viperaGame.pause) {
            requestAnimationFrame(get_frame);
            return;
        }

        viperaGame.GetFrame();
        requestAnimationFrame(get_frame);
    }
    query("#fullscreen")[on]("click", () => {
        canvas.requestFullscreen();
    });
    viperaGame.Pause();

    viperaGame.setUpdater();
    viperaGame.setFPSCounter();
    viperaGame.GetFrame();

    const kb1 = new KeyBoardController();
    kb1.Setup(viperaGame);

    const osc = new OnScreenControls();
    osc.Setup(viperaGame);
    UIController.DisplayWelcomeScreen(context);
    requestAnimationFrame(get_frame);
} catch (e) {
    console.log(e);
    console.log(e.message);
} finally {

}