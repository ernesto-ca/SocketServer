const {io} = require('../index');
// Sockets Messages
io.on('connection', client =>{
    client.on('disconnect', () =>{
        console.log("Client Lost");
    });

    client.on('message', (payload)=>{
        console.log("Server got new message:",payload);
        io.emit('message', {server:'Whe receive a new name: '+payload.name })
    });

});