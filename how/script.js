class Grep {
    /**
     * Query one element matching selector
     * @param {String} selector 
     */
    static q(selector) {
        //force convert to string and query
        return document.body.querySelector(('' + selector));
    }
    /**
     * Query all elements matching selector
     * @param {String} selector 
     */
    static qa(selector) {
        //force convert to string and query
        return document.body.querySelectorAll(('' + selector));
    }
}

//Helper class
//methods for dom manipulation
class HowDomHelper {
    /**
     * when key is clicked
     * @param {EventObject} event 
     * @param {How} how
     */
    static Key(event, how) {
        let el = event.target;
        let letter = el.innerHTML;

        if (letter === "SPACE") {
            letter = " ";
        }


        let index = el.getAttribute("self-index");

        if (el.getAttribute("self-active") === "active") {
            if (how.letters.includes(letter)) {
                for (let i = 0, len = how.letters.length; i < len; i++) {
                    if (how.letters[i] === letter) {
                        HowDomHelper.SetLetter(i + 1, letter);
                        how.letters[i] = null;
                    }
                }
            } else {
                this.AnimateTreePart(++how.count);
                console.log(how.count);
            }

            let letters = how.letters.filter((elem, index) => {
                return elem !== null;
            });
            let len = letters.length;
            if (len === 0) {
                let int = setTimeout(() => {
                    how.LoadLevel();
                    clearTimeout(int)
                }, 2000);
            }
            if (how.count >= 9 && len > 0) {
                console.log(how.count);
                this.AnimateTreePart(how.count);
                let int = setTimeout(() => {
                    how.LoadLevel();
                    clearTimeout(int)
                }, 3000);
                for (let i = 0, leng = how.letters.length; i < leng; i++) {
                    if (how.letters[i] !== null) {
                        HowDomHelper.SetLetter(i + 1, how.letters[i]);
                    }
                }
            }
        }

        HowDomHelper.SetLetterPassive(parseInt(index));
    }

    static SetupKeyboard(how) {
        let keys = Grep.qa("#lettergroup>text");
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            keys[i].addEventListener('click', () => {
                HowDomHelper.Key(event, how);
            });
            keys[i].setAttribute("self-index", i);
            keys[i].setAttribute("self-active", "active");
        }
    }
    /**
     * 
     * @param {Number} index 
     * @param {Boolean} reverse 
     */
    static AnimateTreePart(index, reverse) {
        if (typeof index !== "number" || !Number.isInteger(index) || index < 1) {
            return false;
        } else {
            if (typeof reverse === "boolean" && reverse) {
                Grep.q("#part" + index).style.stroke = "transparent";
            } else {
                Grep.q("#part" + index).style.stroke = "black";
            }
            return true;
        }
    }

    /**
     * 
     * @param {Number} index 
     * @param {Boolean} reverse 
     */
    static SetLetterPassive(index, reverse) {
        if (typeof index !== "number" || !Number.isInteger(index) || index < 0) {
            return false;
        } else {
            let el = Grep.qa("#lettergroup>text")[index];
            if (typeof reverse === "boolean" && reverse) {
                el.style.fill = "black";
                el.setAttribute("selt-active", "active");
            } else {
                el.style.fill = "grey";
                el.setAttribute("self-active", "passive");
            }
            return true;
        }
    }
    /**
     * 
     * @param {Number} index 
     * @param {Boolean} reverse 
     */
    static SetInputOff(index, reverse) {
        if (typeof index !== "number" || !Number.isInteger(index) || index < 1) {
            return false;
        } else {
            if (typeof reverse === "boolean" && reverse) {
                Grep.q("#letter" + index + ">line").style.stroke = "black";
            } else {
                Grep.q("#letter" + index + ">line").style.stroke = "transparent";
            }
            return true;
        }
    }
    /**
     * 
     * @param {Number} index 
     * @param {String} letter 
     */
    static SetLetter(index, letter) {
        if (typeof index !== "number" || !Number.isInteger(index) || index < 1) {
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
}
class How {
    /**
     * Constructor
    */
    constructor() {
        this.count = 0;
        this.letters = [];
        this.scale = 1;
    }
    /**
     * make level
    */
    LoadLevel() {
        this.count = 0;

        let rand = Math.floor(Math.random() * words.length);
        let word = words[rand];
        Grep.q("#hint>span").innerHTML = word.type;

        this.letters = word.name.split("").map((elem) => {
            return elem.toUpperCase();
        });

        let len = this.letters.length;

        for (let i = 0; i < 26; i++) {
            if (i < 9) {
                HowDomHelper.AnimateTreePart(i + 1, true);
            }
            if (i < 12) {
                HowDomHelper.SetInputOff(i + 1, true);
                HowDomHelper.SetLetter(i + 1, "");
                if (i + 1 > len) {
                    //disable uneccesary lines
                    HowDomHelper.SetInputOff(i + 1)
                }
            }
            HowDomHelper.SetLetterPassive(i, true);
        }

        HowDomHelper.SetLetter(1, this.letters[0]);
        this.letters[0] = null;

        HowDomHelper.SetupKeyboard(this);
    }
}

let how = new How();
how.LoadLevel();