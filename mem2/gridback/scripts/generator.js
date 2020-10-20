//script globals
let [a, b, c, d] = [Date.now(), Date.now(), Date.now(), Date.now()];

/**
 * generate next random number using rng
 * the order of abcd shall be maintained by external party
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @return {Number} e 
 */

const rng_next = (a, b, c, d) => {
    let tmp = a ^ (a << 15);
    return (d ^ (d >> 21)) ^ (tmp ^ (tmp >> 4));
}

const next = () => {
    let e = rng_next(a, b, c, d);
    a = b;
    b = c;
    c = d;
    d = e;
}   
/**
 * react on message
 * @param {Event} e 
 */
const onMessageEvent = (e) =>{
    if (e.data === null || e.data.msg === undefined) {
        let msgback = "nodata";
        postMessage({ msgback });
        return;
    }
    let {msg} = e.data;

    if (e.data.msg === "next") {
        let {mod} = e.data;        
        postMessage({ msg, msgback: a % mod });
        next();
        return;
    }
}

// run few times
next(); next(); next(); next(); next(); next();

self.addEventListener('message',onMessageEvent);