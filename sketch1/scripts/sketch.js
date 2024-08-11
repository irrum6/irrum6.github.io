function _sketch(context) {
    this.context = context;
    //paint it black
    this.color = "#000000";
    //used as line width in shapes and point size in brush
    this.width = 10;
    this.imageState = [];
}
_sketch.prototype.point = function (x, y) {
    let ctx = this.context;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    //width as radius
    ctx.arc(x, y, this.width, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
    ctx.save()
}
//useful in later
_sketch.prototype.addImageData = function (bounds) {
    let imageData = this.context.getImageData(bounds.sx, bounds.sy, bounds.sw, bounds.sh);
    let imageDataElem = { imgdata: imageData, coords: bounds };
    this.imageState.push(imageDataElem);
    //keep only 5 states to operate
    if (this.imageState.length > 5) {
        this.imageState.shift();
    }
}
_sketch.prototype.restoreImageData = function (number) {
    let len = this.imageState.length;
    //get imageData element
    //return last element if number is greater than array length or is negative
    let imageDataElem = (number > -1 && number < len) ? this.imageState[number] : this.imageState[len - 1];

    this.context.putImageData(imageDataElem.imgdata, imageDataElem.coords.sx, imageDataElem.coords.sy);
}
