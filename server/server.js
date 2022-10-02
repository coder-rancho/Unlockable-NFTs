const express = require('express')
const ethers = require('ethers')
const app = express()
const port = 8000

const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      if (signerAddr !== address) {
        return false;
      }
      
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
};

app.get('/', async (req, res) => {
  let message = req.query.nftAddress + req.query.tokenId
  let address = req.query.address
  let signature = req.query.signature

  if (!message || !address || !signature) {
    res.send("Invalid request!!")
    return
  }

  let isValidUser = await verifyMessage({message, address, signature})

  if (isValidUser) {
    /* TODO */
    // fetch image from mongodb nftAdress -> tokenId = link_to_image.
    res.send("file/image link")
  } else {
    res.send("You're not authorized to access this NFT.")
  }
})



app.listen(port, () => {
  console.log(`App is running on port: ${port}`)
})