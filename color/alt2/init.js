//default game options
let gameOptions = {
    level: 1,
    time: 90,
    clickCount: 0,
    currentRowCount: 0,
    minimalDelta: 2,
    visible: true,
    hardness: 'easy',
    colorMode: 'all',
    locale: 'english',
    hintCount: 99
};

let initGame = () => {
    let colorGame = new ColorGame(gameOptions);
    //colorGame.init(gameOptions);
    colorGame.initHTML();
    colorGame.start();
}

let gameMenu = function (lang) {
    let list = [{
        id: 'begin',
        text: languages[lang].start,
        func: function () {
            h5.clearBody();
            initGame();
        }
    }, {
        id: 'color',
        type: 'main',
        text: languages[lang].chooseColorText,
    }, {
        text: languages[lang].colors.red,
        type: 'sub',
        main: 'color',
        func: function () {
            gameOptions.colorMode = 'red';
        }
    }, {
        text: languages[lang].colors.green,
        type: 'sub',
        main: 'color',
        func: function () {
            gameOptions.colorMode = 'green';
        }
    }, {
        text: languages[lang].colors.blue,
        type: 'sub',
        main: 'color',
        func: function () {
            gameOptions.colorMode = 'blue';
        }
    }, {
        text: languages[lang].colors.all,
        type: 'sub',
        main: 'color',
        func: function () {
            gameOptions.colorMode = 'all';
        }
    }, {
        id: 'difficulty',
        type: 'main',
        text: languages[lang].chooseDificultyText
    }, {
        text: languages[lang].difficulty.easy,
        type: 'sub',
        main: 'difficulty',
        func: function () {
            gameOptions.hardness = 'easy';
        }
    }, {
        text: languages[lang].difficulty.normal,
        type: 'sub',
        main: 'difficulty',
        func: function () {
            gameOptions.hardness = 'normal';
        }
    }, {
        text: languages[lang].difficulty.hard,
        main: 'difficulty',
        type: 'sub',
        func: function () {
            gameOptions.hardness = 'hard';
        }
    }, {
        text: languages[lang].difficulty.hardest,
        type: 'sub',
        main: 'difficulty',
        func: function () {
            gameOptions.hardness = 'hardest';
        }
    }];
    h5.verticalMenuWithSubs(list);
}

let welcome = () => {
    let list = [];
    for (lang in languages) {
        list.push({
            text: languages[lang].localeName,
            id: lang,
            func: function (lang) {
                localStorage.lang = lang;
                h5.clearBody();
                gameMenu(lang);
                gameOptions.locale = localStorage.lang;

            },
            params: lang
        })
    };
    h5.verticalMenu(list);
};
welcome();

//no longer custom texts :(
window.onbeforeunload = (event) => {
    return '';
};