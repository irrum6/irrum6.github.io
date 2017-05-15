let container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);
delete container;

let container2 = document.createElement('div');
container2.id = 'container2';

let spans = ['countdown', 'score', 'delta'];
for (span of spans) {
    let temp = document.createElement('span');
    temp.id = span;
    temp.innerHTML = '';
    container2.appendChild(temp);
    delete temp;
}
delete spans;

let startButton = document.createElement('button')
startButton.id = 'start';
startButton.innerHTML = '►';
container2.appendChild(startButton);
delete startButton;

let hintButton = document.createElement('button');
hintButton.id = 'hint';
hintButton.innerHTML = 'Hint';
container2.appendChild(hintButton);
delete hintButton;

document.body.appendChild(container2);
delete container2;

let bu = () => { return "You want to reload page? changes will be lost."; }

window.onbeforeunload = bu;
window.onunload = bu;