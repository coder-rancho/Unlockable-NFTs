const { ethers } = require("ethers")

const ABI = [
    "function buyNft(address _nftAddress) public payable"
]

const provider = new ethers.providers.JsonRpcProvider() 
const wallet = new ethers.Wallet(/*private key*/ '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', provider)
const contract = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", ABI, wallet)

const main = async () => {

    const options = {value: ethers.utils.parseEther("1.0")}
    const tx = await contract.buyNft('0xCafac3dD18aC6c6e92c921884f9E4176737C052c', options)
    await tx.wait()

    console.log(tx)

}

main()