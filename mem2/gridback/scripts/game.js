const MULTIPLIER = 1.2;

class Helper {
    static getScore(strike) {
        let a = Math.pow(MULTIPLIER, strike) * 10;
        return Math.round(a);
    };
}

class Game {
    constructor() {
        this.times = 24;
        this.score = 0;
        this.strike = 0;
        this.interval = 2000;
        this.started = false;
        this.sequence = new Array(24);
        this.strikeSequence = new Array(24);
        this.tId = 3600;//something
        this.currentIndex = 0;
    }
    reset() {
        this.score = 0;
        this.strike = 0;
        this.started = false;
        this.sequence = new Array(24);
        this.strikeSequence = new Array(24);
        this.currentIndex = 0;
    }
    loadGenerator(iface) {
        this.generator = new Worker("scripts/generator.js");
        this.generator.onmessage = this.onGeneratorMessage.bind(this, iface);
    }    
    getNextIndex() {
        this.generator.postMessage({ msg: "next", mod: 9 });
    }    
    onGeneratorMessage(iface, e) {
        let { msg } = e.data;
        if (msg === "next") {
            this.onNumberReceived(e, iface);
        }
    }
    onNumberReceived(e, iface) {
        let index = e.data.msgback;
        if(index == this.sequence[this.currentIndex-1]){
            this.getNextIndex();
            return;
        }
        this.sequence[this.currentIndex] = index;
        iface.draw(index);
    }
    start(iface, forced) {
        if (forced) {
            this.reset();
        }
        if (this.started) {
            return;
        }
        this.started = true;
        this.play(iface);
    }
    play(iface) {
        window.clearTimeout(this.tId);
        if (this.times < 1) {
            this.over(iface);
            return;
        }
        iface.display_pass(this.currentIndex);
        this.checkformiss(iface);
        this.getNextIndex();
        this.tId = window.setTimeout(()=>{this.play(iface)}, this.interval);
        this.times--;
        this.currentIndex++;
    }    
    over(iface) {
        this.started = false;
        this.calculateMaxScore(iface);
        iface.notify('Game Over');
    }
    fire(iface) {
        if (!this.started) {
            return;
        }
        if (this.currentIndex < 2) {
            this.blop(iface);
            return;
        }
        // miss
        let last = this.sequence[this.currentIndex];
        let compare = this.sequence[this.currentIndex - 2];

        if (last !== compare) {
            this.blop(iface);
            return;
        }
        this.hit(iface);
    }
    hit(iface) {
        // if it hit alredy
        if(this.strikeSequence[this.currentIndex] == 1){
            return;//
        }
        this.strike += 1;
        this.strikeSequence[this.currentIndex] = 1;
        this.score += Helper.getScore(this.strike);
        iface.display();
        iface.display_hit(this.currentIndex);
    }
    blop(iface) {
        this.strike = 0;
        iface.play_blop();
        iface.display();
        iface.display_miss(this.currentIndex);
    }
    checkformiss(iface) {        
        if (this.currentIndex < 2) {
            return;
        }
        let last = this.sequence[this.currentIndex];
        let compare = this.sequence[this.currentIndex - 2];
        if (last !== compare) {
            return;
        }
        if (this.strikeSequence[this.currentIndex] !== 1) {
            this.blop(iface);
        }
    }    
    calculateMaxScore(iface) {
        let max_score = 0;
        let strike = 0;
        for (let i = 0, len = this.sequence.length; i < len; i++) {
            if (i > 1 && this.sequence[i] == this.sequence[i - 2]) {
                strike += 1;
                max_score += Helper.getScore(strike);
            }
        }
        this.maxScore = max_score;
    }
}

export default Game;