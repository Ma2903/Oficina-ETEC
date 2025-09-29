const express = require('express');
const socketIO = require('socket.io');
const HTTP = require('http');
const path = require('path');

const app = express();
const server = HTTP.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});

io.on('connection', (socket) => {

    console.log('Um usuário se conectou');

    socket.on('SendMessage', (data) => {
        io.emit('MessagemRecebida', data);
    });

    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou');
    });
});