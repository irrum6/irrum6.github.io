const q = (s) => document.body.querySelector(s);
const on = "addEventListener";
const width = window.innerWidth;
const height = window.innerHeight;

let repbox = q('report-box');
repbox.putValues(width, height, devicePixelRatio);

const darkenToggle = () => {
    darkClassToggle();
    localStorage.dark = localStorage.dark == "true" ? "false" : "true";
}
const darkClassToggle = () => {
    q("#darker").classList.toggle('darkify');
    document.body.classList.toggle('dark');
    q("#transmenu").darken();
    q("#lang").classList.toggle('darkify');
}

q("#darker")[on]("click", (e) => {
    darkenToggle();
});

q("#lang")[on]("click", (e) => {
    q("#transmenu").show();
});

translate();

const isDark = document.body.classList.contains("dark");
const savedDark = (localStorage.dark == "true");
if ((savedDark && !isDark) || (!savedDark && isDark)) {
    darkClassToggle();
}