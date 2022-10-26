const { ethers } = require("ethers")
const { PROVIDER_URL } = require("../config")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)
    const wallet = new ethers.Wallet(privateKey, provider)
    const result = await wallet.signMessage(message)
    console.log(result)
}

const privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
const message = "0xCafac3dD18aC6c6e92c921884f9E4176737C052c"


main()