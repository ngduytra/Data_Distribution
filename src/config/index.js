var path = require('path');
const ethers = require('ethers');
const abi = require ('./abi');
const root = path.normalize(__dirname + '/..');

const env = process.env.ENV || "staging"; // u can use local or online. let change it "local or staging"

var main_config = {
    env: env,
            host: '0.0.0.0',
            port: 6969,

            secret: 'db591d26716a5fbccf9e1068604d2a4e33e5d77e74c65949e5a70a60bcf59c06', //JWT
            ownerSecretKey: '63B3B3D1E9F089A1333066BF4E4832EC48FCBC3720FDECA1930D27AC48965983',
            provider: ethers.getDefaultProvider('kovan'),

            userBehaviorAddress: '0x39700377FdD8f869a70e362c48494082657607DB',
            userBehaviorABI: abi.userBehaviorABI,

            tokenAddress: '0x69Bd3f2faCD1157F4C0812745883a48841402a95',
            tokenABI: abi.tokenABI,
            
            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            web_dir: root + '/web',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});

