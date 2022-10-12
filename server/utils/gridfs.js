const mongoose = require('mongoose');
const fs = require('fs');
const { BUCKET_NAME, DOWNLOAD_PATH } = require("../config")
const { deleteFile } = require("../utils/fileHandling");
const path = require('path');


async function uploadFile(file) {

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        bucketName: BUCKET_NAME
    });

    fs.createReadStream(file.path)
        .pipe(gridfsbucket.openUploadStream(file.filename))
        .on('error', ()=>{
            console.log("Some error occured:"+error);
        })
        .on('finish', (result)=>{
            console.log("done uploading");
            console.log(result)
            deleteFile(file.path)
        });
}

async function downloadFile(filename) {

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        bucketName: BUCKET_NAME
    });

    gridfsbucket.openDownloadStreamByName(filename)
        .pipe(fs.createWriteStream(path.join(DOWNLOAD_PATH, filename)))
        .on('error', ()=>{
            console.log("Some error occurred in download:"+error);
        })
        .on('finish', ()=>{
            console.log("done downloading");
        });
}

module.exports = {
    uploadFile,
    downloadFile
}