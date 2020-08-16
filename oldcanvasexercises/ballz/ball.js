function Ball(coords, radius, velocity, color) {
    this.x = coords.x;
    this.y = coords.y;
    this.radius = radius;
    this.color = color;//"0000C8";
    this.vx = velocity.vx;
    this.vy = velocity.vy;
}

Ball.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = this.color;
    //this.context.strokeStyle = this.color;
    context.fill();
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

Ball.prototype.collide = function (otherBall) {
    //when OO1 <r+r1 balls collide if = touch and if  > are far away
    //lets callcualte OO1 with this formula
    //if O:x,y and O1:x1,y1 then
    //OO1= sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2))
    var distance = sqrt(Math.pow(this.x - otherBall.x, 2) + Math.pow(this.y - otherBall.y, 2));
    //planets collide
    if (distance < this.radius + otherBall.radius) {
        //thing just happened
        //they go opposite
        this.vx = this.vx * -1;
        this.vy = this.vy * -1;
        otherBall.vx = otherBall.vx * -1;
        otherBall.vy = otherBall.vy * -1;
    }
}

