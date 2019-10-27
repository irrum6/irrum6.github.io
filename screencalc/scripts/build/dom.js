class InputBox {
    constructor(input_id) {
        if (!lib.isString(input_id)) throw new Error("id not a String");
        if (input_id === "") throw new Error("id empty String");
        const inn = {
            id: input_id
        }
        this.bindFunctions(inn);
    }
    bindFunctions(p) {
        this.getId = this.getId.bind(this, p);
    }
    getId(p) {
        return p.id;
    }
    html() {
        const input = lib.make('input', ['text']);
        input.type = "text";
        input.id = `input_${this.getId()}`;
        const label = lib.make('label');
        label[attr]("for", input.id);
        label.textContent=this.getId();
        this.markTranslatable(label, this.getId())
        const plus = lib.make('button', ['btn']);
        this.markBehavior(plus, 'plus', input.id);
        plus.textContent = "+";
        const minus = lib.make('button', ['btn']);
        this.markBehavior(minus, 'minus', input.id);
        minus.textContent = "-";
        const lock = lib.make('button', ['btn']);
        this.markTranslatable(label, 'lock');
        this.markBehavior(lock, 'lock', input.id);
        lock.textContent = "Lock";
        const box = lib.make('div', ['box']);
        box.appendChild(label);
        box.appendChild(input);
        box.appendChild(plus);
        box.appendChild(minus);
        box.appendChild(lock);
        return box;
    }
    attachToDom(toEl) {
        const ib = this.html();
        toEl.appendChild(ib)
    }
    markBehavior(el, behave, target) {
        el[attr]("data-app-behavior", behave);
        el[attr]("data-app-target", target);
    }
    markTranslatable(el, text) {
        el[attr]("data-app-translate", "1");
        el[attr]("data-app-text", text);
    }
}