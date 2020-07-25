const config = require('../../../../config')
const User = require(config.models_dir + '/mongo/user')
const response_express = require(config.library_dir + '/response').response_express
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    const user = await User.findById(req.token_info._id)
        .lean()
        .select('isAdmin');
    if(!user.isAdmin){
        return response_express.exception(res, "You are not administrator")
    }
    console.log(req.body.isConfirm)
    User.findOne({addressEthereum:req.body.addressEthereum})
    .then( (user) => {
        User.update({ privateKey: config.ownerSecretKey }, { $pull: { validateUser: req.body.addressEthereum} }).exec()

        if(req.body.isConfirm){
            user.isValid = true
            
        } else{
            user.isValid = null
        }
        return user.save();
    })
    .then((user)=>{
        return response_express.success(res, user.userName)
    })
    .catch(err=>{
        console.log(err)
        return response_express.exception(res, err)
    })
}