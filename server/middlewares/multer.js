const multer = require("multer")
const path = require("path")
const {IMAGES_FOLDER} =require("../config")

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, IMAGES_FOLDER)
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now()
      cb(null, uniquePrefix + "-" + file.originalname) // Note: filename format
    }
  })

const upload = multer({
    storage: storageEngine,
    limits: {
        fileSize: 10 * 1024 * 1024    // Note: fileSize Limit = 10mb
    }
})

module.exports = {
  upload
}