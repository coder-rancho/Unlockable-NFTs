const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddr = ethers.utils.verifyMessage(message, signature);
      if (signerAddr !== address) {
        return false;
      }
      
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
};

module.exports = {
    verifyMessage
}