const ethers = require('ethers');
const config = require('../../../../config');
const User = require(config.models_dir+'/mongo/user')
const response_express = require(config.library_dir + '/response').response_express;
// const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    const user = await User.findById(req.token_info._id)
    .lean()
    .select('privateKey socketID')
    if(!user){
        return response_express.exception(res, "User not exist!")
    }
    const privateKey = user.privateKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.tokenAddress, config.tokenABI, wallet)
    contractWithSigner.transfer(req.body.address, req.body.amount)
    .then(async tx => {
        if(!tx){
            return Promise.reject("Fail to execute transaction");
        }
        return response_express.success(res, tx.hash)
    })
    .catch(err => {
        response_express.exception(res, err)
    });
}