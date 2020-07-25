const config = require('../../../../config');
const Contract = require(config.models_dir + '/mongo/contract');
const User = require(config.models_dir + '/mongo/user');
const Follow = require(config.models_dir + '/mongo/follow');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => { 
    try {
        const user = await User.findById(req.token_info._id)
            .lean()
            .select('isAdmin validateUser validateFile');
        if(!user.isAdmin){
            return response_express.exception(res, "You are not administrator")
        }

        

        const result = {
            userArray: user.validateUser,
            fileArray:  user.validateFile
        }
        return response_express.success(res, result)

    } catch (error) {
        return response_express.exception(res, error)
    }  
}
