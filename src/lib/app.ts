import Shape from './shape';
import Property from './shapes/Property';

export class App {

    private _fps: number;
    private _width: number;
    private _height: number;
    private _center: boolean;
    private _app: HTMLElement | null;
    private _screen: HTMLCanvasElement | null;
    private _message: string;
    private _shapes: Array<Property>;

    constructor(fps: number = 30, width: number = 800, height: number = 600, center: boolean = true) {
        this._fps = fps;
        this._width = width;
        this._height = height;
        this._center = center;
        this._app = null;
        this._screen = null;
        this._message = `Your browser does not support the HTML5 canvas!`;
        this._shapes = [];
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

    draw(): Shape {
        const shape: Shape = new Shape(this._screen, this._shapes);
        return shape;
    }

    run(callback: Function = () => { }): void {
        window.onload = () => {
            window.setInterval(() => {
                this.clear();
                this._shapes.forEach(shape => {
                    shape.render();
                })
                callback();
            }, this._fps);
        };
    }

    clear(): void {
        if (this._screen) {
            const context: CanvasRenderingContext2D | null = this._screen.getContext('2d');
            if (context) {
                context.clearRect(0, 0, this.width, this.height);
            }
        }
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get fps(): number {
        return this._fps;
    }
}