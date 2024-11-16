const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('update_task', (data) => {
        console.log('Task updated:', data);
        io.emit('task_updated', data); // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(4000, () => {
    console.log('Collaboration Service running on port 4000');
});
