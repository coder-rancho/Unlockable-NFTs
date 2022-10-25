const { verifyMessage } = require("../utils/signature")

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

// Todo: 
async function verifyOwner(req, res, next) {
    
}

module.exports = {
    verifySign,
    verifyOwner
}