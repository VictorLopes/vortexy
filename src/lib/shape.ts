import Property, { PropertyType } from "./shapes/Property";
import CircleProperty from "./shapes/CircleProperty";
/* import LineProperty from "./shapes/LineProperty";
import RectProperty from "./shapes/RectProperty"; */

export default class Shape {

    private _screen: HTMLCanvasElement | null;
    private _shapes: PropertyType;

    constructor(screen: HTMLCanvasElement | null, shapes: PropertyType) {
        this._screen = screen;
        this._shapes = shapes;
    }

    circle(): CircleProperty {
        const property = new CircleProperty(this._screen);
        this._shapes.circle.push(property);
        return property;
    }

    /* line(): LineProperty {
        const property = new LineProperty(this._screen);
        this._shapes.line.push(property);
        return property;
    }

    rect(): RectProperty {
        const property = new RectProperty(this._screen);
        this._shapes.rect.push(property);
        return property;
    } */
}