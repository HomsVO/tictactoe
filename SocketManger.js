const io = require('./index').io;
const Room = require('./Model/Room');

let roomSet = [];

module.exports = function( socket ){

    let status;
    let room;

    socket.on('join', function(roomName) {
        socket.join(roomName);
        room = createRoom(roomName);
        status = room.include(socket.id);

        console.log('User join room' + roomName + " as a " + status);
        socket.emit('set:gameState',room.gameState()); 
        socket.emit('set:status',status); 
    });
    
    socket.on('makeMove', (data) => {
        if(!room) return false;
        room.makeMove(data.row,data.cell,socket.id);
        io.sockets.in(room.name).emit('set:gameState',room.gameState()); 
    })

    socket.on('restart', ( )=>{
        if(!room) return false;
        io.sockets.in(room.name).emit('set:gameState',room.restart());
    })
    socket.on('disconnect', () => {
        if(!room) return false;
        socket.leave(room.name);
        room.exclude(socket.id);
        if(room.users.length === 0){
            roomSet.splice(roomSet.indexOf(room),1);
        }
        console.log('disconnect');
    });
}

function createRoom(roomId){
    const roomIsSet = roomSet.find((item)=>(item.name === roomId));
    if(roomIsSet) return roomIsSet;

    const room = new Room({name:roomId});
    roomSet.push(room);
    return room;
}
