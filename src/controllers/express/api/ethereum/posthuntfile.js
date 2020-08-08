const ethers = require('ethers');
const config = require('../../../../config');
const User = require(config.models_dir + '/mongo/user');
const response_express = require(config.library_dir + '/response').response_express;
const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS

module.exports = async (req, res) => {
    // console.log("ddddddddddddddddddd")
    // console.log(req.body)
    let dataBuffer = Buffer.from(JSON.stringify(req.body));
    const contentHash = await getHashIPFS(dataBuffer)
    // console.log(contentHash)
    const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey')
    let wallet = new ethers.Wallet(user.privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.didaSystemAddress, config.didaSystemABI, wallet)
    contractWithSigner.postHuntFile(contentHash, req.body.reward)
    .then(async tx => {
        if(!tx){
            return Promise.reject("Fail to execute transaction [find data]");
        }
        // console.log(tx)
        // console.log(tx.hash)
        return response_express.success(res, tx.hash)
    })
    .catch(err => {
        response_express.exception(res, err)
    });
}