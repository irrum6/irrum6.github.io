const q = (s) => document.body.querySelector(s);
const on = "addEventListener";
const width = window.innerWidth;
const height = window.innerHeight;

let repbox = q('report-box');
repbox.putValues(width, height, devicePixelRatio);

q("#darker")[on]("click", (e) => {
    e.target.classList.toggle('darkify');
    document.body.classList.toggle('dark');
    q("#transmenu").darken();
});

q("#lang")[on]("click", (e) => {
    q("#transmenu").show();
});