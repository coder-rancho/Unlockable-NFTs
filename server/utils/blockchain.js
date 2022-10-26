const ethers = require("ethers")
const { PROVIDER_URL } = require("../config")

const ABI = [
    "function isHolder(address) view returns(bool)"
]
const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)

async function isOwnerOfNft(userAddress, nftAddress) {
    const contract = new ethers.Contract(nftAddress, ABI, provider)
    return contract.isHolder(userAddress)
}

module.exports = {
    isOwnerOfNft
}


const test = async() => {
    const nft = '0xCafac3dD18aC6c6e92c921884f9E4176737C052c'
    const owner = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'

    console.log(await isOwnerOfNft(owner, nft))

}

// test()