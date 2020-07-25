const ethers = require('ethers');
const config = require('../../../../config');
const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS
const response_express = require(config.library_dir + '/response').response_express;
const Survey = require(config.models_dir + '/mongo/survey');
// const lib_common = require(config.library_dir+'/common');

module.exports = async(req, res) => {
    try {
        if(!req.body.content) {
            return response_express.exception(res, "Haven't content in body")
        } else {
        const hash = await getHashIPFS(req.body.content)
        console.log(hash)
        const survey =await Survey.create({
            ...req.body,
            ownerID:token_info,
            contentHash: hash
        })
        console.log(survey)
        let privateKey = config.ownerSecretKey;
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.didaSystemAddress, config.didaSystemABI, wallet)
        const tx = await contractWithSigner.createSurvey(survey._id, survey.contentHash, req.body.endDay,req.body.feePerASurvey,req.body.surveyInDemand)
        console.log(tx)
        if(!tx){
            return Promise.reject("Fail to execute transaction");
        }
        const receipt = await tx.wait()
        console.log(receipt)
        if(receipt.status !== 1){
            return response_express.exception(res, "Receipt not exist!");
        }
        return response_express.success(res, tx.hash)
    }} catch (err) {
        return response_express.exception(res, err || err.message)
    }
}