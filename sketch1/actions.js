class Actions {
    static save(canvas) {
        let save = Lib.q("[data-action=save]");
        save.href = canvas.toDataURL("image/png");
        save.download = "sketch.png";
    }
    static erase(sketch, canvas) {
        let erase = Lib.q("[data-action=erase]");
        if (sketch.mode !== 'eraser') {
            sketch.setMode('eraser');
            erase.classList.remove("pinkRed");
            erase.classList.add("grey");
            canvas.classList.add('eraser');

        } else {
            //restore button's appearance and default color
            sketch.setMode('pencil');
            canvas.classList.remove('eraser');
            erase.classList.remove("grey");
            erase.classList.add("pinkRed");
        }
    }
    static undo() {

    }
    static redo() {

    }
    static correctButtonSize() {
        let buttons = Lib.qa('.color-button');
        let style = window.getComputedStyle(buttons[0]);
        for (let i = 0, len = buttons.length; i < len; i++) {
            buttons[i].style.height = style.width;
            buttons[i].style.backgroundColor = buttons[i].getAttribute('data-value');
        }
    }
}