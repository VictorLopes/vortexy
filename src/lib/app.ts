import Shape from './shape';
import Property, { PropertyType } from './shapes/Property';

export class App {

    private _fps: number;
    private _width: number;
    private _height: number;
    private _center: boolean;
    private _app: HTMLElement | null;
    private _screen: HTMLCanvasElement | null;
    private _message: string;
    private _shapes: PropertyType;

    constructor(fps: number = 30, width: number = 800, height: number = 600, center: boolean = true) {
        this._fps = fps;
        this._width = width;
        this._height = height;
        this._center = center;
        this._app = null;
        this._screen = null;
        this._message = `Your browser does not support the HTML5 canvas!`;
        this._shapes = {
            circle: [],
            line: [],
            rect: []
        }
        this._initScreen();
    }

    private _initScreen(): void {
        this._app = document.getElementById('vertexy');
        if (this._app) {
            this._app.innerHTML = `<canvas id="vertexy-screen" width="${this._width}" height="${this._height}">${this._message}</canvas>`;
            this._screen = document.getElementById('vertexy-screen') as HTMLCanvasElement;

            if (this._center) {
                this._app.style.display = 'flex';
                this._app.style.flexDirection = 'row';
                this._app.style.flexWrap = 'nowrap';
                this._app.style.justifyContent = 'center';
                this._app.style.alignItems = 'center';
                this._app.style.alignContent = 'stretch';
            }

            if (this._screen) {
                this._screen.style.backgroundColor = `black`;
            }
        }
    }

    public draw(): Shape {
        const shape: Shape = new Shape(this._screen, this._shapes);
        return shape;
    }

    public run(callback: Function = () => { }): void {
        window.onload = () => {
            const keys: Array<string> = Object.keys(this._shapes);
            window.setInterval(() => {
                this.clear();

                keys.forEach(async (key: string) => {
                    this._shapes[key as keyof PropertyType].forEach(shape => {
                        shape.render();
                    });
                });

                callback();
            }, this._fps);
        };
    }

    public clear(): void {
        if (this._screen) {
            const context: CanvasRenderingContext2D | null = this._screen.getContext('2d');
            if (context) {
                context.clearRect(0, 0, this.width, this.height);
            }
        }
    }


    /*
     * ===============================================================================
     * EVENTS
     * ===============================================================================
     */


    public onMouseDown(callback: EventListenerObject): void {
        if (this._screen) {
            this._screen.addEventListener('mousedown', callback);
        }
    }

    public onMouseUp(callback: EventListenerObject): void {
        if (this._screen) {
            this._screen.addEventListener('mouseup', callback);
        }
    }

    public onMouseMove(callback: EventListenerObject): void {
        if (this._screen) {
            this._screen.addEventListener('mousemove', callback);
        }
    }

    public onKeyDown(callback: EventListenerObject): void {
        document.addEventListener('keydown', callback);
    }

    public onKeyUp(callback: EventListenerObject): void {
        document.addEventListener('keyup', callback);
    }

    public onKeyPress(callback: EventListenerObject): void {
        document.addEventListener('keypress', callback);
    }


    /*
     * ===============================================================================
     * EVENTS END
     * ===============================================================================
     */


    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get fps(): number {
        return this._fps;
    }
}