const { ethers } = require("ethers")

const ABI = [
    "function buyNft(address _nftAddress) public payable"
]

const provider = new ethers.providers.JsonRpcProvider() 
const wallet = new ethers.Wallet(/*private key*/ '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', provider)
const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, wallet)

const main = async () => {

    const options = {value: ethers.utils.parseEther("1.0")}
    const tx = await contract.buyNft('0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968', options)
    await tx.wait()

    console.log(tx)

}

main()