const config = require('../../../../config');
const lib_password = require(config.library_dir + '/password');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const IndividualData = require(config.models_dir +'/mongo/individualData')
const lib_common = require(config.library_dir+'/common');
const sha256 = require('sha256')
const ethers = require('ethers');

module.exports = (req, res) => {
    let miss = lib_common.checkMissParams(res, req.body, ["user"])
    if (miss){
        console.log("Miss param at Create");
        return;
    }
    let missField = lib_common.checkMissParams(res, req.body.user, ["name", "identityNumber", "dob", "address", "gender","job","position", "email","phone","isMarried","hobbies","isShared"])
    if (missField){
        console.log("Miss param at Create Field");
        return;
    }
    // let missChildAddress = lib_common.checkMissParams(res, req.body.user.address, ["detail","province","country"])
    // if (miss){
    //     console.log("Miss param at Create Child Field");
    //     return;
    // }

    IndividualData.create(req.body.user)
    .then(async(data) => {
        // User.updateOne({ privateKey: config.ownerSecretKey }, { $push: { validateUser: req.body.user.addressEthereum } }).exec()
        // response_express.success(res);
        console.log(req.token_info)
        const user = await User.findById(req.token_info._id)
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        const privateKey = user.privateKey;
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.didaSystemAddress, config.didaSystemABI, wallet)
        contractWithSigner.setPersonalInformation(data._id.toString(),req.body.user.isShared)
        .then(async (transaction) => {
            if(!transaction){
                data.deleteOne()
                return response_express.exception(res, "Transaction is null ")
            }
            const receipt = await transaction.wait()
            if(receipt.status !== 1){
                data.deleteOne()
                return response_express.exception(res, "Receipt not exist!");
            }
            const numb = parseInt(receipt.logs[0].data.slice(130), 16) // Get Id from event uploadFile
            response_express.success(res, receipt.transactionHash)
            const historyData = {
                senderID: req.token_info._id,
                songID: data._id,
                contentSender: `Đăng thông tin cá nhân \"${req.body.user.name}\" thành công.`,
                type: 1,
                money: 0,
                songImage: user.avatar
            }
            const newHistory = await History.create(historyData)
            socket.to(user.socketID).emit('notification', newHistory);
        }).catch( (error) => {
            return response_express.exception(res, "Field to execute transaction: " + error)
        })
        .catch(err => {
            response_express.exception(res, err);
        })
    })
} 