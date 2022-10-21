const path = require("path")

module.exports = {
    BUCKET_NAME: "ImageBucket",
    DOWNLOAD_PATH: path.join(__dirname, "./images/downloads"),
    IMAGES_FOLDER: path.join(__dirname, "./images")
}