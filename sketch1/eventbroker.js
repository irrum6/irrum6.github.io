class EventBroker {
    static route(event) {
        let action = event.target.getAttribute("data-action");
        switch (action) {
            case "new":
                sketch.clearCanvas();
                break;
            case "undo":
                break;
            case "redo":
                break;
            case "erase":
                Actions.erase(event);
                break;
            case "color":
                let color = event.target.getAttribute('data-value') || event.target.value;
                break;
            case "canvas": {
                let type = event.type;
                switch (type) {
                    case "mousedown":
                        sketch.mousedown = true;
                        sketch.draw(event, false);
                        break;
                    case "mousemove":
                        sketch.draw(event, false);
                        break;
                    case "mouseup":
                        sketch.mousedown = false;
                        break;
                    case "touchstart":
                        event.preventDefault();
                        sketch.touchstart = true;
                        sketch.draw(event, true);
                        break;
                    case "touchmove":
                        event.preventDefault();
                        sketch.draw(event, true);
                        break;
                    case "touchend":
                        event.preventDefault();
                        sketch.touchstart = false;
                        break;
                }
            }
                break;
            default:
                break;
        }
    }
    static setupCanvasEvents(canvas) {
        //set up canvas touch events
        ["touchstart", "touchmove", "touchend",].forEach((elem) => {
            canvas.addEventListener(elem, (event) => {
                EventBroker.route(event)
            })
        });
        ["mousedown", "mouseup", "mousemove"].forEach((elem) => {
            canvas.addEventListener(elem, (event) => {
                EventBroker.route(event)
            })
        });
    }
}