//> ---------- PACKAGES ---------------
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")

//> ---------- MIDDLEWARES ------------
const { upload } = require("./middlewares/multer")
const { uploadFile, sendFile } = require("./middlewares/gridfs")
const { verifyOwner, verifySign } = require("./middlewares/blockchain")

//> ---------- UTILS ------------------
const { eventListeners } = require("./utils/eventListener")

//> ---------- CONFIGS ----------------
const Nft = require("./models/nft")




//> ------- Global Variables ------------
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 8000
const MONGO_DB_URI = process.env.MONGO_DB_ATLAS_URI || "mongodb://localhost:27017/test"


//> ------- Global Middlewares -------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())




// ---------- main() ------------------
async function main() {
    console.log("Connecting to database...")
    mongoose.connect(MONGO_DB_URI, _ => {
        console.log(`Connected to database.`)
        // Note: Calling this function inside the callback because database should be connected in prior
        eventListeners.nftCreated()
    })

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
    const nft = await Nft.findById(req.params.nftId).exec()
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
 * 
 */
app.post("/downloadImage", verifyOwner, verifySign, async (req, res, next) => {
    // const nftId = req.body.nftId;
    // const nftAdress = req.body.nftAdress
    // const userAddress = req.body.userAddress
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