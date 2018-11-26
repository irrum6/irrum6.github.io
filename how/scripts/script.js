{
    //query
    let q = (selector) => document.body.querySelector(('' + selector));
    //query all
    let qa = (selector) => document.body.querySelectorAll(('' + selector));

    let buttons = qa("button");

    /**
     * @param {Number} num 
     * @return {Boolean}
     */
    function isPositiveInteger(num) {
        return (typeof num === "number" && Number.isInteger(num) && num > -1);
    }

    function getDomHelper(hangman) {
        let helperInstance;
        class helper {
            constructor() {
                this.how = hangman;
            }
            /**
             * animate part of hangman figure
             * @param {Number} index 
             */
            animateFigurePart(index) {
                if (!isPositiveInteger(index)) return false;
                q(`#part${index}`).style.stroke = "black";
                return true;
            }
            /**
             * @param {Number} index 
             */
            deAnimateFigurePart(index) {
                if (!isPositiveInteger(index)) return false;
                q(`#part${index}`).style.stroke = "transparent";
                return true;
            }
            /**
             * animate all figure parts
             */
            animateAllFigureParts() {
                for (let i = 0; i < 9; i++) {
                    this.animatePart(i);
                }
            }
            deAnimateAllFigureParts() {
                for (let i = 0; i < 9; i++) {
                    this.deAnimateFigurePart(i);
                }
            }
            /**
             * setup event for keyboard (pc)
             */
            setupKeyboard() {
                document.addEventListener('keydown', (e) => {
                    for (let i = 0, len = buttons.length; i < len; i++) {
                        if (buttons[i].innerHTML == e.key) {
                            buttons[i].disabled = true;
                        }
                    }
                    this.key(e.key)
                });
            }
            /**
             * since smartphones oncscreen keyboard takes much vertical space
             * we use our virtual keyboard
             */
            SetupVirtualKeyboard() {
                let len = buttons.length;
                for (let i = 0; i < len; i++) {
                    buttons[i].addEventListener('click', (e) => {
                        e.target.disabled = true;
                        let key = e.target.innerHTML;
                        this.key(key);
                    });
                }
            }
            /**
             * set the letter if on the dashboard
             * @param {Number} index 
             * @param {String} letter
             * @return {Boolean}
             */
            SetLetter(index, letter) {
                if (!isPositiveInteger(index) || (typeof letter !== "string" || letter.length > 1)) {
                    return false;
                }
                q("#letter" + index).children[0].innerHTML = letter;
                return true;
            }
            /**
            * @param {Number} index 
            */
            SetKeyPassive(index) {
                if (!isPositiveInteger(index)) return false;
                buttons[index].disabled = true;
                return true;
            }
            /**
             * @param {Number} index 
             */
            SetKeyActive(index) {
                if (!isPositiveInteger(index)) return false;
                buttons[index].disabled = false;
                return true;
            }
            /** 
             * @param {Number} index 
             */
            SetInputOff(index) {
                if (!isPositiveInteger(index)) return false;
                q(`#letter${index} > line`).style.stroke = "transparent";
                return true;
            }
            /**
             * @param {Number} index 
             */
            SetInputOn(index) {
                if (!isPositiveInteger(index)) return false;
                q(`#letter${index} > line`).style.stroke = "black";
                return true;
            }
            /**
            * @param {char} key
            */
            key(key) {
                console.log(key);
                key = key.toLowerCase();
                if (key == "space") key = " ";
                console.log(this.how.letters);

                if (this.how.letters.includes(key)) {
                    console.log(11);
                    for (let i = 0, len = this.how.letters.length; i < len; i++) {
                        if (this.how.letters[i] === key) {
                            this.SetLetter(i, key);
                            this.how.letters[i] = null;
                        }
                    }
                } else {
                    this.animateFigurePart(this.how.count++);
                    console.log(this.how.count);
                }

                let letters = this.how.letters.filter((elem, index) => {
                    return elem !== null;
                });
                let len = letters.length;
                if (len === 0) {
                    let int = setTimeout(() => {
                        this.how.loadLevel();
                        clearTimeout(int)
                    }, 2000);
                }
                if (this.how.count >= 8 && len > 0) {
                    console.log(this.how.count);
                    this.animateFigurePart(this.how.count);
                    let int = setTimeout(() => {
                        this.how.loadLevel();
                        clearTimeout(int)
                    }, 3000);
                    for (let i = 0, leng = this.how.letters.length; i < leng; i++) {
                        if (this.how.letters[i] !== null) {
                            this.SetLetter(i + 1, this.how.letters[i]);
                        }
                    }
                }
            }
        }
        if (typeof helperInstance === 'undefined') {
            helperInstance = new helper(hangman);
        }
        return helperInstance;
    }

    let helper;

    class HangMan {
        constructor() {
            this.count = 0;
            this.letters = [];
            this.scale = 1;
        }
        setup() {
            helper = getDomHelper(this);
            helper.setupKeyboard();
            helper.SetupVirtualKeyboard();
        }
        loadLevel() {
            this.count = 0;
            let rand = Math.floor(Math.random() * words.length);
            let word = words[rand];
            q("#hint>span").innerHTML = word.type;

            this.letters = word.name.split("");

            let len = this.letters.length;

            helper.deAnimateAllFigureParts();

            for (let i = 0; i < 26; i++) {
                //this clear input dashes
                if (i < 12) {
                    helper.SetInputOn(i);
                    helper.SetLetter(i, "");
                    if (i > len - 1) {
                        helper.SetInputOff(i);
                    }
                }
                //these clear keyboard
                helper.SetKeyActive(i);
            }
            helper.SetLetter(0, this.letters[0]);

            this.letters[0] = null;
        }
    }
    let hm = new HangMan();
    hm.setup();
    hm.loadLevel();
}