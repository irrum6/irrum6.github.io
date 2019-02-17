const pop = (function () {
    class Pop {
        constructor() {
            this._prefix_ = {};
            this.prefix = 'alert';
            this.prefix = 'confirm';
            this.prefix = 'prompt';
            Object.freeze(this._prefix_);
        }
        get prefix() {
            return this._prefix_;
        }
        set prefix(str) {
            if (!lib.isString(str)) throw "prefix must be string";
            this._prefix_[str] = `pop_${str}`;
        }
        alert(message) {
            if (this.isOpen('alert')) throw "popup of this type is already open";
            let prefix = this.prefix.alert;
            if (typeof message !== 'string') throw "Message must be string";
            let box = lib.make('div', ['pop', 'box']);
            box.id = `${prefix}_box`;
            let close = lib.make('div', ['pop', 'close']);
            let button = lib.make('button', ['pop', 'close']);
            button.id = `${prefix}_close`;
            button.textContent = 'X';
            let textbox = lib.make('div');
            textbox.textContent = message;
            close.appendChild(button);
            box.appendChild(close);
            box.appendChild(textbox);
            document.body.appendChild(box);
            button.addEventListener('click', this.close.bind(this, 'alert'));
        }
        isOpen(type) {
            if (!this.prefix.hasOwnProperty(type)) throw "please specify valid popup type";
            let box = q(`#${this.prefix[type]}_box`);
            return !(box === null);
        }
        close(type) {
            if (!this.prefix.hasOwnProperty(type)) throw "please specify valid popup type";
            let box = q(`#${this.prefix[type]}_box`);
            if (box === null) throw "no popup of such type is open";
            if (box.parentNode === null || box.parentNode === undefined) throw "no parent node";
            box.parentNode.removeChild(box);
        }
    }
    const p = new Pop();
    Object.freeze(p);
    return p;
}())
