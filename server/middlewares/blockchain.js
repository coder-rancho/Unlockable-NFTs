const { verifyMessage } = require("../utils/signature")
const { isOwnerOfNft } = require("../utils/blockchain")

async function verifySign(req, res, next) {
    try {
        if (
            verifyMessage(
                {
                    message: req.body.nftAddress,
                    address: req.body.userAddress,
                    signature: req.body.signature
                }
            )
        ) {
            next()
        } else {
            res.status(401).send({
                message: "Unauthorized."
            })
        }
    } catch(err) {
        console.log(err)
        res.status(400).send({
            message: err
        })
    }
}

async function verifyOwner(req, res, next) {
    try {
        if ( isOwnerOfNft(req.body.userAddress, req.body.nftAddress) ) {
            next()
        } else {
            res.status(401).send("user is not the owner of the nft")
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

module.exports = {
    verifySign,
    verifyOwner
}