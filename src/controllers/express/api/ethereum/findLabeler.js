const ethers = require('ethers');
const config = require('../../../../config');
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');
const response_express = require(config.library_dir + '/response').response_express;
const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS
// const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    console.log(req)
    const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey')
    // get file data thong qua req.body.idFile tren mongo de lay hash ipfs
    const songData = await Music.findOne({idSolidity: req.body.idFile})
        .lean()
        .select('hash')
    console.log('ddjdjdjdjjdjdjdjd')
    console.log(songData)
    // sau do dung fetch de get cai file json do
    let a = []
    let subHashLabel = []
    var promises = [];
    await fetch(`https://ipfs.jumu.tk/${songData.hash}`)
        .then(response => response.json())
        .then((jsonData) => {
            console.log("jsondata lengthhhhhh")
            console.log(jsonData)
            let recordPerPart = Math.floor(jsonData.length/req.body.partAmount);
            let remaindingRecord = jsonData.length % req.body.partAmount;
            console.log("jsondata lengthhhhhh")
            console.log(recordPerPart)
            console.log("jsondata lengthhhhhh")
            console.log(remaindingRecord)
            for( var i = 0; i< req.body.partAmount; i++){
                var startIndex = recordPerPart * i
                var citrus = []
                if (i ==  req.body.partAmount - 1){
                    citrus = jsonData.slice(startIndex, startIndex + recordPerPart + remaindingRecord);
                } else{
                    citrus = jsonData.slice(startIndex, startIndex + recordPerPart);
                }
                console.log('Heeellelellelelele')
                console.log(citrus)
                let buf = Buffer.from(JSON.stringify(citrus));
                // const hash = await getHashIPFS(buf)
                promises.push(getHashIPFS(buf))
                
            }
        })
    Promise.all(promises).then(async(subHashLabel) => {
        console.log("dfadsfadsfssssssssssssssssssssssss")
        console.log(subHashLabel)
        // var sas = subHashLabel.toLocaleString()
        // var res = sas.replace("\'", "\"")
        // console.log(res)
        // var strArr = await subHashLabel.map(function(e){return e.toString()});
        // console.log(strArr)
        // var ar = res.split(','); // split string on comma space
        // console.log(ar);

        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.didaSystemAddress, config.didaSystemABI, wallet)
        contractWithSigner.FindLabler(req.body.idFile,req.body.partAmount, req.body.wage, subHashLabel)
        .then(async tx => {
            if(!tx){
                return Promise.reject("Fail to execute transaction [find labeler]");
            }
            return response_express.success(res, tx.hash)
        })
        .catch(err => {
            response_express.exception(res, err)
        });
    })
// a.length / arrpathamount => so record
// let buf = Buffer.from(JSON.stringify(a));
// goi ham get hash ipfs (buffee)
// => hash
// => hashsubarr.push (hash)
    console.log('HHHJHDJJDJDJDJDJ')
    // var sas = subHashLabel.toLocaleString()
    // var res = sas.replace("\'", "\"")
    // // var doubleQuoteArr = subHashLabel.replace(/'/g, '"')
    // console.log(res)
    // // var arr = JSON.parse(subHashLabel);
    // // console.log(arr)
    // return
    
}