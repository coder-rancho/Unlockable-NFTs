const mongoose = require('mongoose');
const fs = require('fs');
const { BUCKET_NAME, DOWNLOAD_PATH } = require("../config")
const { deleteFile } = require("../utils/fileHandling");
const path = require('path');


async function downloadFile(req, res, next) {

    filename = req.query.filename

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        bucketName: BUCKET_NAME
    });

    gridfsbucket.openDownloadStreamByName(filename)
        .pipe(fs.createWriteStream(path.join(DOWNLOAD_PATH, filename)))
        .on('error', ()=>{
            console.log("Some error occurred in download:"+error);
            next()
        })
        .on('finish', ()=>{
            console.log("Done downloading!!");
            next()
        });
}

module.exports = {
    downloadFile
}