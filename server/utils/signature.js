const ethers = require("ethers")

const verifyMessage = ({ message, address, signature }) => {
    try {
      const signerAddr = ethers.utils.verifyMessage(message, signature);
      if (signerAddr !== address) {
        return false;
      }
      
      return true;
    } catch (err) {
      console.log(err);
      throw "Bad request"
    }
};

module.exports = {
    verifyMessage
}