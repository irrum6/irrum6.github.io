import Game from "./scripts/game.js";
import GameInterface from "./scripts/interface.js";

const run = () => {
    try {
        var game = new Game();
        var ginterface = new GameInterface(game);
        ginterface.sethandlers();
        game.loadGenerator(ginterface);
    }
    catch (e) {
        console.log(e.message);
        console.log(e);
    }
}

const launcher = () => {
    if (window.Worker === undefined) {
        Document.write("Browser doesn't support WebWorkers");
        return;
    }
    if (window.localStorage === undefined) {
        Document.write("Browser doesn't support LocalStorage");
        return;
    }
    run();
}

launcher();//@2020-10-20T14:02+04:00
