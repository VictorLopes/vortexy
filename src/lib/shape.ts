import Property from "./shapes/Property";
import CircleProperty from "./shapes/CircleProperty";
import LineProperty from "./shapes/LineProperty";
import RectProperty from "./shapes/RectProperty";

export default class Shape {

    private _screen: HTMLCanvasElement | null;
    private _shapes: Array<Property>;

    constructor(screen: HTMLCanvasElement | null, shapes: Array<Property>) {
        this._screen = screen;
        this._shapes = shapes;
    }

    circle(): CircleProperty {
        const property = new CircleProperty(this._screen);
        this._shapes.push(property);
        return property;
    }

    line(): LineProperty {
        const property = new LineProperty(this._screen);
        this._shapes.push(property);
        return property;
    }

    rect(): RectProperty {
        const property = new RectProperty(this._screen);
        this._shapes.push(property);
        return property;
    }
}