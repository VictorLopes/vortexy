import Property from './Property';

export default class CircleProperty extends Property {

    private _radius: number;

    constructor(screen: HTMLCanvasElement | null) {
        super(screen);
        this._property = this;
        this._radius = 1;
    }

    public x(value: number): CircleProperty {
        return super.x(value) as CircleProperty;
    }

    public y(value: number): CircleProperty {
        return super.y(value) as CircleProperty;
    }

    public color(value: string): CircleProperty {
        return super.color(value) as CircleProperty;
    }

    /* ================================================= */

    public radius(value: number): CircleProperty {
        this._radius = value;
        return this._property as CircleProperty;
    }

    public render(): CanvasRenderingContext2D | null {
        super.render();
        const screen: HTMLCanvasElement | null = this._screen;
        if (screen) {
            const context: CanvasRenderingContext2D | null = screen.getContext('2d');
            if (context) {
                context.fillStyle = this._color;
                context.beginPath();
                context.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
                return context;
            }
        }
        return null;
    }
}