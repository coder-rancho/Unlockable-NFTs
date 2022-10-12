const fs = require("fs")

async function deleteFile(filepath) {
    console.log("deleting file...")
    fs.unlink(filepath, (err) => {
        err ? console.log(err) : "";
    })
    console.log("file deleted.")
}

module.exports = {
    deleteFile
}