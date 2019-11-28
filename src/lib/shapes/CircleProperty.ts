import Property from './Property';
import io from 'socket.io-client';

class CanvasObject {

    private _object: CanvasRenderingContext2D | null;
    private _property: CircleProperty;
    private _mouseDown: boolean;
    private _keyState: any;
    private _io: SocketIOClient.Socket;

    constructor(object: CanvasRenderingContext2D | null, propery: CircleProperty) {
        this._object = object;
        this._property = propery;
        this._mouseDown = false;
        this._keyState = {};

        this._io = io('localhost:3000');

        const onConnect = () => {
            console.log('connect ' + this._io.id);
        }

        this._io.on('connect', onConnect);
        this._io.on('changingCircle', (data: any) => {
            this.moveTo(data.x, data.y);
        });
    }

    public getObject(): CanvasRenderingContext2D | null {
        return this._object;
    }

    public emit(event: Event) {
        if (this._mouseDown) {
            this._io.emit('changingCircle', {
                x: this._property.getX(),
                y: this._property.getY(),
                z: 0
            });
        }
    }

    private moveTo(x: number, y: number): void {
        if (this._object) {
            this._property.x(x);
            this._property.y(y);
            this._object.moveTo(x, y);
        }
    }

    /*
     * ===============================================================================
     * EVENTS
     * ===============================================================================
     */

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


    public moveDown(key: number, event: KeyboardEvent): boolean {
        if (this._object && ((key === event.keyCode) || (key === -1))) {
            var circle = this._object;
            var left = this._property.getX();
            var top = this._property.getY();
            this._property.x(left);
            this._property.y(top + this._property.getThrottle());
            circle.moveTo(left, top + this._property.getThrottle());
            return true;
        } else {
            return false
        }
    }

    public moveUp(key: number, event: KeyboardEvent): boolean {
        if (this._object && ((key === event.keyCode) || (key === -1))) {
            var circle = this._object;
            var left = this._property.getX();
            var top = this._property.getY();
            this._property.x(left);
            this._property.y(top - this._property.getThrottle());
            circle.moveTo(left, top - this._property.getThrottle());
            return true;
        } else {
            return false
        }
    }

    public moveRight(key: String, event: KeyboardEvent): boolean {
        console.log(event.key)
        if (this._object && (key === null) || (key == event.key)) {
            this._keyState[event.key] = event.type === "keydown";
        }
        /* if (this._object && ((key === event.keyCode) || (key === -1))) {
            var circle = this._object;
            var left = this._property.getX();
            var top = this._property.getY();

            this._isMovingRight = natural;

            let throttle = this._property.getThrottle();
            let percentTrottle = throttle * 0.10;
            while (this._isMovingRight) {
                this._property.x(left + throttle);
                this._property.y(top);
                circle.moveTo(left + throttle, top);
            }

            return true;
        } */
        return false
    }

    /* public stopMoveRight(key: number, event: KeyboardEvent): boolean {
        if (this._object && ((key === event.keyCode) || (key === -1))) {
            this._isMovingRight = false;
            return true;
        }
        return false;
    } */

    public moveLeft(key: number, event: KeyboardEvent): boolean {
        if (this._object && ((key === event.keyCode) || (key === -1))) {
            var circle = this._object;
            var left = this._property.getX();
            var top = this._property.getY();

            this._property.x(left - this._property.getThrottle());
            this._property.y(top);
            circle.moveTo(left - this._property.getThrottle(), top);

            return true;
        } else {
            return false
        }
    }
    /*
    * ===============================================================================
    * EVENTS END
    * ===============================================================================
    */
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

                if (!this._object) {
                    this._object = new CanvasObject(context, this);
                }
                return this._object as CanvasObject;
            }
        }
        return null;
    }
}