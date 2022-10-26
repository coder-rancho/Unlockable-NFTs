const { ethers } = require("ethers")

const ABI = [
    "function createNFT(string memory _uri,uint _priceInWei) public"
]

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/") //default
const signer = provider.getSigner() 
const contract = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", ABI, signer)

const main = async () => {
    
    const nftId = uri

    const tx = await contract.createNFT(uri, ethers.utils.parseUnits("1", "ether"))

    await tx.wait()

    console.log(tx)

}

main()