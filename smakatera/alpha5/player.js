const KeyLayouts = {
    Arrows: 1,
    WASD: 2,
    Numpad:3,
    UHJK:4,
    valid: function (m) {
        return m === this.Arrows || m === this.WASD ||m === this.Numpad || m===this.UHJK;
    }
};
Object.freeze(KeyLayouts);

const Directions = {
    Left: 1,
    Right: 2,
    Up: 3,
    Down: 4,
    valid: function (d) {
        return d === this.Left || d === this.Right || d === this.Up || d === this.Down;
    }
};
Object.freeze(Directions);

class Player extends Snake {
    constructor(r, v) {
        super(r, v);
        this.score = 0;
        this.alive = true;
        this.settings = {
            snakeColor: "#22af00",
            keyLayout: KeyLayouts.Arrows
        };
        this.TurnLeft();
    }
    AttachController(c) {
        if (!c instanceof BaseController) {
            throw "it's not a controller";
        }
        this.controller = c;
    }
    OnKey (key){
        this.controller.OnKey(this,key);
    }
    SetScore(s) {
        if (!Number.isInteger(s) || s < 0) {
            throw "Whole number needed";
        }
    }
    GetScore() {
        return this.score;
    }
    Score() {
        let s = this.GetScore();
        this.SetScore(++s);
    }
    Draw(rc, snakeGame) {
        super.Draw(rc, snakeGame);
    }
    /**
     * @returns {Direction}
     */
    GetDirection() {
        return this.direction;
    }
    /**
     * 
     * @param {Direction} d 
     */
    UpdateDirection(d) {
        if (!Directions.valid(d)) {
            throw "Error: not a valid direction";
        }
        this.direction = d;
    }
    TurnUp(){
        this.UpdateDirection(Directions.Up);
    }
    TurnLeft(){
        this.UpdateDirection(Directions.Left);
    }
    TurnDown(){
        this.UpdateDirection(Directions.Down);
    }
    TurnRight(){
        this.UpdateDirection(Directions.Right);
    }
    Update(food, canvas,game) {
        const poslen = this.positions.length;

        const current = this.GetDirection();
        const { velocity } = this;

        //follow head
        for (let i = poslen - 1; i > 0; i--) {
            this.positions[i].x = this.positions[i - 1].x;
            this.positions[i].y = this.positions[i - 1].y;
        }

        let { x, y } = this.GetHeadPosition();
        if (current == Directions.Right) { this.SetHeadPosition(x + velocity); }
        if (current == Directions.Left) { this.SetHeadPosition(x - velocity); }
        if (current == Directions.Up) { this.SetHeadPosition(null, y - velocity); }
        if (current == Directions.Down) { this.SetHeadPosition(null, y + velocity); }

        //free bound
        this.FreeBound(canvas,game);
        this.Eat(food, canvas);
    }
    Eat(food, canvas) {
        if (food === null){
            return;
        }
        let { x, y } = this.GetHeadPosition();
        //eat food
        if (distance(x, y, food.x, food.y) < this.radius * 2) {
            food.Renew(canvas);
            this.score++;
            this.AddMass();
        }
    }
    FreeBound(canvas,game) {
        if (game.settings.freeBound !== true) {
            this.BoundsCheck(canvas);
            return;
        } //{return;}
        let { x, y } = this.GetHeadPosition();
        if (x < 0) this.SetHeadPosition(canvas.width, null);
        if (x > canvas.width) this.SetHeadPosition(0, null);
        if (y < 0) this.SetHeadPosition(null, canvas.height);
        if (y > canvas.height) this.SetHeadPosition(null, 0);
    }
    BoundsCheck(canvas) {
        let { x, y } = this.GetHeadPosition();
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            // debugger;
            game.gameover = true;
            game.score = 0;
            return;
        }
        for (let i = 1, len = snake.positions.length; i < len; i++) {
            let p = snake.positions[i];
            if (p.x == x && p.y == y) {
                // debugger;
                game.gameover = true;
                // game.score = 0;
                return;
            }
        }
    }
    MoveOver(game) {
        // depending on game settings player can mover over eacher other or crash trying doing so
        // only in multiplayer
        // for in other players
        //if positions match with head crash
    }
}