import { Server, Socket } from "socket.io";

let io:Server

export default function WebsocketController(ioServer: Server) {
    io = ioServer
    io.on("connection", connection);

    io.on('join', joinChannel)
}

function connection(socket: Socket) {
    console.log(socket.id);

    socket.join('temp-uuid1-uuid2')

    console.log('io.sockets.adapter.rooms',io.sockets.adapter.rooms)
    console.log('socket.rooms',socket.rooms); 

    // socket.use(([event, ...args], next) => {
    //     // if (isUnauthorized(event)) {
    //     console.log('socket', event)

    //     next();
    // })
    // socket.on('error', )
}

interface IJoinChannel{
    channel: string
}
function joinChannel(data: IJoinChannel) {

}
