import Server from 'socket.io';

const port = process.env.PORT || 3031;
const io = Server(port);

let msgCount = 0;
io.on('connection', (client) => {
    console.log(`a user ${client.id} connected`);
    client.on('disconnect', () => {
        console.log(`user ${client.id} disconnected`);
    });

    client.on('pushChatMessage', (message) => {
        console.log('chat message', ++msgCount, message);
        io.emit('pullChatMessage', {
            message,
        });
    });
});
