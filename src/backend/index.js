let express = require('express');
let app = express();

let http = require('http')

let server = http.Server(app)

let cors = require('cors');

app.use(cors());

let socketIo = require('socket.io')

let io = socketIo(server);

const port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log(`listening for requests on port ${port}`);
});


io.on('connection', (socket) => {

    console.log(`New connection ${socket.id}`)

    socket.on('chat', function (data) {
   
        io.sockets.emit('chat', {user:data.user,message:data.message});
    });

    socket.on('typing', function (data) {
        io.sockets.emit('typing', {user:data.user,message:data.message});
        socket.broadcast.emit('typing', data);
    });

   

});











//  socket.on('join',(data)=>{
//         socket.join(data.room);
//         socket.broadcast.to(data.room).emit('User joined');
//     })
//     socket.on('message',(data)=>{
//             io.in(data.room).emit('new Message',{user:data.user,message:data.message});
//     })






// Socket setup

// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "http://localhost:4200",
//     methods: ["GET", "POST"]
//   }
// });


// app.listen(PORT,()=> console.log(`server running on port ${PORT}`))

// Listen for new connection and print a message in console 
