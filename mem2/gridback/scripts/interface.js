import { _q, _all, on, un } from "./query.js";

const _buttons = _all("#grid button");
// display
const _score = _q("#score");
const _strike = _q("#strike");
// controls
const _dark = _q("#dark");
const _restart = _q("#restart");
const _start = _q("#start");
// pads
const _padleft = _q("#padleft");
const _padright = _q("#padright");
//sound
const audis = _q('audio');
// progress bar
const progress = _q('#progress');
// explain
const help = _q("#explain");

class GameInterface {

    constructor(game) {
        this.game = game;
        this.dark = false;
        this.on_loaded();
    }
    on_loaded() {
        if (localStorage.isDark !== undefined) {
            let { isDark } = localStorage;
            if (isDark === "1") {
                this.toggle_darkness();
            }
        }
    }

    notify(msg) {
        alert(msg);
    }

    onKeyboardEvents() {
        // for desktop use keys
        // play animation on pads when pressed keys        
        _padleft.classList.add('pressed');
        _padright.classList.add('pressed');
        
        this.game.fire(this);
        const t = window.setTimeout(() => {
            // let animation play first
            _padleft.classList.remove('pressed');
            _padright.classList.remove('pressed');
            window.clearTimeout(t);
        }, 150);
        
    }

    sethandlers() {
        _padleft[on]('click', (e) => { this.game.fire(this); });
        _padright[on]('click', (e) => { this.game.fire(this); });
        _dark[on]('click', this.toggle_darkness.bind(this));
        _start[on]('click', (e) => { this.game.start(this) });
        _restart[on]('click', (e) => { this.game.start(this, true) });
        document.body.addEventListener('keydown', this.onKeyboardEvents.bind(this));
    }
    draw(index) {
        // debugger;
        for (const b of _buttons) {
            b.classList.remove("marked");
        };
        _buttons[index].classList.add("marked");
    }

    play_blop() {
        audis.play();
    }

    toggle_darkness() {
        // debugger;
        this.dark = !this.dark;
        _padleft.classList.toggle("dark");
        _padright.classList.toggle("dark");
        _dark.classList.toggle("dark");
        _start.classList.toggle("dark");
        _restart.classList.toggle("dark");
        help.classList.toggle("dark");
        document.body.classList.toggle("dark");
        for (const b of _buttons) {
            b.classList.toggle("dark");
        };
        localStorage.isDark = this.dark ? "1" : "0";
    }
    display_hit(index) {
        this.dot_span(index, 'green');
    }
    display_miss(index) {
        this.dot_span(index, 'red');
    }
    display_pass(index) {
        this.dot_span(index, 'black');
    }
    dot_span(index, color) {
        progress.children[0].style = `font-size: 4vmin;color:${color};`;
    }
    display() {
        _score.textContent = this.game.score;
        _strike.textContent = this.game.strike;
    }
}

export default GameInterface;