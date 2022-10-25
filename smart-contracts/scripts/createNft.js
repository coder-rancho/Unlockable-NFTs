const { ethers } = require("ethers")

const ABI = [
    "function createNFT(string memory _uri,uint _priceInWei) public"
]

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/") //default
const signer = provider.getSigner() 
const contract = new ethers.Contract("0x5fbdb2315678afecb367f032d93f642f64180aa3", ABI, signer)

const main = async () => {
    

    const tx = await contract.createNFT("https://www.google.com", ethers.utils.parseUnits("1", "ether"))

    await tx.wait()

    console.log(tx)

}

main()