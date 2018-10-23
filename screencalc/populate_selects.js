// var options = new Map();

var options = {
    squarish: ["1/1", "5/4", "4/3"],
    wide: ["3/2", "16/10", "5/3"],
    wider: ["16/9", "17/9"],
    ultrawide: ["18/9", "18.5/9", "19/9", "19.5/9", "21/9"]
}

/**
 * @param {string} select
 * @returns {void}
 */
function populate(select) {
    let s = document.querySelector(select);
    for (var opts in options) {
        let og = document.createElement('optgroup');
        og.label = opts;
        options[opts].forEach(opt => {
            let o = document.createElement("option");
            o.value = opt;
            o.text = opt;
            og.appendChild(o);
        });
        s.appendChild(og);
    }
}

populate("#phratio1");
populate("#phratio2");
