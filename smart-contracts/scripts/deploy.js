const {ethers} = require("hardhat");

async function main() {
    
    const MarketPlace = await ethers.getContractFactory("Marketplace")
    const marketplace = await MarketPlace.deploy()

    await marketplace.deployed()

    console.log(marketplace.address)
    
}

main()