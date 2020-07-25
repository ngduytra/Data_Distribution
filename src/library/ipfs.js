const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: '35.222.7.203', port: '5001', protocol: 'http' }) //'http://34.67.61.172:5001'
exports.getHashIPFS = (buffer) =>{
    return new Promise( async (resolve, rejects) => {
        // let a = {
        //     tags: "abc",
        //     hash: "xkx"
        // }
        // let buf = Buffer.from(JSON.stringify(a));
        const results = await ipfs.add(buffer)
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
        // console.log(results[0].hash)
        resolve(results[0].hash)
        }
    );
}