const ethers = require("ethers")
const ABI = require("../ABI")

async function mint() {
    
}

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(`http:/\/localhost:8545`)
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    const contract = new ethers.Contract(contractAddress, ABI, provider)
    
}

main()