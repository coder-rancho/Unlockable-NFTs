const path = require("path")

module.exports = {
    BUCKET_NAME: "ImageBucket",
    DOWNLOAD_PATH: path.join(__dirname, "./images/downloads"),
    IMAGES_FOLDER: path.join(__dirname, "./images"),
    PROVIDER_URL: "http://127.0.0.1:8545/"
    
}