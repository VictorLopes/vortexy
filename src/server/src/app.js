
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const { vortexy } = require('../../vortexy/lib-server');

app.use(express.static(__dirname + '/../public'));

const vortex = new vortexy.Server(http, vortexy.EmitterType.Broadcast);

/* function onConnection(socket) {
    socket.on('changingCircle', (data) => {
        console.log(data);
        socket.broadcast.emit('changingCircle', data);
    });
}

io.on('connection', onConnection);
 */
http.listen(port, () => console.log('listening on port ' + port));