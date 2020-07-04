// pragma solidity ^0.4.25;
pragma solidity >=0.4.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "./safemath.sol";
import "./Token.sol";
import "./FileStorage.sol";
import "./FileStruct.sol";
import "./Ownable.sol";

contract UserBehavior is FileStruct, Ownable{
    using SafeMath for uint256;
    
    event Log_uploadFile(address owner, Kind kind, uint idFile);
    event Log_downloadFile(address recipient, uint idFile);
    event Log_usingISO(address sender, uint idFile, uint offerPercent, uint offerAmount, uint maintain);
    event Log_investISO(address sender, uint idFile, uint investAmount);
    event Log_withdraw(address recipient, uint amount);
    event Log_createSurveySuccessfully(address owner, uint idSurvey);
    event Log_takenSurveySuccessfully(address people, uint idSurvey);
    event Log_takenFeedbackSuccessfully(uint idFile);
    event huntEventSuccessfully(address indexed _peopleInNeed, address indexed _hunter);
    event Log_sharingIndividualData(address indexed owner);
    
    uint idSurvey = 0;
    uint idHuntfile = 0;
    uint pDMoney = 0;
    huntedFile[] huntedfiles;
    UnlabelFile[] unlabelfiles;
    mapping(uint => huntedFile) huntedfile;
    mapping(uint => Survey) survey;
    // mapping(uint => Feedback[]) feedback;
    mapping(address => individualData) personalData;
    mapping(uint => SongContract[]) usingDataContractOfAData;
    mapping(uint => UnlabelFile) unlabelfile;
    individualData[] PData;
    Token token;
    FileStorage fileStorage;
    
    
    
    uint public getBalaceOfContract = address(this).balance;

    function setTokenFileStorageAddress(address _token, address _fileStorage ) public onlyOwner{
        token = Token(_token);
        fileStorage = FileStorage(_fileStorage);
    }
    function setDataSharingCommision(uint _pDMoney) public onlyOwner {
        pDMoney = _pDMoney;
    }
    
    function uploadFile(string memory _fileHash, uint _price, Kind _kind, string memory _idMongoose) public returns(uint){
        while (fileStorage.getIsUsingID() == 1){
            continue;
        }
        fileStorage.setIsUsingID(1);
        uint tempID = fileStorage.getVarIdFile();
        fileStorage.setVarIdFile(1);
        fileStorage.setIsUsingID(0);
        File memory fileTemp = File(tempID, _idMongoose, _fileHash, msg.sender, _price, 0, 0, now, true, _kind, false);
        fileStorage.setFileList(tempID, fileTemp);
        fileStorage.setUserList_uploadList(msg.sender, tempID);
        fileStorage.setFileLength(1);
        emit Log_uploadFile(msg.sender, _kind, tempID);
        return tempID;
    }

    function dowloadFile(uint _idFile) public returns(string memory){
        require(fileStorage.getFileList(_idFile).valid);
        if(fileStorage.getFileList(_idFile).kind == Kind.Music && fileStorage.getFileList(_idFile).IsISO){
            token.TransferFromTo(msg.sender, address(this), fileStorage.getFileList(_idFile).price);
            uint tempCost = ((fileStorage.getFileList(_idFile).price*fileStorage.getISOList(_idFile).ownerPercent) / 100000);
            token.TransferFromTo(address(this), fileStorage.getFileList(_idFile).owner, tempCost);
            fileStorage.setISOList(_idFile, 5, 1);
            uint timeSendISO = fileStorage.getISOList(_idFile).timeExpired + 1*fileStorage.getISOList(_idFile).week;
            if(now > timeSendISO){
                Invest[] memory arr = fileStorage.getISOList(_idFile).investListISO;
                for(uint i = 0; i < arr.length; i++){
                    uint temp = ((fileStorage.getFileList(_idFile).price*arr[i].percentage)*fileStorage.getISOList(_idFile).numberOfDownload / 100000);
                    token.TransferFromTo(address(this), arr[i].investor, temp);
                }
                fileStorage.setISOList(_idFile, 5, -(fileStorage.getISOList(_idFile).numberOfDownload));
                fileStorage.setISOList(_idFile, 6, 1);
            }
        }
        else
            token.TransferFromTo(msg.sender, fileStorage.getFileList(_idFile).owner, fileStorage.getFileList(_idFile).price);
        fileStorage.setUserList_downloadList(msg.sender, _idFile);
        fileStorage.setFileList_totalDownloader(_idFile, 1);
        fileStorage.setFileList_weekDownloader(_idFile, 1);
        emit Log_downloadFile(msg.sender, _idFile);
        return fileStorage.getFileList(_idFile).fileHash;
    }

    function getUserUpload() public view returns(File[] memory){
        File[] memory tempFile = fileStorage.getFileFunc(fileStorage.getUserList(msg.sender).uploadList);
        return tempFile;
    }
    
    function getUserDownload() public view returns(File[] memory){
        File[] memory tempFile = fileStorage.getFileFunc(fileStorage.getUserList(msg.sender).downloadList);
        return tempFile;
    }
    
    // function usingISO(uint _idFile, uint _offerPercent, uint _offerAmount, uint _maintain) public{
    //     require(msg.sender == fileStorage.getFileList(_idFile).owner);
    //     require(fileStorage.getFileList(_idFile).kind == Kind.Music);
    //     require(!fileStorage.getFileList(_idFile).IsISO);
    //     require(_offerPercent <= 50000 && _offerPercent >= 1000); // 50% >= offerPercent >= 1%
    //     require(_offerAmount >= 100); //100 HAK
    //     require(_maintain >= 60); //60s
    //     fileStorage.setISOList(_idFile, 0, _offerPercent);
    //     fileStorage.setISOList(_idFile, 1, _offerAmount);
    //     fileStorage.setISOList(_idFile, 2, _offerAmount);
    //     fileStorage.setISOList(_idFile, 3, now + _maintain);
    //     fileStorage.setISOList(_idFile, 4, 100000);
    //     fileStorage.setISOList(_idFile, 5, 0);
    //     fileStorage.setISOList(_idFile, 6, 1);
    //     fileStorage.setISOListFile(_idFile, fileStorage.getFileList(_idFile));
    //     fileStorage.setFileList_IsISO(_idFile, true);
    //     fileStorage.setListIDISO(_idFile);
    //     emit Log_usingISO(msg.sender, _idFile, _offerPercent, _offerAmount, _maintain);
    // }
    
    // function investISO(uint _idFile, uint _investAmount) public{
    //     require(fileStorage.getISOList(_idFile).amountRemaining >= _investAmount);
    //     require(now <= fileStorage.getISOList(_idFile).timeExpired);
    //     token.TransferFromTo(msg.sender, fileStorage.getFileList(_idFile).owner, _investAmount);
    //     fileStorage.setISOList(_idFile, 2, fileStorage.getISOList(_idFile).amountRemaining - _investAmount);
    //     uint _investPercent = ((_investAmount * fileStorage.getISOList(_idFile).offerPercent) / fileStorage.getISOList(_idFile).offerAmount);
    //     Invest memory tempInvest = Invest(msg.sender, _investPercent, _investAmount);
    //     fileStorage.setISOList_investListISO(_idFile, tempInvest);
    //     fileStorage.setISOList(_idFile, 4, fileStorage.getISOList(_idFile).ownerPercent - _investPercent);
    //     fileStorage.setUserList_investList(msg.sender, _idFile);
    //     emit Log_investISO(msg.sender, _idFile, _investAmount);
    // }
    
    function getFileById(uint _idFile) public view returns(File[] memory){
        File[] memory tempFile = new File[](1);
        tempFile[0] = fileStorage.getFileList(_idFile);
        return tempFile;
    }
    
    // function getISOId(uint _idFile) public view returns(ISO[] memory){
    //     ISO[] memory tempISO = new ISO[](1);
    //     tempISO[0] = fileStorage.getISOList(_idFile);
    //     return tempISO;
    // }
    
    // function getISOList() public view returns(ISO[] memory) {
    //   ISO[] memory tempISO = fileStorage.getISOListInfo();
    //   return tempISO;
    // }
    
    // function getISOAddress(address _addr) public view returns(ISO[] memory) {
    //   ISO[] memory tempISO = fileStorage.getISOListAddress(_addr);
    //   return tempISO;
    // }
    
    // User co the tao duoc nhieu lan, nen la ham nay nen for kiem la id do ha co execute hay chua
    function createContract(
        uint _idFile,
        string memory _idContractMongo,
        
        string memory _songHash, 
        string memory _contentHash,
        uint _contractMoney,
        
        address _owner,
        uint _ownerCompensationAmount,
        
        address _signer,
        uint _signerCompensationAmount,
        
        uint _timeExpired
        ) public {
            require(msg.sender == _owner || msg.sender == _signer );
            require(_owner == fileStorage.getFileList(_idFile).owner);
            bool _ownerApproved;
            bool _signerApproved;
            if(msg.sender == _owner){
                _ownerApproved = true;
                _signerApproved = false;
            }
            if(msg.sender == _signer){
                _ownerApproved = false;
                _signerApproved = true;
            }
            SongContract memory tempSongContract = SongContract(
                _idFile,
                _songHash, 
                _contentHash, 
                _contractMoney, 
                _owner, 
                _ownerCompensationAmount, 
                _ownerApproved, 
                _signer, 
                _signerCompensationAmount, 
                _signerApproved,
                _timeExpired,
                false
                );
            fileStorage.setSongContract(_idContractMongo, tempSongContract);
            fileStorage.setUserContract(_idContractMongo, _owner, _signer);
        }
    function setApproved(string memory _idContractMongo) public{
        fileStorage.setApproved(_idContractMongo, msg.sender);
        usingDataContractOfAData[fileStorage.getSongContract(_idContractMongo).idFile].push(fileStorage.getSongContract(_idContractMongo));
        token.TransferFromTo(fileStorage.getSongContract(_idContractMongo).signer, fileStorage.getSongContract(_idContractMongo).owner, fileStorage.getSongContract(_idContractMongo).contractMoney);
    }
    
    function cancelContract(string memory _idContractMongo) public{
        require(fileStorage.getSongContract(_idContractMongo).isCancel == false);
        require(fileStorage.getSongContract(_idContractMongo).ownerApproved == true && fileStorage.getSongContract(_idContractMongo).signerApproved == true );
        fileStorage.setCancelContract(_idContractMongo, msg.sender);
        if(msg.sender == fileStorage.getSongContract(_idContractMongo).owner){
            token.TransferFromTo(msg.sender, fileStorage.getSongContract(_idContractMongo).signer, fileStorage.getSongContract(_idContractMongo).ownerCompensationAmount);
        }
        if(msg.sender == fileStorage.getSongContract(_idContractMongo).signer){
            token.TransferFromTo(msg.sender, fileStorage.getSongContract(_idContractMongo).owner, fileStorage.getSongContract(_idContractMongo).signerCompensationAmount);
        }
    }
    
    
    function getSongContract(string memory _idContractMongo) public view returns(SongContract[] memory) {
        SongContract[] memory tempSongContract = new SongContract[](1);
        tempSongContract[0] = fileStorage.getSongContract(_idContractMongo);
        return tempSongContract;
    }
    
    function getOwnerContractList(address _add) public view returns(string[] memory) {
        string[] memory tempData = fileStorage.getOwnerContractList(_add);
        return tempData;
    }
    
    function getSignerContractList(address _add) public view returns(string[] memory) {
        string[] memory tempData = fileStorage.getSignerContractList(_add);
        return tempData;
    }
    
    function createSurvey(
        string memory _idMongoose,
        string memory _contentHash,
        uint _endDay,
        uint _feePerASurvey,
        uint _surveyInDemand
    ) public  {
        token.TransferFromTo(msg.sender, address(this), _feePerASurvey.mul(_surveyInDemand));
        idSurvey = idSurvey.add(1);
        Survey memory surveys = Survey(
            idSurvey,
            msg.sender,
            _idMongoose,
            _contentHash,
            now,
            now + _endDay,
            _feePerASurvey,
            _surveyInDemand,
            0
        );
        survey[idSurvey] = surveys; 
        emit Log_createSurveySuccessfully(msg.sender, idSurvey);
    }
    
    function withdrawExcessFromSurvey(uint _idSurvey) public {
        require(survey[_idSurvey].endDate < now,"Survey is still in process!");
        require(msg.sender == survey[_idSurvey].owner,"You aren't owner!");
        uint _excessMoney = (survey[_idSurvey].feePerASurvey.mul(survey[_idSurvey].surveyInDemand)).sub(survey[_idSurvey].feePerASurvey.mul(survey[_idSurvey].participatedPeople));
        token.TransferFromTo(address(this), msg.sender, _excessMoney);
    }
    
    function takeSurvey(uint _idSurvey) public {
        require(survey[_idSurvey].endDate > now,"Survey is expired!");
        require(survey[_idSurvey].surveyInDemand > survey[_idSurvey].participatedPeople,"This survey is enough people!");
        survey[_idSurvey].participatedPeople = survey[_idSurvey].participatedPeople.add(1);
        
        token.TransferFromTo(address(this), msg.sender, survey[_idSurvey].feePerASurvey);

        emit Log_takenSurveySuccessfully(msg.sender, _idSurvey);
    }
    
    // function takeFeedback(string memory _idMongo, uint _idFile) public {
    //     bool hasFile;
    //     for(uint i =0; i < fileStorage.getUserList(msg.sender).downloadList.length; i++){
    //         if(_idFile == fileStorage.getUserList(msg.sender).downloadList[i]){
    //             hasFile = true;
    //             break;
    //         }
    //     }
    //     require(hasFile,'You have not used this data');
    //     Feedback memory _fb = Feedback(
    //         msg.sender,
    //         _idMongo,
    //         _idFile
    //     );
    //     feedback[_idFile].push(_fb);
    //     emit Log_takenFeedbackSuccessfully(_idFile);
    // }
    
    // function getFeedback(uint _idFile) public view returns(string[] memory) {
    //     string[] memory hashMongo = new string[](feedback[_idFile].length);
    //     for(uint i =0;i< feedback[_idFile].length;i++){
    //         hashMongo[i] = feedback[_idFile][i].idMongo;
    //     }
    //     return hashMongo;
    // }
    
    function postHuntFile(string memory _characteristicHash, uint _fee) public {
        idHuntfile =idHuntfile.add(1);
        huntedFile memory _hf = huntedFile(
            idHuntfile,
            0,
            msg.sender,
            _characteristicHash,
            address(0),
            _fee,
            false
        );
        huntedfiles.push(_hf);
        huntedfile[idHuntfile] = _hf;
    }
    
    function getHuntFile(uint _idHuntFile) public view returns(huntedFile memory){
        return huntedfile[_idHuntFile];
    }
    
    function hunt(uint _idHuntFile, uint _idHuntedFile) public {
        require(huntedfile[_idHuntFile].isHunted == false, "File is no longer need ");
        require(fileStorage.getFileList(_idHuntedFile).owner == msg.sender,"You are not owner of this file!");
        huntedfile[_idHuntFile].idhuntedFile = _idHuntedFile;
        huntedfile[_idHuntFile].hunter = msg.sender;
    }
    
    
    function approveHuntedFile(uint _idHuntFile) public {
        require(huntedfile[_idHuntFile].peopleInNeed == msg.sender,"You have no right to approve!");
        // require(huntedfile[_idHuntFile].idhuntedFile != 0);
        require(huntedfile[_idHuntFile].isHunted == false, "File is no longer need ");
        huntedfile[_idHuntFile].isHunted = true;
        token.TransferFromTo(huntedfile[_idHuntFile].peopleInNeed, huntedfile[_idHuntFile].hunter, huntedfile[_idHuntFile].fee);
        emit huntEventSuccessfully(huntedfile[_idHuntFile].peopleInNeed, huntedfile[_idHuntFile].hunter);
    }
    
    
    function setPersonalInformation(
        string memory _dataHash,
        bool _shared
    ) public {
        require(pDMoney != 0,"The commision is not set");
        individualData memory _pIf = individualData(
            msg.sender,
            _dataHash,
            _shared
        );
        if(_pIf.shared == true){
            token.TransferFromTo(address(this),msg.sender,pDMoney);
            PData.push(_pIf);
            
        }
        personalData[msg.sender] = _pIf;
    }
    
    function publishInformation() public {
        require(personalData[msg.sender].owner == msg.sender,"this account is not set up");
        require(personalData[msg.sender].shared == false,"Your personal data is publish!");
        personalData[msg.sender].shared = true;
        PData.push(personalData[msg.sender]);
        token.TransferFromTo(address(this),msg.sender,pDMoney);
        emit Log_sharingIndividualData(msg.sender);
    }
    
    function getPersonalInformation() public returns(individualData[] memory) {
        require(PData.length > 0,"No data is published");
        require(pDMoney != 0,"The commision is not set");
        token.TransferFromTo(msg.sender,address(this),PData.length.mul(pDMoney));
        return PData;
    }
    
    function FindLabler(uint _idFile, uint _wage) public {
        bool hasContract = false;
        bool isDownloaded = false;
        for (uint i = 0; i < usingDataContractOfAData[_idFile].length; i++) {
            if(usingDataContractOfAData[_idFile][i].signer == msg.sender && usingDataContractOfAData[_idFile][i].timeExpired > now){
                hasContract = true;
                break;
            }
        }
        
        for(uint i=0; i < fileStorage.getUserList(msg.sender).downloadList.length; i++){
            if(fileStorage.getUserList(msg.sender).downloadList[i] == _idFile){
                isDownloaded = true;
                break;
            }
        }
        require(msg.sender == fileStorage.getFileList(_idFile).owner || hasContract == true || isDownloaded == true);
        UnlabelFile memory _uf = UnlabelFile(
            _idFile,
            "",
            _wage,
            msg.sender,
            address(0),
            false,
            false
        );
        unlabelfile[_idFile]=_uf;
    }
    
    // function getUnlableFile() public view returns(UnlabelFile[] memory){
    //     return unlabelfiles;
    // }
    
    function Labeling(uint _idUnlabelFile, string memory _hashFile) public {
        require(unlabelfile[_idUnlabelFile].isLabeled == false || unlabelfile[_idUnlabelFile].locked == false, "File is no longer need label");
        unlabelfile[_idUnlabelFile].implementer = msg.sender;
        unlabelfile[_idUnlabelFile].hashLabeledFile = _hashFile;
        unlabelfile[_idUnlabelFile].locked = true;
    }
    
    function approveLabeledFile(uint _idUnlabelFile) public returns(string memory){
        require(unlabelfile[_idUnlabelFile].renter == msg.sender,"You have no right to approve!");
        require(unlabelfile[_idUnlabelFile].locked = true,"Haven't labeled yet!");
        unlabelfile[_idUnlabelFile].isLabeled = true;
        token.TransferFromTo(unlabelfile[_idUnlabelFile].renter, unlabelfile[_idUnlabelFile].implementer, unlabelfile[_idUnlabelFile].wage);
        return unlabelfile[_idUnlabelFile].hashLabeledFile;
    }
    
}