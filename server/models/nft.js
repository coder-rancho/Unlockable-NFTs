const { mongoose, Schema, model } = require("mongoose")

const nftSchema = new Schema({
    nftAddress: String,
    highResImgId: mongoose.ObjectId,
    lowResImgId: mongoose.ObjectId
})

const Nft = model("NFT", nftSchema)

module.exports = Nft