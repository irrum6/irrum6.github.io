const Modes = new Enumer(["Long", "Endurance", "Challenge"]);
const Level = new Enumer(["Easy", "Normal", "Hard", "Master"]);
const Languages = new Enumer(["English", "Georgian", "German"]);

class MontiviperaGame {
    #version;
    #name;
    #stats;
    /**
     * @param {Modes} _mode 
     * @param {Canvas} _canvas 
     * @param {RenderingContext} rc
     */
    constructor(_mode, _canvas, rc) {
        this.timer1 = Date.now();
        this.score = 0;
        this.metrics = {};//fps
        this.canvas = _canvas;
        this.settings = {
            enablefps: true,
            enabledelta: true,
            enabledeltalow: false,
            freeBound: true,
            moveOver: false,
            snakeColor: "#c63",
            foodColor: "#cc6"
        };
        this.timerid = null;
        this.renderingContext = rc;
        this.entityList = [];
        this.SetMode(_mode);
        this.#version = "0.8 beta 4"
        this.#name = "Montivipera Redemption"
        this.#stats = Object.create(null);
        this.#stats.frames = 0;
        this.#stats.fps = 0;
        //delta refers to interval from frame to frame
        //max delta is greatest
        this.#stats.delta = 0;
        this.#stats.delta2 = 0;
        this.#stats.maxdelta = 0;
        this.#stats.mindelta = 1000;
        //this.level = "easy";
    }
    get version() {
        return this.#version;
    }
    get name() {
        return this.#name;
    }
    get fps() {
        return this.#stats.fps;
    }
    get delta() {
        return this.#stats.maxdelta;
    }
    get delta2() {
        return this.#stats.mindelta;
    }
    update_delta(num) {
        if (!Number.isInteger(num) || num < 0) {
            return;
        }
        if (num > this.delta) {
            this.#stats.delta = num;
        }
        if (num < this.delta2) {
            this.#stats.delta2 = num;
        }
    }
    increaseFrameCount() {
        this.#stats.frames += 1;
    }
    AddEntities(someEntity) {
        if (!someEntity instanceof Vipera || someEntity instanceof Food) {
            throw "not a valid entity";
        }
        this.entityList.push(someEntity);
    }
    NewGame(n, s) {
        this.timerid = null;
        // debugger;
        if (typeof s === "object") {
            this.UpdateSettings(s);
            this.SetMode(Modes[s.mode]);
            this.SetLevel(s.level);
        }

        this.entityList = [];
        this.ClearTimers();

        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        let color = "black";
        let ctl = new ArrowsController();
        this.CreatePlayer({ x, y }, color, ctl);
        if (n > 1) {
            let x = this.canvas.width / 4;
            let y = this.canvas.height / 4;
            let color = "green";
            let ctl = new WasdController();
            this.CreatePlayer({ x, y }, color, ctl);
        }
        if (n > 2) {
            let x = this.canvas.width / 2;
            let y = this.canvas.height / 4;
            let color = "orange";
            let ctl = new NumpadController();
            this.CreatePlayer({ x, y }, color, ctl);
        }
        if (n > 3) {
            let x = this.canvas.width / 4;
            let y = this.canvas.height / 2;
            let color = "blue";
            let ctl = new UhjkController();
            this.CreatePlayer({ x, y }, color, ctl);
        }
        let x1 = this.canvas.width / 4;
        let y1 = this.canvas.height / 2;
        let food = new Food(x1, y1, 12);
        //this.AddEntities(food);
        this.food = food;
        this.food.Renew(this.canvas);
        this.Pause();
        this.gameover = false;
    }
    Restart() {
        // debugger;
        this.Pause();
        const { canvas } = this;
        for (const e of this.entityList) {
            if (e instanceof Player) {
                e.Shrink();
                //this doesn't work if players have colided
                e.FreeBound(canvas, this, true);
                e.RandomJump(canvas);
                e.SetScore(0);
                e.Reanimate();
            }
        }
        this.gameover = false;
        this.alerted = false;
        this.Resume();
    }
    /**
     * creates Vipera
     * @param {Color} c 
     * @param {Position} p 
     */
    CreatePlayer(p, c, controls) {
        let velocity = this.SelectVelocity();
        const player = new Player(12, velocity);
        player.SetHeadPosition(p.x, p.y);
        player.UpdateColor(c);
        player.AttachController(controls);
        this.AddEntities(player);
    }
    SelectVelocity() {
        //pixel per 1/10 second
        let v = 2;
        switch (this.level) {
            case Level.Easy:
                v = 2;
                break;
            case Level.Normal:
                v = 4;
                break;
            case Level.Hard:
                v = 6;
                break;
            case Level.Master:
                v = 8;
                break;
            default:
                v = 2;
        }
        return v;
    }
    SetMode(m) {
        if (!Modes.valid(m)) {
            throw "Not a valid mode";
        }
        this.mode = m;
    }
    SetLevel(l) {
        if (!Level.valid(l)) {
            throw "Not a valid level";
        }
        this.level = l;
    }
    Start() {
        //"r" key to start or resume game
    }
    ClearTimers() {
        if (this.timerid !== null) {
            window.clearInterval(this.timerid);
            this.timerid = null;
        }

    }
    GetEnduranceInterval() {
        let i = 20;
        switch (this.level) {
            case Level.Easy:
                i = 20;
                break;
            case Level.Normal:
                i = 10;
                break;
            case Level.Hard:
            case Level.Master:
                i = 5;
                break;
            default:
                i = 10;
        }
        return i;
    }
    /**
     * Endurance : you gain [point and] mass in every 20 seconds, your intent is to last longer
     * easy every 20 seconds
     * medium every 10 seconds
     * hard every 5 seconds
     * master 5 second and point isn't given for gained mass you need to eat food (only level to feature food);
     */
    EnduranceMode() {
        if (this.timerid !== null) {
            return;
        }
        let interval = this.GetEnduranceInterval() * 1000;
        if (this.level !== Level.Master) {
            this.food = null;
        }

        this.timerid = window.setInterval(() => {
            //debugger;
            const { canvas } = this;
            if (this.gameover) {
                window.clearInterval(this.timerid);
                this.timerid = null;
                return;
            }
            if (this.pause) {
                return;
            }
            for (const e of this.entityList) {
                if (e instanceof Player) {
                    e.AddMass();
                    if (this.level !== Level.Master) {
                        e.score++;
                    }
                }
            }

            //in two player mode if one dies other wins
        }, interval);
        // 
    }
    GetChallengeInterval() {
        let i = 20;
        switch (this.level) {
            case Level.Easy:
                i = 30;
                break;
            case Level.Normal:
                i = 20;
                break;
            case Level.Hard:
                i = 10;
                break;
            case Level.Master:
                i = 5;
                break;
            default:
                i = 20;
        }
        return i;
    }
    ChallengeMode() {
        //challenge mode
        //fruits are dropped and have limited time to be eaten
        //easy if miss no penalty
        //medium if miss penalty on score 1 point (positive constraint)
        //hard if miss warning , loss of tail (3 positions)
        //in multi player who eats pardon, who don shrink
        if (this.timerid !== null) {
            return;
        }
        let SECOND = 1000;
        let interval = this.GetChallengeInterval() * SECOND;

        this.timerid = window.setInterval(() => {
            //debugger;
            if (this.gameover) {
                window.clearInterval(this.timerid);
                this.timerid = null;
                return;
            }
            if (this.pause) {
                return;
            }
            this.food.Renew(this.canvas);
        }, interval);
    }

