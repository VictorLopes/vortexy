class CanvasObject {

}

export interface PropertyType {
    circle: Array<Property>,
    line: Array<Property>,
    rect: Array<Property>
}

export default class Property {

    protected _property: Property;
    protected _screen: HTMLCanvasElement | null;
    protected _x: number;
    protected _y: number;
    protected _color: string;

    constructor(screen: HTMLCanvasElement | null) {
        this._property = this;
        this._screen = screen;
        this._x = 0;
        this._y = 0;
        this._color = 'gold';
    }

    public screen(value: HTMLCanvasElement | null): Property {
        this._screen = value;
        return this._property;
    }

    public x(value: number): Property {
        this._x = value;
        return this._property;
    }

    public getX(): number {
        return this._x;
    }

    public y(value: number): Property {
        this._y = value;
        return this._property;
    }

    public getY(): number {
        return this._y;
    }

    public color(value: string = 'gold'): Property {
        this._color = value;
        return this._property;
    }

    public render(): CanvasObject | null {
        return null;
    }
}