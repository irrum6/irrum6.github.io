let rand = {
    /**
     * returns random number in range [0,1]
     * @param {void}
     * @return {float}
     */
    random: function () {
        var rands = new Uint32Array(1);
        window.crypto.getRandomValues(rands);
        return rands[0] / 4294967296;
    },
    /**
     * same as above but return three numbers instead
     * @param {void}
     * @return {array}
     */
    random3: function () {
        var rands = new Uint32Array(3);
        window.crypto.getRandomValues(rands);
        return Array.prototype.map.call(rands, (elem) => {
            return elem / 4294967296;
        });
    }
}