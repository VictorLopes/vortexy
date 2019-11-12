import Property from './Property';

class CanvasObject {

    private _object: CanvasRenderingContext2D | null;
    private _property: CircleProperty;
    private _mouseDown: boolean;

    constructor(object: CanvasRenderingContext2D | null, propery: CircleProperty) {
        this._object = object;
        this._property = propery;
        this._mouseDown = false;
    }

    public getObject(): CanvasRenderingContext2D | null {
        return this._object;
    }

    public dragDown(event: MouseEvent): boolean {
        if (this._object) {
            var top = this._object.canvas.offsetTop;
            var left = this._object.canvas.offsetLeft;
            var mouseX = event.pageX - left;
            var mouseY = event.pageY - top;

            var circleX = this._property.getX();
            var circleY = this._property.getY();
            var radius = this._property.getRadius();
            if (Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2) < Math.pow(radius, 2)) {
                this._mouseDown = true;
                return true;
            }
        }
        this._mouseDown = false;
        return false;
    }

    public dragMove(event: MouseEvent): boolean {
        if (this._object && this._mouseDown) {
            var top = this._object.canvas.offsetTop;
            var left = this._object.canvas.offsetLeft;
            var mouseX = event.pageX - left;
            var mouseY = event.pageY - top;
            var circle = this._object;
            this._property.x(mouseX);
            this._property.y(mouseY);
            circle.moveTo(mouseX, mouseY);
            return true;
        }
        return false;
    }

    public dragUp(event: MouseEvent): boolean {
        this._mouseDown = false;
        return true;
    }
}

export default class CircleProperty extends Property {

    private _radius: number;

    constructor(screen: HTMLCanvasElement | null) {
        super(screen);
        this._property = this as Property;
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

    public getRadius(): number {
        return this._radius;
    }

    public render(): CanvasObject | null {
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
                return new CanvasObject(context, this);
            }
        }
        return null;
    }
}