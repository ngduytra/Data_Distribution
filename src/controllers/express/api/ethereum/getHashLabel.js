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
        contractWithSigner.getHashLabel(req.body.idUnlabelFile)
        .then(tx => {
            if(!tx){
                return response_express.exception(res, "Transaction failed, please try again!")
            }
            // console.log('Hellllooooooo')
            // console.log(tx)
            return response_express.success(res, lib_common.ModifyHash(tx))  
        })
        .catch(err => response_express.exception(res, err));
    })
}