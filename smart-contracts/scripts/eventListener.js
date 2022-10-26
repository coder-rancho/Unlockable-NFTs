const {ethers} = require("ethers")

const ABI = [
    "event NftCreated(address indexed nft, address indexed creator)",
    "event NftBought(address indexed nft, uint atPrice)"
]

const provider = new ethers.providers.WebSocketProvider("http://127.0.0.1:8545/") //default
const signer = provider.getSigner() 
const contract = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", ABI, signer)


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

    contract.on("NftCreated", (nft, creator, event) => {
        const info = {
            nft,
            creator,
            event
        }

        console.log("-----------NFT CREATED--------------")
        console.log(info)
    })

}

main()