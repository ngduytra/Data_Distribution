const config = require('../../../../config');
const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS
const response_express = require(config.library_dir + '/response').response_express;


module.exports = async(req, res) => {
    let buf = Buffer.from(JSON.stringify(req.body.object));
    await getHashIPFS(buf)
    .then(result=>{
        return response_express.success(res, result)
    })
}