const { expect } = require('chai')
const {ethers, Wallet} = require('ethers')

const ABI = [
    "function isHolder(address) view returns(bool)"
]
const nftAddress = '0xCafac3dD18aC6c6e92c921884f9E4176737C052c'

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/") //default
const signer = provider.getSigner()
const contract = new ethers.Contract(nftAddress, ABI, provider)
const owner = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'

const main = async () => {

    describe("Verify owner", async function() {

        it ("should return true", async function() {
            expect(await contract.isHolder(owner)).to.be.true
        }) 
    })
}

main()