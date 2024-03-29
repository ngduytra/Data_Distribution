const ethers = require('ethers');
const config = require('../../../../config');
const User = require(config.models_dir + '/mongo/user');
const response_express = require(config.library_dir + '/response').response_express;
// const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey')
    let wallet = new ethers.Wallet(user.privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.didaSystemAddress, config.didaSystemABI, wallet)
    contractWithSigner.cancelHuntedFile(req.body.idHuntFile)
    .then(async tx => {
        if(!tx){
            return Promise.reject("Fail to execute transaction [cancel hunt data]");
        }
        return response_express.success(res, tx.hash)
    })
    .catch(err => {
        response_express.exception(res, err)
    });
}