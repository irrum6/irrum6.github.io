const _all = (s) => document.body.querySelectorAll(s);
const _q = (s) => document.body.querySelector(s);

const on = "addEventListener";
const un = "removeEventListener";

export { _q, _all,on,un };