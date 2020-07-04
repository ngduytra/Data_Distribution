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

            userBehaviorAddress: '0x512D127912f9b09174C154eD58Fa8A9e47a6B669',
            userBehaviorABI: abi.userBehaviorABI,

            tokenAddress: '0xADe9FA3ca4A68A9151f6fbF94c2118A9232c3560',
            tokenABI: abi.tokenABI,

            fileStorageAddress: '0x24A20CFB85EaAd9d2A7d496103a387cee29C886C',
            fileStorageABI: abi.fileStorageABI,

            rankingAddress: '0x0de9179c38Be0327b81DdC347A28f38F01BbEC39',
            rankingABI: abi.rankingABI,
            
            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            web_dir: root + '/web',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});