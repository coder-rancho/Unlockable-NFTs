//> ---------- PACKAGES ----------------------------------------------
const express = require('express')
const ethers = require('ethers')
const mongoose = require('mongoose')
const path = require("path")

//> ---------- MIDDLEWARES ------------
const { upload } = require("./middlewares/multer")
const { downloadFile, uploadFile } = require("./middlewares/gridfs")

//> ---------- UTILS ------------------
const { verifyMessage } = require("./utils/signature")
const { deleteFile } = require('./utils/fileHandling')

//> ---------- CONFIGS ----------------
const { DOWNLOAD_PATH } = require("./config")
const Nft = require("./models/nft")




//> ------- Global Variables -------------
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 8000
const MONGO_DB_URI = process.env.MONGO_DB_ATLAS_URI || "mongodb://localhost:27017/test"


//> ------- Global Middlewares -------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())




// ---------- main() ------------------
async function main() {
    console.log("Connecting to database...")
    await mongoose.connect(MONGO_DB_URI, _ => console.log(`Connected to database.`))
}





// -------------------- ROUTES --------------------------
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Todo: Check the implementation after inserting data.
 */
app.get('/', (req, res) => {
    
})

/**
 * 
 * 
 * 
 * 
 * 
 * Todo: Upload High res image and low res image
 * Todo: save both image's objectId in NFTs collection
 * Todo: Set an Event Listener to check for nft creation and update the nftAddress value.
 * 
 *
 */
app.post("/uploadImage", upload.single("image"), uploadFile, (req, res) => {
res.send(req.nftId)
})

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
app.post("/downloadImage", (req, res) => {
    const objId = req.body.objId;
    const nftAdress = req.body.nftAdress
    const signature = req.body.signature    // note: signature - sign(nftAddress)
})
/**
 * 
 * 
 * 
 * 
 */
console.clear()
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
    main()
})