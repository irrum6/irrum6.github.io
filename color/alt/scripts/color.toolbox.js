var ColorToolBox = (function () {
    /**
     * @param {*} elem 
     */
    function hex(elem) {
        let item = elem.toString(16);
        return item.length > 1 ? item : '0' + item;
    }

    class ToolBox {
        /**
         *Genarate colors im CMYK Color space
         *since there is no native CMYK support in browser this method will return 
         *HSL or hex RGB values instead , using hue value to map CMYK colors
         *hsl(340,100%,50%) example
         *@param {Number} range
         *@param {Number} delta
         *@param {String} mode
         *@returns {String} 
         */
        generateCMYK(range, delta, mode) {
            /**
             * CMYK to RGB conversion formula
             * The R,G,B values are given in the range of 0..255.
             * The red (R) color is calculated from the cyan (C) and black (K) colors:
             * R = 255 × (1-C) × (1-K)
             * The green color (G) is calculated from the magenta (M) and black (K) colors:
             * G = 255 × (1-M) × (1-K)
             * The blue color (B) is calculated from the yellow (Y) and black (K) colors:
             * B = 255 × (1-Y) × (1-K)
             */
            let cmyk = h5.random(4);
            let [min, max, interval] = [range[0], range[1], range[1] - range[0]];
            cmyk = cmyk.map((elem) => Math.floor(((elem * interval + min) * 100)) / 100);
            console.log(cmyk);
            let [cyan, magenta, yellow, key] = cmyk;
            let [dcyan, dmagenta, dyellow, dkey] = cmyk.map((elem) => (elem + delta < max ? elem + delta : elem - delta));

            switch (mode) {
                case "cyan":
                    magenta = 0, yellow = 0, dmagenta = 0, dyellow = 0, key = 0, dkey = 0;
                    break;
                case "magenta":
                    cyan = 0, yellow = 0, dcyan = 0, dyellow = 0, key = 0, dkey = 0;
                    break;
                case "yellow":
                    cyan = 0, magenta = 0, dcyan = 0, dmagenta = 0, key = 0, dkey = 0;
                    break;
                case "black":
                    cyan = 0, magenta = 0, yellow = 0, dcyan = 0, dmagenta = 0, dyellow = 0;
                    break;
                default: break;
            }

            //convert cmyk to rgb and return it
            let red = Math.floor(255 * (1 - cyan) * (1 - key));
            let green = Math.floor(255 * (1 - magenta) * (1 - key));
            let blue = Math.floor(255 * (1 - yellow) * (1 - key));


            console.log(cyan, magenta, yellow, key);
            console.log(red, green, blue);

            let dred = Math.floor(255 * (1 - dcyan) * (1 - dkey));
            let dgreen = Math.floor(255 * (1 - dmagenta) * (1 - dkey));
            let dblue = Math.floor(255 * (1 - dyellow) * (1 - dkey));


            console.log(dcyan, dmagenta, dyellow, dkey);
            console.log(dred, dgreen, dblue);

            let rgb = `#${hex(red)}${hex(green)}${hex(blue)}`;
            let drgb = `#${hex(dred)}${hex(dgreen)}${hex(dblue)}`;

            return { color: rgb, diff: drgb };

        }
        /**
         * Generate colors in RGB Color space
         *@param {Object} range
         *@param {Number} delta
         *@param {String} mode
         *@returns {ColorStringHex} 
         */
        generateRGB(range, delta, mode) {
            let rands = h5.random(3);
            let [min, max, interval] = [range[0], range[1], range[1] - range[0]];
            rands = rands.map((elem) => (Math.round(elem * interval + min)));
            let [red, green, blue] = rands;
            let [dred, dgreen, dblue] = rands.map((elem) => (elem + delta < max ? elem + delta : elem - delta));

            switch (mode) {
                case "red":
                    green = 0, blue = 0, dgreen = 0, dblue = 0;
                    break;
                case "green":
                    red = 0, blue = 0, dred = 0, dblue = 0;
                    break;
                case "blue":
                    red = 0, green = 0, dred = 0, dgreen = 0;
                    break;
                default:
                    break;
            }
            let rgb = `#${hex(red)}${hex(green)}${hex(blue)}`;
            let drgb = `#${hex(dred)}${hex(dgreen)}${hex(dblue)}`;

            return { color: rgb, diff: drgb };
        }
        /**
         * Generate colors in RGB Color space
         *@param {Object} range
         *@param {Number} delta
         *@param {String} mode
         *@returns {ColorStringHex} 
         */
        generate(range, delta, mode) {
            if (["cyan", "magenta", "yellow", "black"].includes(mode)) {
                return this.generateCMYK(range, delta, mode);
            }
            return this.generateRGB(range, delta, mode);
        }
    }
    return new ToolBox();
}())


