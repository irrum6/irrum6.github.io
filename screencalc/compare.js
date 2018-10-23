//our useful functions
//we need them just herre
/**
* @param {string} str
* @returns {HTMLElement} 
*/
function q(str) {
    if (typeof str !== 'string') {
        throw "Error calling selector, parameter isn't a string";
    }
    let el = document.querySelector(str);

    if (typeof el === 'undefined') {
        throw "Selector not valid, Undefined";
    }
    if (el === null) {
        throw "Selector not valid, null";
    }
    return el;
}
/**
 * @param {string} str
 * @returns {string} 
 */
function val(str) {
    try {
        return q(str).value;
    } catch (err) {
        console.log(err.message);
    } finally {
        // return "";
    }
}
/**
 * @param {string} str
 * @returns {float} 
 */
function float(str) {
    let n = Number.parseFloat(str);
    if (Number.isNaN(n)) {
        throw "String couldn't be parsed to float";
    }
    return n;
}
/**
 * @param {string} str
 * @returns {int} 
 */
function int(str) {
    let n = Number.parseInt(str);
    if (Number.isNaN(n)) {
        throw "String couldn't be parsed to float";
    }
    return n;
}
/**
 * @param {str} str 
 * @param {str} mode
 * @returns {number} 
 */
function parse(str, mode) {
    let n;
    try {
        switch (mode) {
            case "float":
                n = float(str);
                break;
            case "ing":
                n = int(str);
                break;
            default:
                console.log(`mode ${mode}  not supported, using float`);
                n = float(str);
        }
    } catch (err) {
        console.log(err.message);
    }
}

q("button").addEventListener('click', (event) => {
    //phone 1 and 2 diagonal
    let diag1 = float(val("#phdiag1"));
    let diag2 = float(val("#phdiag2"));
    //phone 1 and 2 aspect ratios
    let rat1, rat2;
    //get them
    {
        //get strings and split
        let arr1 = val("#phratio1").split("/");
        let arr2 = val("#phratio2").split("/");
        rat1 = int(arr1[0]) / int(arr1[1]);
        rat2 = int(arr2[0]) / int(arr2[1]);
    }
    //do calculations

    //phone 1 width
    let h1 = Math.sqrt((diag1 * diag1) / (1 + rat1 * rat1));
    let w1 = h1 * rat1;

    let h2 = Math.sqrt((diag2 * diag2) / (1 + rat2 * rat2));
    let w2 = h2 * rat2;

    //console.log(w1, h1);
    //console.log(w2, h2);
    let inches = true;

    //multiplicator
    let m = Math.floor((window.innerWidth * 0.8) / w1);

    q("#phone1").style.width = (m * w1) + 'px';
    q("#phone1").style.height = (m * h1) + 'px';
    q("#phone1").style.backgroundColor = 'green';

    q("#phone2").style.width = (m * w2) + 'px';
    q("#phone2").style.height = (m * h2) + 'px';
    q("#phone2").style.backgroundColor = 'orange';
});