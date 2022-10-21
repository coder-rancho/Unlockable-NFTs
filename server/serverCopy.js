const express = require('express')
const ethers = require('ethers')
const mongoose = require('mongoose')
const { uploadFile, /*downloadFile*/} = require("./utils/gridfs")
const { verifyMessage } = require("./utils/signature")
const { upload } = require("./middlewares/multer")
const { downloadFile } = require("./middlewares/gridfs")
const { DOWNLOAD_PATH } = require("./config")
const path = require("path")
const { deleteFile } = require('./utils/fileHandling')

require("dotenv").config()

const app = express()
const port = 8000
const MONGO_DB_URI = process.env.MONGO_DB_ATLAS_URI




async function main() {
  console.log("Connecting to database...");
  await mongoose.connect(MONGO_DB_URI).then( _ => console.log("Connected to database."))

}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
app.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  uploadFile(file)
  res.send(file.filename)
})

/**
 * 
 * 
 * 
 */
app.get("/download", downloadFile, async (req, res) => {
  const filepath = path.join(DOWNLOAD_PATH, req.query.filename)
  res.download(filepath, (err) => {
    if (err) {
      console.log(err)
    } else {
      deleteFile(filepath)
    }
  })
})

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
// app.post()

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @reqBody {address} nft 
 * @reqBody {address} user
 * @reqBody {hash} signature User will sign the NFT's address and generate a signature.
 */
app.post("/getNFT", async (req, res) => {

  const {
    nft,
    user,
    signature
  } = req.body;

  if (!nft || !user || !signature) {
    res.send("Invalid request!!")
    return;
  }

  const isOwner = verifyMessage(nft, user, signature);

  // Todo: Retrive file from mongodb and send to the user.
  if (isOwner) res.sendFile()
  else res.send("You're not the authorised owner.")

})





app.listen(port, () => {
  console.clear()
  console.log(`App is running on port: ${port}`)
  main().catch(err => console.log(err))
})