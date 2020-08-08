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
            ownerSecretKey: '63b3b3d1e9f089a1333066bf4e4832ec48fcbc3720fdeca1930d27ac48965983',
            provider: ethers.getDefaultProvider('kovan'),

            userBehaviorAddress: '0x278acCE6D7CD974DEdd4B09c70384C71DC742e68',
            userBehaviorABI: abi.userBehaviorABI,

            tokenAddress: '0x7a62084Ea1B2B29F6Ae5749481202b54Bb38900D',
            tokenABI: abi.tokenABI,

            fileStorageAddress: '0xcBE4a4f8A1e1b66b970573592F08C71bBE17110F',
            fileStorageABI: abi.fileStorageABI,

            rankingAddress: '0xeccC0eD591eB9a7e564BA6054aAD8Cf8d5063810',
            rankingABI: abi.rankingABI,

            didaSystemAddress: '0x4B71752b3c476d0F6527B70449fE56508B9A5129',
            didaSystemABI: abi.didaSystemABI,

            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            web_dir: root + '/../web',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});