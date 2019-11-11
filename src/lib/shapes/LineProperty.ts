import Property from './Property';

export default class LinePropery extends Property {

    private _x2: number;
    private _y2: number;
    private _thickness: number;

    constructor(screen: HTMLCanvasElement | null) {
        super(screen);
        this._property = this;
        this._x2 = 1;
        this._y2 = 1;
        this._thickness = 3;
    }

    public x(value: number): LinePropery {
        return super.x(value) as LinePropery;
    }

    public y(value: number): LinePropery {
        return super.y(value) as LinePropery;
    }

    public color(value: string): LinePropery {
        return super.color(value) as LinePropery;
    }

    /* ================================================= */

    public x2(value: number): LinePropery {
        this._x2 = value;
        return this._property as LinePropery;
    }

    public y2(value: number): LinePropery {
        this._y2 = value;
        return this._property as LinePropery;
    }

    public thickness(value: number): LinePropery {
        this._thickness = value;
        return this._property as LinePropery;
    }

    public render(): CanvasRenderingContext2D | null {
        super.render();
        const screen: HTMLCanvasElement | null = this._screen;
        if (screen) {
            const context: CanvasRenderingContext2D | null = screen.getContext('2d');
            if (context) {
                context.beginPath();
                context.moveTo(this._x, this._y);
                context.lineTo(this._x2, this._y2);
                context.lineWidth = this._thickness;
                context.strokeStyle = this._color;
                context.stroke();
                return context;
            }
        }
        return null;
    }
}