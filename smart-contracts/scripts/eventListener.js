const {ethers} = require("ethers")

const ABI = [
    "event NftCreated(address indexed nft, address indexed creator, string uri)",
    "event NftBought(address indexed nft, uint atPrice)"
]

const provider = new ethers.providers.WebSocketProvider("http://127.0.0.1:8545/") //default
const signer = provider.getSigner() 
const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, signer)

const main = async () => {

    console.log("Listening for events...")
    
    contract.on("NftBought", (nft, atPrice, event) => {

        const info = {
            nft,
            atPrice: ethers.utils.formatEther(atPrice), // convert wei to ether
            event
        }

        console.log("-------------NFT BOUGHT--------------")
        console.log(info)
    })

    contract.on("NftCreated", (nft, creator, uri, event) => {
        const info = {
            nft,
            creator,
            uri,
            event
        }

        console.log("-----------NFT CREATED--------------")
        console.log(info)
    })

}

main()