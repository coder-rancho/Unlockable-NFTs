const { ethers } = require("ethers")

const { PROVIDER_URL, CONTRACT_ADDRESS} = require("../config")
const Nft = require("../models/nft")


//> ------- Global Variables -------------
const ABI = [
    "event NftCreated(address indexed nft, address indexed creator, string uri)",
]

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)


/**
 * Todo: extract uri (nftId) of nft and update the DB
 */
const nftCreated = async() => {
    console.log("Listening for Nft creation.")

    contract.on("NftCreated", async (nftAddress, creator, uri, event) => {
        const info = { nftAddress, creator, uri }
        console.log("-----------NFT CREATED--------------")
        console.log(info)

        try {
            const nftId = uri;        
            const nft = await Nft.findById(nftId).exec()
            
            if (!nft.nftAddress) {
                nft.nftAddress = nftAddress
                nft.save()
            } else {
                console.log("Nft Already stored in database.")
            }
        } catch(err) {
            console.log(err)
        }        

    })

}


const eventListeners = {
    nftCreated
}

module.exports = {
    eventListeners
}