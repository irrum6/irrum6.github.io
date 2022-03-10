function shuffle_array(a) {
    if (!Array.isArray(a)) {
        console.log('not an array');
        return;
    };
    //do the shuffling
    //remove an from random location and insert at back
    //repeat 16 times
    const times = 16;
    let i = 0;

    let oa = [];//other array
    //random swaps
    for (; i < times; i++) {
        let len = a.length;
        let randi = Math.floor(Math.random() * len);
        //get random element and put at begining
        let rande = a.splice(randi, 1);//it returns array
        oa.push(...rande);//thank you spread sintax
    }
    return oa;
}

const CARD_STATES = { HIDDING: 0, SHOWING: 1, MATCHING: 2 };

let SELECTED_COLORS = ["red", "navy", "green", "yellow", "black", "purple", "pink", "orange"]

class Card {
    /**
     * 
     * @param {String} id 
     * @param {CARD_STATES} state 
     * @param {String} color 
     */
    constructor(id, state, color) {
        this.id = id;
        this.state = state;
        this.color = color;
    }
    /**
     * creates card element
     * @param {Function} clicker 
     * @param {HTMLElement} parent 
     */
    create(clicker, parent) {
        let card = document.createElement('div');
        card.classList.add("card");
        card.classList.add("bg_grey");
        card.setAttribute("data-id", this.id);
        card.id = `card_${this.id}`;
        card.addEventListener("click", clicker);
        parent.appendChild(card);
    }
    display() {
        let fullColorClass = `bg_${this.color}`;
        let standardColorClass = "bg_grey";
        // find element
        let cardId = `card_${this.id}`;
        let elem = document.getElementById(cardId);
        if (this.state === CARD_STATES.HIDDING) {
            elem.classList.remove(fullColorClass);
            elem.classList.add(standardColorClass);
        } else {
            elem.classList.add(fullColorClass);
            elem.classList.remove(standardColorClass);
        }
    }
    update_state(s) {
        this.state = s;
    }
}

class MemoryGame {
    constructor() {
    }
    make_grid() {
        let grid = document.getElementById("grid");
        grid.innerHTML = "";
        for (const car of this.state.cards) {
            car.create(this.handle_click.bind(this), grid);
        }
    }

    display() {
        for (const card of this.state.cards) {
            card.display();
        }
    }

    get_index(id) {
        for (let index = 0, len = this.state.cards.length; index < len; index++) {
            if (this.state.cards[index].id == id) {
                return index;
            }
        }
        throw "not found";
    }

    handle_click(event) {
        let id = event.target.getAttribute("data-id");

        if (this.state.noClick) {
            return;
        }
        let found_index = this.get_index(id);

        if (this.state.cards[found_index].state !== CARD_STATES.HIDDING) {
            return;
        }

        this.state.openCards.push(found_index);

        if (this.state.openCards.length === 2) {
            // do the comparison
            let index1 = this.state.openCards[0];
            let index2 = this.state.openCards[1];
            let color = this.state.cards[index1].color;
            let color2 = this.state.cards[index2].color;
            if (color === color2) {
                this.state.cards[index1].update_state(CARD_STATES.MATCHING);
                this.state.cards[index2].update_state(CARD_STATES.MATCHING);
                this.state.openCards = [];
            } else {
                this.state.cards[index1].update_state(CARD_STATES.HIDDING);
                this.state.cards[index2].update_state(CARD_STATES.HIDDING);
                this.state.openCards = [];
            }
        } else {
            this.state.cards[found_index].update_state(CARD_STATES.SHOWING);
        }
        this.display();
    }

    new_game() {
        let cards = SELECTED_COLORS.concat(SELECTED_COLORS).map((v, i) => { return new Card(i, CARD_STATES.HIDDING, v); });
        cards = shuffle_array(cards);
        this.state = { cards, openCards: [], noClick: false }
    }
}

let mega = new MemoryGame();
mega.new_game();
mega.make_grid();
mega.display();


document.getElementById("restarter").addEventListener("click", () => {
    mega.new_game();
    mega.make_grid();
    mega.display();
})