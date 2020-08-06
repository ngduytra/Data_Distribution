const ethers = require('ethers');
const config = require('../../../../config');
const User = require(config.models_dir + '/mongo/user');
const response_express = require(config.library_dir + '/response').response_express;
const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS
// const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    console.log(req)
    const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey')

    let buf = Buffer.from(JSON.stringify(req.body.content));
    let hash = getHashIPFS(buf)
    let wallet = new ethers.Wallet(user.privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.didaSystemAddress, config.didaSystemABI, wallet)
    contractWithSigner.takeFeedback(hash, req.body.star, req.body.idFile)
    .then(async tx => {
        if(!tx){
            return Promise.reject("Fail to execute transaction [take feedback]");
        }
        return response_express.success(res, tx.hash)
    })
    .catch(err => {
        response_express.exception(res, err)
    });
}