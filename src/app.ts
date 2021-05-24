import 'reflect-metadata';
import fs from 'fs'
import path from 'path'
import Koa from 'koa';
import staticServe from 'koa-static'
import koaBody from 'koa-body';
import koaLog from 'koa-logger'
// import CSRF from 'koa-csrf'

import config from './config'
import router from './router'
import SocketIOPlugin from './extend/socket-io'
import errorController from './controllers/error'
import websocketController from './controllers/websocket'

const app = new Koa(); 

app.on('error', errorController);

app.use(koaLog());
// add the CSRF middleware
// app.use(new CSRF({
//     invalidTokenMessage: 'Invalid CSRF token',
//     invalidTokenStatusCode: 403,
//     excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
//     disableQuery: false
// }));

app.use(koaBody({
    multipart: config.enableUploadFile, // upload file
    encoding:'gzip',
    formidable:{
        uploadDir: config.uploadDir, // 设置文件上传目录
        keepExtensions: config.keepUploadFileExtensions,    // 保持文件的后缀
        maxFieldsSize: config.maxUploadFileSize,
    }
}));

app.use(staticServe(path.join( __dirname, '../public')));
app.use(router.routes());

const { io, server } = SocketIOPlugin(app)
websocketController(io)

server.listen(3000)

console.log('Server running on http://localhost:3000');
