import { Server, Socket } from "socket.io";

export default function WebsocketController(io: Server) {
    io.on("connection", connection);
}

function connection(socket: Socket) {
    console.log(socket.id);
}
