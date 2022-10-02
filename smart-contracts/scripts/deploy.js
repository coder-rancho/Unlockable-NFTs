const hre = require("hardhat")

async function main() {
    const MyToken = await hre.ethers.getContractFactory("MyToken")
    const myToken = await MyToken.deploy()

    await myToken.deployed()

    console.log(myToken.address)
}

main()