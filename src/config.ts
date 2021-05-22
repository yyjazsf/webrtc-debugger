import path from 'path'

export default {
    enableUploadFile: true,
    uploadDir: path.join(__dirname,'public/upload/'),
    keepUploadFileExtensions: true,
    maxUploadFileSize: 2 * 1024 * 1024
}
