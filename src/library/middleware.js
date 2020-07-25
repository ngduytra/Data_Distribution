const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require(config.models_dir + '/mongo/user')
const response = require('./response');

exports.expressMiddleware = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token, config.secret, async (err, decoded) => {
            if(err)
                return response.response_express.exception(res, "Failed to authenticate token.")
            req.token_info = decoded;
            console.log(decoded)
            const user = await User.findById(req.token_info._id)
                .lean()
                .select('isValid');
            console.log("middlewareeeeeeeeeeeeee")
            console.log(user)
            if(user == null || !user.isValid){
                return response.response_express.exception(res, "You haven't validated yet")
            }
            next();
        });
    }else{
        return response.response_express.exception(res, "No token provided.", 403);
    }
}

exports.socketMiddleware = (socket, next) => {
    let token = socket.handshake.query.token;
    if(token === undefined || token === null){
        next(new Error('No token provided.'));
    }else{
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                return(err);
            }
            socket.handshake.decoded_token = decoded;
        });
        next();
    }
}