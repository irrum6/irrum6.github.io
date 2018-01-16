class Lib {
    constructor() { }
    /**
     * @param {*} args 
     */
    static isPositiveInteger(...args) {
        if (args.length > 0) {
            for (let i = 0, len = args.length; i < len; i++) {
                if (!Number.isInteger(args[i]) || args[i] < 0) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * Query one element matching selector
     * @param {string} selector 
     */
    static q(selector) {
        //force convert to string and query
        return document.body.querySelector(('' + selector));
    }
    /**
     * Query all elements matching selector
     * @param {string} selector 
     */
    static qa(selector) {
        //force convert to string and query
        return document.body.querySelectorAll(('' + selector));
    }
}