let container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

let container2 = document.createElement('div');
container2.id = 'container2';

let countDownSpan = document.createElement('span');
countDownSpan.id = 'countdown';
countDownSpan.innerHTML = '';
container2.appendChild(countDownSpan);

let scoreSpan = document.createElement('span');
scoreSpan.id = 'score';
scoreSpan.innerHTML = '';
container2.appendChild(scoreSpan);

let startButton = document.createElement('button')
startButton.id = 'start';
startButton.innerHTML = '►';
container2.appendChild(startButton);

let hintButton = document.createElement('button');
hintButton.id = 'hint';
hintButton.innerHTML = 'Hint';
container2.appendChild(hintButton);

document.body.appendChild(container2);

let bu = () => { return "You want to reload page? changes will be lost."; }

window.onbeforeunload = bu;
window.onunload = bu;