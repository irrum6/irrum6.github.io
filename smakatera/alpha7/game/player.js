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
    },
    opposite(d1, d2) {
        return (d1 == this.Left && d2 == this.Right) || (d1 == this.Right && d2 == this.Left) ||
            (d1 == this.Up && d2 == this.Down) || (d1 == this.Down && d2 == this.Up);
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
        this.hash = Utils.Hash16(8);
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
        if (!Utils.IsWholeNumber(s)) {
            throw "Whole number needed";
        }
        this.score =s;
    }
    Die(){
        this.alive = false;
    }
    Reanimate(){
        this.alive = true;
    }
    RandomJump(canvas){
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        let distance_required = this.radius * 4
        if (x < distance_required) {
            x =  distance_required
        }
        if (x > (canvas.width - distance_required)) {
            x = canvas.width - distance_required;
        }
        if (y < distance_required) {
            y =  distance_required;
        }
        if (y > (canvas.height - distance_required)) {
            y = canvas.height - distance_required;
        }
        this.SetHeadPosition(x,y);
    }
    GetScore() {
        return this.score;
    }
    ScoreOne() {
        let s = this.GetScore();
        s++;
        this.SetScore(s);
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
     * changes a direction
     * @param {Direction} d 
     */
    UpdateDirection(d) {
        if (!Directions.valid(d)) {
            throw "Error: not a valid direction";
        }
        this.lastDirection = this.direction;
        this.direction = d;
        this.QuickSwitch();
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
    /**
     * update player
     * @param {Food} food 
     * @param {Canvas} canvas 
     * @param {SnakeGame} game 
     */
    Update(food, canvas,game) {
        if(!this.alive){
            return;
        }
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
        this.Colision(game);
        this.Eat(food, canvas);
    }
    /**
     * this fixes crashin when quickly switching direction to opposite
     */
    QuickSwitch() {
        // debugger;
        const ld = this.lastDirection;
        const d = this.direction;
        if (ld !== undefined) {
            if (Directions.opposite(d, ld)) {
                this.positions.reverse();
            }
        }
        
    }
    Eat(food, canvas) {
        if (food === null){
            return;
        }
        let { x, y } = this.GetHeadPosition();
        //eat food
        if (distance(x, y, food.x, food.y) < this.radius * 2) {
            food.Renew(canvas);
            // this.ScoreOne();
            this.score++;
            this.AddMass();
        }
    }
    /**
     * free bound:  snake moves over bounds
     * @param {HTMLElement} canvas 
     * @param {SnakeGame} game 
     * @param {Boolean} force 
     */
    FreeBound(canvas,game,force) {
        if (game.settings.freeBound || force) {
            let { x, y } = this.GetHeadPosition();
            if (x < 0) this.SetHeadPosition(canvas.width, null);
            if (x > canvas.width) this.SetHeadPosition(0, null);
            if (y < 0) this.SetHeadPosition(null, canvas.height);
            if (y > canvas.height) this.SetHeadPosition(null, 0);
            return;
        }
        this.BoundsCheck(canvas,game);
    }
    BoundsCheck(canvas,game) {
        let { x, y } = this.GetHeadPosition();
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
            // debugger;
            this.Die();
            return;
        }
        for (let i = 1, len = this.positions.length; i < len; i++) {
            let p = this.positions[i];
            if (p.x == x && p.y == y) {
                this.Die();
                return;
            }
        }
    }
    Colision(snakeGame) {
        if (snakeGame.entityList.length < 2) {
            return;
        }
        if (snakeGame.settings.moveOver) {
            return;
        }
        const coords = this.GetHeadPosition();
        let x1 = coords.x;
        let y1 = coords.y;
        for(const e of snakeGame.entityList){
            if(e.hash == this.hash){
                continue;
            }            
            
            let {x,y} = e.GetHeadPosition();
            //if head to head both die
            if(Utils.Distance(x1,y1,x,y)<this.radius){
                this.Die();
                e.Die();
                return;
            }
            //the one who hits head, it dies
            for (const p of e.positions) {
                let { x, y } = p;
                if (x1 == x && y1 == y) {
                    this.Die();
                }
            }
            // if (x == x1 && y == y1) { }
        }
    }
}