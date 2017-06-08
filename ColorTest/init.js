//default game options
let gameOptions = {
    level: 1,
    time: 90,
    delta: 80,
    clickCount: 0,
    currentRowCount: 0,
    minimalDelta: 2,
    visible: true,
    locale: 'english'
}

let initGame = () => {
    let colorGame = new _colorGame();
    colorGame.init(gameOptions);
    colorGame.initHTML();
    colorGame.start();

}
let gameMenu = (lang) => {
    let buttons = [{ tag: 'button', options: { id: 'start', innerHTML: languages[lang].start } },
    { tag: 'button', options: { id: 'level', innerHTML: languages[lang].chooseLevel } }];

    if (localStorage.gameon) {
        buttons.unshift({ tag: 'button', options: { id: 'resume', innerHTML: languages[lang].resume } });
    }
    for (button of buttons) {
        let element = elem(button.tag, button.options);
        element.classList.add('common');
        document.body.appendChild(element);
        delete element;
    }
    document.getElementById('start').addEventListener('click', (event) => {
        clearBody();
        initGame();
    });
}
let clearBody = () => {
    for (let i = 0, len = document.body.children.length; i < len; i++) {
        document.body.removeChild(document.body.children[0]);
    }
}
let welcome = () => {
    //forget language saving for this time
    for (lang in languages) {
        let langElement = elem('button', { id: lang, innerHTML: languages[lang].localeName });
        langElement.classList.add('common');
        document.body.appendChild(langElement);
        delete langElement;
    }
    let buttons = document.querySelectorAll('button.common');
    for (button of buttons) {
        button.addEventListener('click', (event) => {
            localStorage.lang = event.target.id;
            clearBody();
            gameMenu(event.target.id);
            gameOptions.locale = localStorage.lang;
            gameOptions.locale
        });
    }
}
welcome();
//no longer custom texts :(
window.onbeforeunload = (event) => {
    return '';
};