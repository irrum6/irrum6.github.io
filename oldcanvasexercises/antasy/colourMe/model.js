//define constructor,properties and methods for drawer class
function drawer(mwidth, mheight, mradius, lWidth, angle, context) {
    var radianSpeed = angle;
    var width = mwidth;
    var height = mheight;
    var lineWidth = lWidth;
    var currentX = 0;
    var currentY = 0;
    var radian = 0;
    var clockWise = false;
    var color = '#FFFFFF';
    var ctx = context;
    var bottomCenter = {
        x: this.width / 2,
        y: this.height + this.lineWidth / 2
    };
    var radius = mradius;

    this.rgb = function () {

        return "#" + Array.prototype.map.call(window.crypto.getRandomValues(new Uint8Array(3)), function (elem) { return elem.toString(16) }).join('');
    };
    this.draw = function () {
        //change angle depending on direction
        if (clockWise) {
            radian = radian + radianSpeed;
        } else {
            radian = radian - radianSpeed;
        }
        //if we got to the edge, change direction
        if (Math.cos(radian) > 0.9999) {
            color = this.rgb();
            clockWise = false;
        } else if (Math.cos(radian) < -0.9999) {
            color = this.rgb();
            clockWise = true;
        }
        ctx.save();
        //start draw again
        ctx.beginPath();
        radius = Math.round(height * Math.random());
        //count next coordinates to move
        currentX = Math.round(bottomCenter.x + radius * Math.cos(radian));
        currentY = Math.round(bottomCenter.y + radius * Math.sin(radian));
        //move
        ctx.moveTo(width / 2, height + lineWidth / 2);
        //draw
        ctx.lineWidth = lineWidth;
        ctx.lineTo(currentX, currentY);
        //fill with color
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    };
    return this;
}