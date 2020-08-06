const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const User = require(config.models_dir + '/mongo/user');

module.exports = (req, res) => {
    User.findById(req.token_info._id)
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.didaSystemAddress, config.didaSystemABI, wallet)
        contractWithSigner.takeLabeler(req.body.idUnlabelFile)
        .then(tx => {
            if(!tx){
                return Promise.reject("Fail to execute transaction [find labeler]");
            }
            return response_express.success(res, tx.hash)
        })
        .catch(err => response_express.exception(res, err));
    })
}