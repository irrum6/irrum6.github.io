let how = {};
how.loadLevel = function () {
    how.count = 0;
    if (words.length > 0) {
        let word = words.pop();
        document.getElementById("hint").children[0].innerHTML = word.type;
        let len = word.name.length;

        for (let i = 0; i < 12; i++) {
            how.inputOff(i + 1, true);
            how.setLetter(i + 1, "");
        }
        for (let i = 0; i < 26; i++) {
            how.letterOff(i, true);
        }
        for (let i = 0; i < 9; i++) {
            how.animate(i + 1, true);
        }
        if (len < 12) {
            for (let i = len + 1; i < 12 + 1; i++) {
                how.inputOff(i);
            }
        }
        how.letters = word.name.split("").map((elem) => {
            return elem.toUpperCase();
        });
        how.setLetter(1, how.letters[0]);
        how.letters[0] = null;
    }
}
how.key = function (event) {
    let el = event.target;
    let letter = el.innerHTML;
    how.letterOffEl(el);

    if (how.letters.includes(letter)) {
        for (let i = 0, len = how.letters.length; i < len; i++) {
            if (how.letters[i] === letter) {
                how.setLetter(i + 1, letter);
                how.letters[i] = null;
            }
        }
    } else {
        how.animate(++how.count);
    }

    let len = how.letters.filter((elem, index) => {
        return elem !== null;
    }).length;
    if (len == 0 || how.count >= 9) {
        how.loadLevel();
    }
}
/**
 * show part of tree
 * @param {*} index 
 * @param {*} reverse reverse action
 */
how.animate = function (index, reverse) {
    if (typeof index !== "number" || !Number.isInteger(index || index < 1)) {
        return false;
    } else {
        if (typeof reverse !== "undeifined" && reverse !== null && reverse === true) {
            document.getElementById("part" + index).style.stroke = "transparent";
        } else {
            document.getElementById("part" + index).style.stroke = "black";
        }
        return true;
    }
}
/**
 * hide some input lines 
 * used when short words
 * @param {*} index 
 * @param {*} reverse reverse action
 */
how.inputOff = function (index, reverse) {
    if (typeof index !== "number" || !Number.isInteger(index || index < 1)) {
        return false;
    } else {
        if (typeof reverse !== "undeifined" && reverse !== null && reverse === true) {
            document.getElementById("letter" + index).children[1].style.stroke = "black";
        } else {
            document.getElementById("letter" + index).children[1].style.stroke = "transparent";
        }
        return true;
    }
}
/**
 * grey used letters
 * @param {*} index 
 * @param {*} reverse reverse action
 */
how.letterOff = function (index, reverse) {
    if (typeof index !== "number" || !Number.isInteger(index || index < 0)) {
        return false;
    } else {
        let el = document.getElementById("lettergroup").children[index];
        if (typeof reverse !== "undeifined" && reverse !== null && reverse === true) {
            el.style.fill = "black";
            el.setAttribute("onclick", "how.key(event)");
        } else {
            el.style.fill = "grey";
            el.removeAttribute("onclick");
        }
        return true;
    }
}
/**
 * 
 * @param {*} el 
 * @param {*} reverse 
 */
how.letterOffEl = function (el, reverse) {
    if (typeof reverse !== "undeifined" && reverse !== null && reverse === true) {
        el.style.fill = "black";
        el.setAttribute("onclick", "how.key(event)");
    } else {
        el.style.fill = "grey";
        el.removeAttribute("onclick");
    }
    return true;
}
/**
 * 
 * @param {*} index 
 * @param {*} letter 
 */
how.setLetter = function (index, letter) {
    if (typeof index !== "number" || !Number.isInteger(index || index < 1)) {
        return false;
    } else {
        if (typeof letter !== "string" || letter.length > 1) {
            return false;
        } else {
            document.getElementById("letter" + index).children[0].innerHTML = letter;
            return true;
        }
    }
}

how.loadLevel();