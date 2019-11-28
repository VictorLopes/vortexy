import { vortexy } from '../../vortexy/lib';

var app = new vortexy.App(30);

let o = app.draw()
    .circle().x(20).y(20).radius(20).throttle(5).render();


app.onMouseDown((event) => {
    o.dragDown(event);
});

app.onMouseMove((event) => {
    o.emit(event);
    o.dragMove(event);
});

app.onMouseUp((event) => {
    o.dragUp(event);
});


/* app.onKeyDown((event) => {
    o.moveLeft(37, event);
    o.moveUp(38, event);
    o.moveRight('ArrowRight', event);
    o.moveDown(40, event);
}); */

/* app.onKeyUp((event) => {
    o.stopMoveRight(39, event);
}); */


/* app.onKeyPress((event) => {
    o.moveLeft(97, event);
    o.moveUp(119, event);
    o.moveRight(100, event);
    o.moveDown(115, event);
}); */

app.run();