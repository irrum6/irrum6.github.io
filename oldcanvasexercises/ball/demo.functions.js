function Ball(context, coords, radius, velocity, color) {
    this.x = coords.x;
    this.y = coords.y;
    this.radius = radius;
    this.context = context;
    this.color = color;//"0000C8";
    this.vx = velocity.vx;
    this.vy = velocity.vy;
}

Ball.prototype.draw = function (canvas) {

    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fillStyle = this.color;
    //this.context.strokeStyle = this.color;
    this.context.fill();
};

Ball.prototype.move = function (bounds) {

    if ((this.x + this.radius > bounds.xfar) || (this.x - this.radius < bounds.xclose)) {
        this.vx = this.vx * -1;
    }
    if ((this.y + this.radius > bounds.ylow) || (this.y - this.radius < bounds.yhigh)) {
        this.vy = this.vy * -1;
    }
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

}