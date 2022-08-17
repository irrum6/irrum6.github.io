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