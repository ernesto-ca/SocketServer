const {io} = require('../index');
const Bands = require('../models/Bands');
const Band = require('../models/band');
const bands = new Bands(); // this will not restart as nodemon listen

bands.addBand( new Band("Metallica"));
bands.addBand( new Band("Queen"));
bands.addBand( new Band("Megadeath"));
bands.addBand( new Band("Gorillaz"));

console.log(bands);
// Sockets Messages
io.on('connection', client =>{

    console.log("Client Connected");
    
    client.on('disconnect', () =>{
        console.log("Client Lost");
    });

    // send bands
    io.emit('active-bands', bands.getBands());

    client.on('vote-band', (payload)=>{
      
         bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band',(payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});