
const socketIo = require('socket.io');

const createSocketIoConnection = (server) => {

    const io = socketIo(server ,{

        cors:{
            origin:'*'
        }
    });

    console.log("connection created");

    io.on('connection', (socket) => {
 
        
        socket.on("message-sent" ,(payload)=>{
            
            // console.log(payload);
            socket.broadcast.emit("message-receive" ,payload);
            
        })        

        socket.on("typing" ,(payload)=>{
            socket.broadcast.emit("show-typing" ,payload);

        })

        socket.on("stop-typing" ,(payload)=>{
            socket.broadcast.emit("show-stop-typing" ,payload);

        })
    
    }) 
}

module.exports = createSocketIoConnection;