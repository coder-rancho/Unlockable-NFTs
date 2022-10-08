const express = require('express')
const ethers = require('ethers')
const mongoose = require('mongoose')
const { uploadFile, downloadFile} = require("./scripts/gridfs")

require("dotenv").config()

const app = express()
const port = 8000
const MONGO_DB_URI = process.env.MONGO_DB_ATLAS_URI


async function main() {
  await mongoose.connect(MONGO_DB_URI).then( _ => console.log("Connected to mongodb"))

}

const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddr = ethers.utils.verifyMessage(message, signature);
      if (signerAddr !== address) {
        return false;
      }
      
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
};

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
})


main().catch(err => console.log(err))