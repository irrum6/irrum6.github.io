function randRGB() {
    return "#" + Array.prototype.map.call(window.crypto.getRandomValues(new Uint8Array(3)), function (elem) {
        return elem < 160 ? (elem + 96).toString(16) : elem.toString(16)
    }).join('');
}
//gives x coordinate
function nextX(angle) {
    return Math.round(200 + 100 * Math.cos(angle));
}
//gives y coordinate
function nextY(angle) {
    return Math.round(200 + 100 * Math.sin(angle));
}