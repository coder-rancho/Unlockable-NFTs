const { model } = require("mongoose")
const multer = require("multer")
const path = require("path")

const imgDir = path.join(__dirname, "../images")

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imgDir)
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now()
      cb(null, uniquePrefix + "-" + file.originalname)
    }
  })

const upload = multer({
    storage: storageEngine,
    limits: {
        fileSize: 10 * 1024 * 1024     //10 mb
    }
})

module.exports = { 
    upload,
    imgDir
 }