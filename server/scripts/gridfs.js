var mongoose = require('mongoose');
var fs = require('fs');


async function uploadFile() {

    // console.log(mongoose.connection.db)

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        chunkSizeBytes:1024,
        bucketName:'filesBucket'
    });

    fs.createReadStream("./temp.txt")
        .pipe(gridfsbucket.openUploadStream('temp.txt'))
        .on('error', ()=>{
            console.log("Some error occured:"+error);
        })
        .on('finish', (result)=>{
            console.log("done uploading");
            console.log(result)
        });
}

async function downloadFile() {

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        chunkSizeBytes:1024,
        bucketName:'filesBucket'
    });

    gridfsbucket.openDownloadStreamByName('temp.txt')
        .pipe(fs.createWriteStream('./sample-download.txt'))
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