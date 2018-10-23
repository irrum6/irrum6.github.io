class ColorToolBox {
    /**
     *Genarate colors im CMYK Color space
     *since there is no native CMYK support in browser this method will return 
     *HSL values instead , using hue value to map CMYK colors
     *hsl(340,100%,50%) example
     * or hex rgb just
     *@param range
     *@param delta
     *@param mode 
     */
    static generateCMYK(range, delta, mode) {
        // let cyan = "#00FFFF";
        // let magenta = "#FF00FF";
        // let yellow = "#FFFF00";
        // let key = "#000000";
        
    }
    /**
     * Generate colors in RGB Color space
     *@param range
     *@param delta
     *@param mode 
     */
    static generateRGB(range, delta, mode) {

    }
}