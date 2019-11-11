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

    public y(value: number): Property {
        this._y = value;
        return this._property;
    }

    public color(value: string = 'gold'): Property {
        this._color = value;
        return this._property;
    }

    public render(): CanvasRenderingContext2D | null {
        return null;
    }
}