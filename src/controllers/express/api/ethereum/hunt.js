const ethers = require('ethers');
const config = require('../../../../config');
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');
const response_express = require(config.library_dir + '/response').response_express;
// const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.token_info._id)
            .lean()
            .select('privateKey')
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.didaSystemAddress, config.didaSystemABI, wallet)
        // console.log(req.body)
        let musicData = await Music.findById(req.body.idFileHuntMongo)
        .lean()
        .select('idSolidity userUpload')
        // console.log(musicData)
        contractWithSigner.hunt(req.body.idHuntFile, musicData.idSolidity)
        .then(async tx => {
            // console.log(tx)
            if(!tx){
                return Promise.reject("Fail to execute transaction [hunt]");
            }
            return response_express.success(res, tx.hash)
        })
        .catch(err => {
            response_express.exception(res, err)
        });
    } catch (error) {
        return response_express.exception(res, "you entered wrong id  ");
    }
}