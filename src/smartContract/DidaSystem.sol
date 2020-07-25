pragma solidity >=0.4.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "./safemath.sol";
import "./Token.sol";
import "./FileStorage.sol";
import "./FileStruct.sol";
import "./Ownable.sol";


contract DidaSystem is FileStruct, Ownable{
    using SafeMath for uint256;
    
    event Log_createSurveySuccessfully(address owner, uint idSurvey);
    event Log_takenSurveySuccessfully(address people, uint idSurvey);
    event Log_takenFeedbackSuccessfully(uint idFile);
    event huntEventSuccessfully(address indexed _peopleInNeed, address indexed _hunter);
    event Log_sharingIndividualData(address indexed owner);
    
    uint idSurvey = 0;
    uint idHuntfile = 0;
    uint pDMoney = 0;
    uint[] huntedfiles;
    uint[] unlabelFileId;
    mapping(uint => huntedFile) huntedfile;
    mapping(uint => Survey) survey;
    mapping(uint => Feedback[]) feedback;
    mapping(address => individualData) personalData;
    address[] addressPersonalData;
    address[] addressPersonalDataPublisher;
    mapping(uint => SongContract[]) usingDataContractOfAData;
    mapping(uint => UnlabelFile) unlabelfile;
    
    Token token;
    FileStorage fileStorage;
    
    function setDataSharingCommision(uint _pDMoney) public onlyOwner {
        pDMoney = _pDMoney;
    }
    function setTokenAddress(address _token, address _fileStorage) public onlyOwner{
        token = Token(_token);
        fileStorage = FileStorage(_fileStorage);
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
    
    function takeFeedback(string memory _idMongo, uint _idFile) public {
        bool hasFile;
        for(uint i =0; i < fileStorage.getUserList(msg.sender).downloadList.length; i++){
            if(_idFile == fileStorage.getUserList(msg.sender).downloadList[i]){
                hasFile = true;
                break;
            }
        }
        require(hasFile,'You have not used this data');
        Feedback memory _fb = Feedback(
            msg.sender,
            _idMongo,
            _idFile
        );
        feedback[_idFile].push(_fb);
        emit Log_takenFeedbackSuccessfully(_idFile);
    }
    
    function getFeedback(uint _idFile) public view returns(Feedback[] memory) {
        return feedback[_idFile];
    }
    
    
    
    function postHuntFile(string memory _characteristicHash, uint _fee) public {
        idHuntfile =idHuntfile.add(1);
        huntedFile memory _hf = huntedFile(
            idHuntfile,
            0,
            msg.sender,
            _characteristicHash,
            address(0),
            _fee,
            false,
            false
        );
        huntedfiles.push(_hf.idhuntFile);
        huntedfile[idHuntfile] = _hf;
    }
    
    function getHuntFile(uint _idHuntFile) public view returns(huntedFile memory){
        return huntedfile[_idHuntFile];
    }
    
    
    function getAllHuntFile() public view returns(huntedFile[] memory){
        huntedFile[] memory result = new huntedFile[](huntedfiles.length);
        for(uint i = 0; i < huntedfiles.length ; i++){
            huntedFile memory temphunt = huntedfile[huntedfiles[i]];
            result[i] = temphunt;
        }
        return result;
    }
    
    function hunt(uint _idHuntFile, uint _idHuntedFile) public {
        require(huntedfile[_idHuntFile].isHunted == false, "File is no longer need ");
        require(huntedfile[_idHuntFile].isCanceled == false,"This demand is canceled");
        require(fileStorage.getFileList(_idHuntedFile).owner == msg.sender,"You are not owner of this file!");
        huntedfile[_idHuntFile].idhuntedFile = _idHuntedFile;
        huntedfile[_idHuntFile].hunter = msg.sender;
    }
    
    
    function approveHuntedFile(uint _idHuntFile) public {
        require(huntedfile[_idHuntFile].peopleInNeed == msg.sender,"You have no right to approve!");
        // require(huntedfile[_idHuntFile].idhuntedFile != 0);
        require(huntedfile[_idHuntFile].isHunted == false, "File is no longer need ");
        require(huntedfile[_idHuntFile].isCanceled == false,"This demand is canceled");
        require(huntedfile[_idHuntFile].hunter != address(0), "File haven't hunted");
        huntedfile[_idHuntFile].isHunted = true;
        token.TransferFromTo(huntedfile[_idHuntFile].peopleInNeed, huntedfile[_idHuntFile].hunter, huntedfile[_idHuntFile].fee);
        emit huntEventSuccessfully(huntedfile[_idHuntFile].peopleInNeed, huntedfile[_idHuntFile].hunter);
    }
    
    function cancelHuntedFile(uint _idHuntFile) public {
        require(huntedfile[_idHuntFile].peopleInNeed == msg.sender,"You aren't owner of this assignment!");
        require(huntedfile[_idHuntFile].isCanceled == false,"This demand is canceled");
        huntedfile[_idHuntFile].isCanceled = true;
    }
    
    
    
    
    function setPersonalInformation(
        string memory _dataHash,
        bool _shared
    ) public {
        require(pDMoney != 0,"The commision is not set");
        bool seted = false;
        for(uint i = 0; i < addressPersonalData.length ; i++){
            if(addressPersonalData[i] == msg.sender){
                seted = true;
                break;
            }
            continue;
        }
        if(seted == false){
            individualData memory _pIf = individualData(
            msg.sender,
            _dataHash,
            _shared
            );
            personalData[msg.sender] = _pIf;
            addressPersonalData.push(msg.sender);
        }else{
            personalData[msg.sender].dataHash = _dataHash;
            personalData[msg.sender].shared = _shared;
        }
        if(_shared == true){
            token.TransferFromTo(address(this),msg.sender,pDMoney);
            addressPersonalDataPublisher.push(msg.sender);
            
        }        
    }
    function getpersonaldatatest() public view returns(individualData[] memory){
        individualData[] memory result = new individualData[](addressPersonalData.length);
        for(uint i = 0; i < addressPersonalData.length ; i++){
            individualData memory tempdata = personalData[addressPersonalData[i]];
            result[i] = tempdata;
        }
        return result;
    }
    
    function getpublishpersonaldatatest() public view returns(individualData[] memory){
        individualData[] memory result = new individualData[](addressPersonalDataPublisher.length);
        for(uint i = 0; i < addressPersonalDataPublisher.length ; i++){
            individualData memory tempdata = personalData[addressPersonalDataPublisher[i]];
            result[i] = tempdata;
        }
        return result;
    }
    
    
    function publishInformation() public {
        require(personalData[msg.sender].owner == msg.sender,"this account is not set up");
        require(personalData[msg.sender].shared == false,"Your personal data is publish!");
        personalData[msg.sender].shared = true;
        addressPersonalDataPublisher.push(msg.sender);
        token.TransferFromTo(address(this),msg.sender,pDMoney);
        emit Log_sharingIndividualData(msg.sender);
    }
    
    
    
    function getPersonalInformation() public returns(individualData[] memory) {
        require(addressPersonalDataPublisher.length > 0,"No data is published");
        require(pDMoney != 0,"The commision is not set");
        token.TransferFromTo(msg.sender,address(this),addressPersonalDataPublisher.length.mul(pDMoney));
        individualData[] memory result = new individualData[](addressPersonalDataPublisher.length);
        for(uint i = 0; i < addressPersonalDataPublisher.length ; i++){
            individualData memory tempdata = personalData[addressPersonalDataPublisher[i]];
            result[i] = tempdata;
        }
        return result;
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
        require(fileStorage.getFileList(_idFile).IsLabeling == false);
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
        unlabelFileId.push(_uf.idFile);
    }
    
    function getUnlableFile(uint _idFile) public view returns(UnlabelFile memory){
        return unlabelfile[_idFile];
    }
    
    function getAllUnlableFile() public view returns(UnlabelFile[] memory){
        UnlabelFile[] memory result = new UnlabelFile[](unlabelFileId.length);
        for(uint i = 0; i < unlabelFileId.length ; i++){
            UnlabelFile memory tempfile = unlabelfile[unlabelFileId[i]];
            result[i] = tempfile;
        }
        return result;
    }
    
    function getUnlabelFilePerAddress(address _addr) public view returns(UnlabelFile[] memory){
        uint[] memory tempIDList = fileStorage.getUserList(msg.sender).uploadList;
        uint count = 0;
        for(uint i = 0; i < tempIDList.length ; i++){
            if(fileStorage.getFileList(tempIDList[i]).IsLabeling){
                count++;
            }
        }
        UnlabelFile[] memory result = new UnlabelFile[](count);
        for(uint i = 0; i < tempIDList.length ; i++){
            if(fileStorage.getFileList(tempIDList[i]).IsLabeling){
                UnlabelFile memory tempUnlabel = unlabelfile[tempIDList[i]];
                result[i] = tempUnlabel;
            }
        }
        return result;
    }
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
        fileStorage.getFileList(_idUnlabelFile).IsLabeling = true;
        token.TransferFromTo(unlabelfile[_idUnlabelFile].renter, unlabelfile[_idUnlabelFile].implementer, unlabelfile[_idUnlabelFile].wage);
        return unlabelfile[_idUnlabelFile].hashLabeledFile;
    }
}