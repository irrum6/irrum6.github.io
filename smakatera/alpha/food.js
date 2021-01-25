class Food{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.radius=r;
    }
    /**
     * @param {CanvasRenderingContext2D} 
     */
    Draw(rc){
        if (rc.constructor.name != "CanvasRenderingContext2D"){
            throw "not a canvas";
        }
        const { x, y, radius } = this;
        rc.fillStyle = "red";
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
    Renew(canvas){
        this.x = Math.floor(Math.random()*(canvas.width));
        this.y = Math.floor(Math.random()*(canvas.height));
    }
}