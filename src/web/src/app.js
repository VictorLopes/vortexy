import { vertexy } from '../vortexy/index';

var app = new vertexy.App(30);

let o = app.draw()
    .circle().x(20).y(20).radius(20).render();

app.onMouseDown((event) => {
    o.dragDown(event);
});

app.onMouseMove((event) => {
    o.dragMove(event);
});

app.onMouseUp((event) => {
    o.dragUp(event);
});

app.run();