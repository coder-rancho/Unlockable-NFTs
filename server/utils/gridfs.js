const mongoose = require("mongoose");
const fs = require("fs");
const { BUCKET_NAME, DOWNLOAD_PATH } = require("../config");
const { deleteFile, generateLowResImg } = require("../utils/fileHandling");
const path = require("path");

const DESTINATION_FOLDER = path.join(__dirname, "../images")

async function uploadFile(file) {

  var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: BUCKET_NAME,
  })

  const lowResFile = await generateLowResImg(file, DESTINATION_FOLDER, w=250)

  fs.createReadStream(file.path)
    .pipe(gridfsbucket.openUploadStream(file.filename))
    .on("error", () => {
      console.log("Some error occured:" + error);
    })
    .on("finish", (result) => {
      console.log("Original Image Uploaded!!");
      console.log(result);
      deleteFile(file.path);
    });


 
  fs.createReadStream(lowResFile.path)
    .pipe(gridfsbucket.openUploadStream(lowResFile.name))
    .on("error", () => console.log("Some error Occured."))
    .on("finish", (result) => {
      console.log("Low Resolution image is uploaded!!")
      console.log(result)
      deleteFile(lowResFile.path)
    })
}

async function downloadFile(filename) {
  var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: BUCKET_NAME,
  });

  gridfsbucket
    .openDownloadStreamByName(filename)
    .pipe(fs.createWriteStream(path.join(DOWNLOAD_PATH, filename)))
    .on("error", () => {
      console.log("Some error occurred in download:" + error);
    })
    .on("finish", () => {
      console.log("done downloading");
    });
}

module.exports = {
  uploadFile,
  downloadFile,
};
