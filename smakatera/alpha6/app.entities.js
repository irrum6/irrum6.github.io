class Snake {
    constructor(r,v){
        this.radius = r;
        this.velocity = v;
        this.positions = [{x:0,y:0}];
        this.mass = 1;
        this.color ="black";      
    }
    UpdateColor(c){
        this.color = c;
    }
    GetLength(){
        return this.positions.length;
    }
    AddMass(){
        let last = this.positions[this.GetLength()-1];
        this.positions.push({x:last.x,y:last.y});
        this.mass++;
        // console.log("mass gained");
    }
    Shrink(m){
        // debugger;
        //if no mass specified shrink all
        let l = this.GetLength();
        if(m===undefined){
            this.positions.splice(0,l-1);
            return;
        }
        this.positions.splice(l-m,m);
    }  
    /**
     * @param {CanvasRenderingContext2D} 
     */
    Draw(rc,snakeGame){
        if (rc.constructor.name != "CanvasRenderingContext2D"){
            throw "not a canvas";
        }
        let {radius } = this;
        rc.fillStyle= this.color;
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
class Food {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    /**
     * @param {CanvasRenderingContext2D} 
     */
    Draw(rc, snakeGame) {
        if (rc.constructor.name != "CanvasRenderingContext2D") {
            throw "not a canvas";
        }
        let { x, y, radius } = this;
        rc.fillStyle = "red";
        if (snakeGame && snakeGame.settings && snakeGame.settings.foodColor) {
            rc.fillStyle = snakeGame.settings.foodColor;
        }
        if (snakeGame.settings.scaleEnabled) {
            radius = radius * snakeGame.settings.scale;
        }
        rc.beginPath();
        rc.ellipse(x, y, radius, radius - 1, -0.5 * Math.PI, 0, Math.PI * 2);
        rc.fill();
        rc.closePath();
        rc.beginPath();
        rc.fillStyle = "green";
        rc.ellipse(x + radius - 1, y - radius + 1, radius / 2, radius / 4, -0.25 * Math.PI, 0, Math.PI * 2);
        rc.fill();
        rc.closePath();
    }
    Renew(canvas) {
        let x = Math.floor(Math.random() * (canvas.width));
        let y = Math.floor(Math.random() * (canvas.height));
        let distance_required = this.radius * 2
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
        this.x = x;
        this.y = y;
    }
}