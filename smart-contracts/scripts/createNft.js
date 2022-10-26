const { ethers } = require("ethers")

const ABI = [
    "function createNFT(string memory _uri,uint _priceInWei) public"
]

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/") //default
const signer = provider.getSigner() 
const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, signer)

const main = async () => {
    
    const uri = /* nftId */ "6353b3d808bb1a1338ac1964"

    const tx = await contract.createNFT(uri, ethers.utils.parseUnits("1", "ether"))

    await tx.wait()

    console.log(tx)

}

main()