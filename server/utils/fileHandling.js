const fs = require("fs")
const Jimp = require("jimp");
const path = require('path')

async function deleteFile(filepath) {
    console.log("deleting file...")
    fs.unlink(filepath, (err) => {
        err ? console.log(err) : "";
    })
    console.log("file deleted.")
}

async function generateLowResImg(file, dest, w = Jimp.AUTO, h = Jimp.AUTO) {
    const img = (await Jimp.read(file.path)).resize(w, h)
    const name = `low$${file.filename}`
    const filepath = path.join(dest, name)
    await img.writeAsync(filepath)
    return {
        filename: name,
        path: filepath,
        type: "lowResImg"
    }
}

module.exports = {
    deleteFile,
    generateLowResImg
}