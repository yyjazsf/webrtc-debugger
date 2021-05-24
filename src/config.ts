import path from 'path'

export default {
    enableUploadFile: true,
    uploadDir: path.join(__dirname,'public/upload/'),
    keepUploadFileExtensions: true,
    maxUploadFileSize: 2 * 1024 * 1024,
    // redis
    redisConfig: {
        port      : 6379,
        host      : '127.0.0.1',
        // password: '',
        // tls       : {
        //     key  : stringValueOfKeyFile,  
        //     cert : stringValueOfCertFile,
        //     ca   : [ stringValueOfCaCertFile ]
        // }
    }
}
