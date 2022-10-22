//> ---------- PACKAGES ----------------------------------------------
const express = require('express')
const ethers = require('ethers')
const mongoose = require('mongoose')
const path = require("path")

//> ---------- MIDDLEWARES ------------
const { upload } = require("./middlewares/multer")
const {
    uploadFile,
    sendFile
} = require("./middlewares/gridfs")

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
 * 
 */
app.get("/", async (req, res) => {
    const nfts = await Nft.find({}).exec()
    const nftIds = []

    nfts.forEach(nft => {
        nftIds.push(nft._id)
    })
    res.send(nftIds)
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
app.get('/image/:nftId', async (req, res, next) => {
    const nft = await Nft.findById(req.params.nftId)
    req.imgId = nft.lowResImgId
    next()
}, sendFile, () => {})

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Todo: Set an Event Listener to check for nft creation and update the nftAddress value.
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
 * Todo: Create the middleware to verify signature
 */
app.post("/downloadImage", /* verify_sign, */ async (req, res, next) => {
    // const objId = req.body.objId;
    // const nftAdress = req.body.nftAdress
    // const signature = req.body.signature    // note: signature - sign(nftAddress)
    const nft = await Nft.findById(req.body.nftId).exec()
    req.imgId = nft.highResImgId
    next()
}, sendFile, () => {})
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