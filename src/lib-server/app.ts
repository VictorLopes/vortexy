import io from 'socket.io';

export enum EmitterType {
    Broadcast = 1
}

export class App {

    private _io: SocketIO.Server;

    constructor(server: any, type: EmitterType) {
        this._io = io(server);

        if (io && type === EmitterType.Broadcast) {
            const onConnection = (socket: SocketIO.Socket) => {
                socket.on('changingCircle', (data) => {
                    console.log(data);
                    socket.broadcast.emit('changingCircle', data);
                });
            }

            this._io.on('connection', onConnection);
        }
    }
}