//> --------------- Packages -----------------------
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//> --------------- Utils --------------------------
const { deleteFile, generateLowResImg } = require("../utils/fileHandling");

//> --------------- Configs -------------------------
const { BUCKET_NAME, DOWNLOAD_PATH, IMAGES_FOLDER } = require("../config");
const Nft = require("../models/nft");





//> ------------- Global Variables -----------------
const LOW_RES_WIDTH = 250 /*pixels*/





//> -------------- Middlewares ----------------------
async function uploadFile(req, res, next) {
    const nft = new Nft()
    req.nftId = nft._id
    const highResImg = req.file
    uploadViaStream(highResImg, nft) // Note: file.path and file.filename are exposed by multer
    const lowResImg = await generateLowResImg(highResImg, IMAGES_FOLDER, w=LOW_RES_WIDTH)
    uploadViaStream(lowResImg, nft)
    next()
}

async function sendFile(req, res, next) {
  // Note: req.imgId should exist before calling the middleware
  const imgId = req.imgId 
  const filePath = path.join(DOWNLOAD_PATH, imgId.toString() + ".jpeg")

  const gridfsbucket = getGridFsBucket()
  // gridfsbucket
  //   .openDownloadStream(imgId)
  //   .pipe(fs.createWriteStream(filePath))
  //   .on("error", () => {
  //     console.log("Some error occurred in download:" + error);
  //     next()
  //   })
  //   .on("finish", () => {
  //     console.log("Done downloading!!");
  //     res.sendFile(filePath, () => {
  //       deleteFile(filePath)
  //     })
  //     next()
  //   })
  gridfsbucket
    .openDownloadStream(imgId)
    .pipe(res)
    .on("error", () => {
      console.log("Some error occurred in download:" + error);
      next()
    })
    .on("finish", () => {
      console.log("Done downloading!!");
      // res.sendFile(filePath, () => {
      //   deleteFile(filePath)
      // })
      next()
    })
}





//> --------------- Utils --------------------
function getGridFsBucket() {
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: BUCKET_NAME,
      });
}

async function uploadViaStream(file, nft) {
  const gridFsBucket = getGridFsBucket()

  const fsReadable = fs.createReadStream(file.path)
  const gridFsWritable = gridFsBucket.openUploadStream(file.filename)

  fsReadable.pipe(gridFsWritable)
  .on("error", _ => console.log(error))
  .on("finish", (res) => {
      console.log(`${file.filename} is Uploaded.`)
      
      if (file.type === "lowResImg") {
          nft.lowResImgId = res._id
      } else {
          nft.highResImgId = res._id
      }
      nft.save()
      console.log("Updated DB.")
      deleteFile(file.path)
  })
}





//> ----------- Exports --------------------
module.exports = {
    uploadFile,
    sendFile
}




//> ------------ Testing --------------------
async function test() {

  require("dotenv").config()

  mongoose.connect(process.env.MONGO_DB_ATLAS_URI)

  sendFile({
    body: {
      nftId: '6352959a5bf8bfac853ca287'
    }
  }, null, null)

}
// test()