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

async function downloadFile(req, res, next) {
  const filename = req.query.filename;

  var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: BUCKET_NAME,
  });

  gridfsbucket
    .openDownloadStreamByName(filename)
    .pipe(fs.createWriteStream(path.join(DOWNLOAD_PATH, filename)))
    .on("error", () => {
      console.log("Some error occurred in download:" + error);
      next();
    })
    .on("finish", () => {
      console.log("Done downloading!!");
      next();
    });
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
    downloadFile
}




//> ------------ Testing --------------------
// async function test() {

//     await mongoose.connect("")

//     uploadFile({
//         file: {
//             filename: "MyTestFile.jpeg",
//             path: "C:\\Users\\Dell\\Desktop\\Unlockable-NFTs\\server\\images\\downloads\\img-2.jpg"
//         }
//     }, {}, null)


// }
// test()