    UpdatePlayers() {
        if (this.gameover) {
            return;
        }
        if (this.pause) {
            return;
        }
        const canvas = this.canvas;
        let dis = this;
        for (const e of this.entityList) {
            if (e instanceof Player) {
                e.Update(this.food, canvas, dis);
            }
        }
    }
    setUpdater() {
        this.timer3 = window.setInterval(() => {
            this.UpdatePlayers();
        }, 20);
    }
    //counts fps 
    //counts delta as well
    setFPSCounter() {
        this.timer4 = window.setInterval(() => {
            this.#stats.fps = this.#stats.frames;
            this.#stats.maxdelta = this.#stats.delta;
            this.#stats.mindelta = this.#stats.delta2;
            // reset frame count and delta
            this.#stats.frames = 0;
            this.#stats.delta = 0;
            this.#stats.delta2 = 1000;
        }, 995);
    }
    GetFrame() {
        // if all are dead, then end game
        let i = 0;
        for (const e of this.entityList) {
            if (!e.alive) { i++ };
        }
        if (i === this.entityList.length) {
            this.gameover = true;
            return;
        }

        // debugger;
        let dis = this;
        const renderctx = this.renderingContext;
        const canvas = this.canvas;

        //compensated velocity
        //60fps standard
        //define as pixel/second
        //time between frames
        //update location
        //define map 480x270
        //scale down up

        renderctx.clearRect(0, 0, canvas.width, canvas.height);

        //this.UpdatePlayers();
        //after all entities got update //then draw
        for (const e of this.entityList) {
            if (e instanceof Player) {
                e.Draw(renderctx, this);
            }
        }
        if (this.food !== null) {
            this.food.Draw(renderctx, this);
        }
        const _time = Date.now();
        let delta = _time - this.timer1;
        //save this for later update
        // delta = delta.toFixed(2);
        this.update_delta(delta);
        this.timer1 = _time;
        this.increaseFrameCount();
        UIController.DisplayFPS(this, renderctx, canvas);
        UIController.DisplayFrameDelta(this, renderctx, canvas);
        UIController.DisplayScore(this, renderctx, canvas);
    }
    KeyEvent(key) {
        for (const e of this.entityList) {
            if (e instanceof Player) {
                e.OnKey(key);
            }
        }
    }
    Pause() {
        this.pause = true;
    }
    Resume() {
        // debugger;
        if (this.mode === Modes.Endurance) {
            this.EnduranceMode();
        }
        if (this.mode === Modes["Challenge"]) {
            this.ChallengeMode();
        }
        this.pause = false;
    }
    GoFullScreen() {
        //debugger;
        let { canvas } = this;
        canvas.requestFullscreen();
    }
    DisplayFPS() {

    }
    DisplayScore() {

    }
    DisplayMultiControls() {
        const { renderingContext } = this;
        UIController.DisplayMultiPlayerControls(renderingContext);
    }
    DisplayNewGameMenu() {
        NewGameDialog.OpenClose(this, false);
    }
    CloseNewGameMenu() {
        NewGameDialog.OpenClose(this, true);
    }
    ToggleNewGameMenu() {
        NewGameDialog.OpenClose(this);
    }
    CloseMenu() {
        SettingsDialog.OpenClose(this, true);
    }
    DisplayMenu() {
        SettingsDialog.OpenClose(this, false);
    }
    ToggleMenu() {
        SettingsDialog.OpenClose(this);
    }
    UpdateSettings(s) {
        if (typeof s !== "object") {
            throw "UpdateSettings:not an object";
        }
        for (const f in s) {
            if (this.settings[f] === undefined) {
                console.log(`UpdateSettings: ${f} not a setting, skipping`);
                continue;
            }
            this.settings[f] = s[f];
        }
    }
}