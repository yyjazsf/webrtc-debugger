import fs from 'fs'
import path from 'path'
import http from 'http';
import { Server } from "socket.io";
import redis from 'redis'
import Koa from 'koa';
import staticServe from 'koa-static'
import koaBody from 'koa-body';
import koaLog from 'koa-logger'
import config from './config'
import router from './router'
import websocketController from './controller/websocket'
import errorController from './controller/error'

const app = new Koa(); 

app.on('error', errorController);

app.use(koaLog());
app.use(koaBody({
    multipart: config.enableUploadFile, // upload file
    encoding:'gzip',
    formidable:{
        uploadDir: config.uploadDir, // 设置文件上传目录
        keepExtensions: config.keepUploadFileExtensions,    // 保持文件的后缀
        maxFieldsSize: config.maxUploadFileSize,
    }
}));
// change to nginx
app.use(staticServe(path.join( __dirname, '../public')));
app.use(router.routes());

// #region socket.io
const redisClient = redis.createClient()
const server = http.createServer(app.callback())
const io = new Server(server, {
    path: '/ws/',
    adapter: require("socket.io-redis")({
        pubClient: redisClient,
        subClient: redisClient.duplicate()
    })
});
websocketController(io)
// #endregion socket.io

server.listen(3000)

console.log('Server running on http://localhost:3000');
