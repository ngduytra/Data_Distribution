const config = require('../../../../config')
const Music = require(config.models_dir + '/mongo/music')
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
    Music.findById(req.body.idMongo)
    .then( (music) => {
        User.update({ privateKey: config.ownerSecretKey }, { $pull: { validateFile: req.body.idMongo}}).exec()
        if(req.body.isConfirm){
            music.isValid = true
            
        } else{
            music.isValid = null
        }
        return music.save();
    })
    .then((user)=>{
        return response_express.success(res, user.userName)
    })
    .catch(err=>{
        console.log(err)
        return response_express.exception(res, err)
    })
}