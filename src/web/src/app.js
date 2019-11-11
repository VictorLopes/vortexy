import { vertexy } from '../vortexy/index';

var app = new vertexy.App(30);

app.draw()
    .circle().x(20).y(20).radius(20);

app.draw()
    .line().x(0).y(0).x2(200).y2(200).thickness(9);

app.draw()
    .rect().x(150).y(50).width(100).height(100);

app.run();