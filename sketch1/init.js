let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

context.translate(0.5, 0.5);

Actions.correctButtonSize();

let sketch = new Sketch(canvas, context);
sketch.correctCanvasSize();
sketch.clearCanvas();
sketch.setOffsetCorrection();

EventBroker.setupCanvasEvents(canvas);