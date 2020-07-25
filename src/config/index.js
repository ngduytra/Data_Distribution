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

            userBehaviorAddress: '0x40BED5d1b7d763d7Ab19f2ce67375b8115a19729',
            userBehaviorABI: abi.userBehaviorABI,

            tokenAddress: '0x1c5278199Cd07286060D470bA1CA91fCD14006CB',
            tokenABI: abi.tokenABI,

            fileStorageAddress: '0x84bABeB0D938BCDCe3f3975a85359d0F0C8c27ff',
            fileStorageABI: abi.fileStorageABI,

            rankingAddress: '0x596C44621880C5cC7b47f401B19dB3Cac461D487',
            rankingABI: abi.rankingABI,

            didaSystemAddress: '0x2a8C9D852A9bc81C8829BE25218d03826020334B',
            didaSystemABI: abi.didaSystemABI,

            root_dir: root,
            models_dir: root + '/models',
            controllers_dir: root + '/controllers',
            library_dir: root + '/library',
            web_dir: root + '/web',
}

module.exports = Object.assign(main_config, require('./env/'+env) || {});