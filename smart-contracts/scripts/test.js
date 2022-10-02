const { hre, ethers } = require("hardhat")


async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const contract = await ethers.getContractAt("MyToken", contractAddress)

    // console.log("provider: ", provider)
    // console.log("Contract Address: ", myToken.address)

}

main()