class Snake {
    constructor(r,v,c){
        this.radius = r;
        this.velocity = v;
        this.positions = [{x:0,y:0}];
        this.mass = 1;
        this.color = c;        
    }
    GetLength(){
        return this.positions.length;
    }
    AddMass(){
        let last = this.positions[this.GetLength()-1];
        this.positions.push({x:last.x,y:last.y});
        this.mass++;
    }
    /** 
     * @param {String} c 
     */
    UpdateColor(c){
        if (typeof c !=="string") return;
        this.color = c; 
    }   
    /**
     * @param {CanvasRenderingContext2D} 
     */
    Draw(rc,snakeGame){
        if (rc.constructor.name != "CanvasRenderingContext2D"){
            throw "not a canvas";
        }
        let {radius } = this;
        rc.fillStyle="black";
        if(snakeGame && snakeGame.settings&& snakeGame.settings.snakeColor){
            rc.fillStyle = snakeGame.settings.snakeColor;
        }
        if(snakeGame.settings.scaleEnabled){
            radius = radius * snakeGame.settings.scale;
        }
        for(const p of this.positions){
            rc.beginPath();
            rc.arc(p.x, p.y, radius, 0, 2* Math.PI);
            rc.fill();
            rc.closePath();
        }
    }
    GetHeadPosition(){
        return this.positions[0];
    }
    SetHeadPosition(x,y){
        if (typeof x == "number" && !Number.isNaN(x)) { this.positions[0].x = x; }
        if (typeof y == "number" && !Number.isNaN(y)) { this.positions[0].y = y; }
    }
}
// export default Snake;