import { Server } from "socket.io";
import redis from 'redis'
import http from 'http';
import Koa from 'koa'
import { v4 as uuidv4 } from 'uuid';
import config from '../config'

function extendSocketIO(app: Koa) {
    const redisClient = redis.createClient(config.redisConfig)
    redisClient.on("error", function(error) {
        console.error('redis', error);
    });
    const server = http.createServer(app.callback())
    const io = new Server(server, {
        path: '/ws/',
        adapter: require("socket.io-redis")({
            pubClient: redisClient,
            subClient: redisClient.duplicate()
        })
    });
    // https://socket.io/docs/v4/server-instance/
    // session ID
    io.engine.generateId = () => uuidv4()
    // io.serveClient(false)

    // io.engine.on("connection_error", (err: ) => {
    //     console.log(err.req);	     // the request object
    //     console.log(err.code);     // the error code, for example 1
    //     console.log(err.message);  // the error message, for example "Session ID unknown"
    //     console.log(err.context);  // some additional error context
    // });
    
    return {
        io,
        server
    }
}

export default extendSocketIO
