// pragma solidity ^0.4.25;
pragma solidity >=0.4.0 <0.7.0;

contract FileStruct{
    
    enum Kind {Unidentified, Image, Music}

    struct SongContract{
        uint idFile; // smartcontract song id
        string songHash;
        string contentHash;
        uint contractMoney;
        address owner;
        uint ownerCompensationAmount; // So tien owner phai boi thuong
        bool ownerApproved;
        address signer;
        uint signerCompensationAmount; // So tien signer phai boi thuong
        bool signerApproved;
        uint timeExpired;
        bool isCancel;
    }

    struct File{
        uint idFile;
        string idMongoose;
        string fileHash;
        address owner;
        uint price;
        uint totalDownloader;
        int weekDownloader;
        uint blockTime;
        bool valid;
        Kind kind;
        bool IsISO;
    }
    
    struct FileRanking{
        uint idFile;
        int lastWeekDownloader;
    }
    
    struct ISO{
        uint offerPercent;
        uint offerAmount;
        uint amountRemaining;
        uint timeExpired;
        uint ownerPercent;
        uint numberOfDownload;
        uint week;
        File ISOFile;
        Invest[] investListISO;
    }
    
    struct Invest{
        address investor;
        uint percentage;
        uint amount;
    }
    
    struct User{
        address ownerAddress;
        uint[] uploadList;
        uint[] downloadList;
        uint[] investList;
    }
    
    struct individualData{
        address owner;
        string dataHash;
        // uint idIdentity;
        // string name;
        // uint DoB;
        // uint male; // 1: male, 2: female, 3: other
        // string hobbies;
        // string addressLive;
        // bool isMerried;
        // uint phone;
        bool shared;
    }
    
    struct UnlabelFile{
        uint idFile;
        string hashLabeledFile;
        uint wage;
        address renter;
        address implementer;
        bool locked;
        bool isLabeled;
    }
    
    struct Feedback{
        address ownerFeedback;
        string idMongo;//id in Mongo database to view content
        uint idFile;
    }
    
    struct Survey{
        uint idSurvey;
        address owner;
        string idMongoose;
        string contentHash;
        
        uint startDate;
        uint endDate;
        uint feePerASurvey;
        uint surveyInDemand; // the number of survey need to take
        uint participatedPeople;

    }
    
    struct huntedFile{
        uint idhuntFile;
        uint idhuntedFile;
        address peopleInNeed;
        string characteristicHash;
        address hunter;
        uint fee;
        bool isHunted;
    }
}