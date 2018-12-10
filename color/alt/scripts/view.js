class ColorGameView {
    /**
     * @param {ColorGame} g 
     */
    constructor(g) {
        this.game = g;
        this.currentRowCount = 1;
        this.clickCount = 0;
    }
    clearGrid() {
        let grid = q('#grid');
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
    }
    drawGrid() {
        let self = this, game = this.game;
        //row min 2 max 13
        let row = Math.min(parseInt(game.level / 5, 10) + 2, 13);
        let prob = Math.floor(h5.random() * row * row);

        let grid = q('#grid');

        if (row > this.currentRowCount) {
            //remove current container to make room for another
            this.clearGrid();
            //update row count
            this.currentRowCount = row;

            for (let i = 0; i < row; i++) {
                let tr = h5.make('div', null, 'row');
                for (let j = 0; j < row; j++) {
                    let button = h5.make('button', null, 'cell')
                    button.addEventListener('click', (event) => {
                        if (event.target.classList.contains('diff')) {
                            game.level++; game.clickCount = 0;
                            this.updateIndicators(game);
                            //request new level
                            game.nextLevel(this);
                            this.clickCount = 0;
                        } else {
                            this.clickCount++;
                            if (this.clickCount > 10) {
                                //alert('5 seconds time penalty for more than 10 clicks');
                                window.alert(languages[game.locale].timePenaltyText)
                                game.time = game.time - 5 < 0 ? 0 : game.time - 5;
                            }
                        }
                    });
                    button.style.backgroundColor = game.color;
                    tr.appendChild(button);
                }
                grid.appendChild(tr);
            }
        } else {
            //just repaint already available buttons
            let buttons = qa('button.cell');
            let len = buttons.length;
            for (let i = 0; i < len; i++) {
                buttons[i].style.backgroundColor = game.color;
            }
            //remove diff class from previously chosen cell and make all button same to avoid loophole
            this.clearDiff();
        }
        qa('button.cell')[prob].classList.add('diff');
        qa('button.cell')[prob].style.backgroundColor = game.differentColor;
    }
    hideGrid() {
        q('#grid').style.visibility = 'hidden';
    }
    showGrid() {
        q('#grid').style.visibility = 'visible';
    }
    disableGrid() {
        let buttons = qa('button.cell');
        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i].disabled = true;
        }
    }
    /**
     * update indicators of level and countdown
     */
    updateIndicators() {
        let game = this.game;
        if (this.isLandscape()) {
            let timespans = qa('#timewidget span');
            let scorespans = qa('#scorewidget span');

            let times = ("" + game.time).split("");
            let scores = ("" + game.level).split("");

            let tlen = times.length, slen = scores.length;

            timespans[0].textContent = tlen > 1 ? times[0] : '0';
            timespans[1].textContent = tlen > 1 ? times[1] : times[0];

            scorespans[0].textContent = slen > 1 ? scores[0] : '0';
            scorespans[1].textContent = slen > 1 ? scores[1] : scores[0];

        } else {
            q('#countdown').innerHTML = languages[game.locale].time + ': ' + game.time;
            q('#score').innerHTML = languages[game.locale].level + ': ' + game.level;
        }
    }
    getDiff() {
        return q('button.cell.diff');
    }

    hint() {
        let diff = this.getDiff();
        if (diff !== null) diff.classList.add('glow');
    }
    clearDiff() {
        let diff = this.getDiff();
        if (diff !== null) diff.classList.remove('diff');
    }

    setupHandlers() {
        let self = this, game = this.game;
        q('#start')[on]('click', () => game.start(self));
        q('#hint')[on]('click', () => self.hint());
        this.setupLanguageMenu();
        this.setupModeMenu();
        this.setupColorMenu();
        document.body.addEventListener('localechange', (event) => {
            console.log('localechange');
            this.updateInterfaceWhenLocaleChanges();
        });
    }
    setupLanguageMenu() {
        this.setupMenu('.lang', (game, event) => {
            game.setLocale(event.target.getAttribute('data-lang'));
        });
    }
    setupModeMenu() {
        this.setupMenu('.mode', (game, event) => {
            game.setMode(event.target.getAttribute('data-difficulty'));
        });
    }
    setupColorMenu() {
        this.setupMenu('.color', (game, event) => {
            game.setColorMode(event.target.getAttribute('data-color'));
        });
    }
    setupMenu(selector, callback) {
        let self = this;
        let game = this.game;
        if (!h5.isString(selector)) return false;
        let entries = qa(selector);
        if (!h5.defined(entries)) return false;
        let len = entries.length;
        for (let i = 0; i < len; i++) {
            entries[i].addEventListener('click', (event) => {
                if (event.target.classList.contains('main')) {
                    self.toggleMenu(selector);
                } else {
                    let main = q(`${selector}.main`);
                    main.classList.remove('main');
                    event.target.classList.add('main');
                    main.parentElement.insertBefore(event.target, main);
                    self.toggleMenu(selector);
                    callback(game, event);
                }
            });
        }
    }
    toggleMenu(selector) {
        function isFlex(element) {
            return element.style.display === "flex";
        }
        if (!h5.isString(selector)) return false;
        let entries = qa(`${selector}:not(.main)`);
        let main = q(`${selector}.main`);
        if (!h5.defined(entries, main)) return false;
        let len = entries.length;
        if (this.isLandscape()) {
            for (let i = 0; i < len; i++) {
                entries[i].style.display = isFlex(entries[i]) ? "none" : "flex";
            }
            main.style.display = 'flex';
        } else if (this.isPortrait()) {
            //cut the crap, we don't need to check every element
            if (isFlex(entries[0])) {
                for (let i = 0; i < len; i++) {
                    main.parentElement.appendChild(entries[i]);
                    entries[i].style.display = "none";
                    entries[i].classList.remove("contained")
                }
            } else {
                let container = q("#vmenucontainer");
                for (let i = 0; i < len; i++) {
                    container.appendChild(entries[i]);
                    entries[i].style.display = "flex";
                    entries[i].classList.add("contained");
                }
            }
        }
    }

    updateInterfaceWhenLocaleChanges() {
        let locale = this.game.locale;
        let colors = qa(".color");
        let modes = qa(".mode");

        let len, i;
        len = colors.length;

        for (i = 0; i < len; i++) {
            let color = colors[i].getAttribute('data-color');
            colors[i].textContent = languages[locale].colors[color];;
        }

        len = modes.length;
        for (i = 0; i < len; i++) {
            let mode = modes[i].getAttribute('data-difficulty');
            modes[i].textContent = languages[locale].modes[mode];
        }
        q('#timewidget > .widgettext').innerHTML = languages[locale].seconds;
        q('#scorewidget > .widgettext').innerHTML = languages[locale].level;
        q('#start').innerHTML = languages[locale].start;
        q('#hint').innerHTML = languages[locale].hint;
    }
    isLandscape() {
        return window.matchMedia("(orientation:landscape)").matches;
    }
    isPortrait() {
        return window.matchMedia("(orientation:portrait)").matches;
    }
}