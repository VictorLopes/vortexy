//import io from 'socket.io';

export enum EmitterType {
    Broadcast = 1
}

export class Server {

    constructor(server: any, type: EmitterType) {

        if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
            //this._io = io(server);
            /* const io = require("socket.io")(server, { wsEngine: 'ws' });

            if (io && type === EmitterType.Broadcast) {
                const onConnection = (socket: SocketIO.Socket) => {
                    socket.on('changingCircle', (data) => {
                        console.log(data);
                        socket.broadcast.emit('changingCircle', data);
                    });
                }

                io.on('connection', onConnection);
            } */
        }
    }
}