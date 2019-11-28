export enum EmitterType {
    Broadcast = 1
}

export class Server {
    constructor(server: Server, type: EmitterType) {

        const io = require("socket.io")(server);

        if (EmitterType.Broadcast) {
            const onConnection = (socket: SocketIO.Socket) => {
                socket.on('changingCircle', (data) => {
                    console.log(data);
                    socket.broadcast.emit('changingCircle', data);
                });
            }

            io.on('connection', onConnection);
        }
    }
}