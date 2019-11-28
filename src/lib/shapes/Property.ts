class CanvasObject {

}

export interface PropertyType {
    circle: Array<Property>,
    line: Array<Property>,
    rect: Array<Property>
}

export default class Property {

    protected _property: Property;
    protected _object: CanvasObject | null;
    protected _screen: HTMLCanvasElement | null;
    protected _x: number;
    protected _y: number;
    protected _color: string;
    protected _throttle: number;

    constructor(screen: HTMLCanvasElement | null) {
        this._property = this;
        this._screen = screen;
        this._x = 0;
        this._y = 0;
        this._color = 'gold';
        this._throttle = 1;
        this._object = null;
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

    public getColor(): string {
        return this._color;
    }

    public throttle(value: number): Property {
        this._throttle = value;
        return this._property;
    }

    public getThrottle(): number {
        return this._throttle;
    }

    public render(): CanvasObject | null {
        return null;
    }
}