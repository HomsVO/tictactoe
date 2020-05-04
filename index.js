const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = module.exports.io = require('socket.io')(server);
const port = process.env.PORT || 8000;

const SocketManager = require('./SocketManger');

server.listen(port);

app.use(express.static(path.join(__dirname, 'client/public')));

io.on('connection', SocketManager);