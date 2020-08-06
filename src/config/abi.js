exports.userBehaviorABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			}
		],
		"name": "Log_downloadFile",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "investAmount",
				"type": "uint256"
			}
		],
		"name": "Log_investISO",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum FileStruct.Kind",
				"name": "kind",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			}
		],
		"name": "Log_uploadFile",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offerPercent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "offerAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maintain",
				"type": "uint256"
			}
		],
		"name": "Log_usingISO",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Log_withdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			}
		],
		"name": "cancelContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_songHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contentHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_contractMoney",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ownerCompensationAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_signer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_signerCompensationAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_timeExpired",
				"type": "uint256"
			}
		],
		"name": "createContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "dowloadFile",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalaceOfContract",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "getFileById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "IsLabeling",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getISOAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "IsLabeling",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "getISOId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "IsLabeling",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getISOList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "IsLabeling",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "getOwnerContractList",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "getSignerContractList",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			}
		],
		"name": "getSongContract",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "songHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "contractMoney",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ownerCompensationAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "ownerApproved",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "signer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "signerCompensationAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "signerApproved",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCancel",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.SongContract[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserDownload",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "IsLabeling",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserUpload",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "IsLabeling",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_investAmount",
				"type": "uint256"
			}
		],
		"name": "investISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			}
		],
		"name": "setApproved",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_fileStorage",
				"type": "address"
			}
		],
		"name": "setTokenFileStorageAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_fileHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "enum FileStruct.Kind",
				"name": "_kind",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_idMongoose",
				"type": "string"
			}
		],
		"name": "uploadFile",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offerPercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offerAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maintain",
				"type": "uint256"
			}
		],
		"name": "usingISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

exports.fileStorageABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_temp",
				"type": "uint256[]"
			}
		],
		"name": "getFileFunc",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "IsLabeling",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFileLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "getFileList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "IsLabeling",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "getISOList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "IsLabeling",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getISOListAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "IsLabeling",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getISOListInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "offerAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountRemaining",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ownerPercent",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfDownload",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "week",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idFile",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "idMongoose",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fileHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "totalDownloader",
								"type": "uint256"
							},
							{
								"internalType": "int256",
								"name": "weekDownloader",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "blockTime",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "valid",
								"type": "bool"
							},
							{
								"internalType": "enum FileStruct.Kind",
								"name": "kind",
								"type": "uint8"
							},
							{
								"internalType": "bool",
								"name": "IsISO",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "IsLabeling",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.File",
						"name": "ISOFile",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "percentage",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct FileStruct.Invest[]",
						"name": "investListISO",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.ISO[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getIsUsingID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getOwnerContractList",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_TimeRanking",
				"type": "uint256"
			},
			{
				"internalType": "enum FileStruct.Kind",
				"name": "_kind",
				"type": "uint8"
			}
		],
		"name": "getRankingHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "lastWeekDownloader",
						"type": "int256"
					}
				],
				"internalType": "struct FileStruct.FileRanking[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getSignerContractList",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			}
		],
		"name": "getSongContract",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "songHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "contractMoney",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ownerCompensationAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "ownerApproved",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "signer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "signerCompensationAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "signerApproved",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCancel",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.SongContract",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeRanking",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_ID",
				"type": "address"
			}
		],
		"name": "getUserList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "ownerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "uploadList",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "downloadList",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "investList",
						"type": "uint256[]"
					}
				],
				"internalType": "struct FileStruct.User",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getVarIdFile",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_userApproved",
				"type": "address"
			}
		],
		"name": "setApproved",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_userCancel",
				"type": "address"
			}
		],
		"name": "setCancelContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Numb",
				"type": "uint256"
			}
		],
		"name": "setFileLength",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_IDFile",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "IsLabeling",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File",
				"name": "_File",
				"type": "tuple"
			}
		],
		"name": "setFileList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_IsISO",
				"type": "bool"
			}
		],
		"name": "setFileList_IsISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Numb",
				"type": "uint256"
			}
		],
		"name": "setFileList_totalDownloader",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "_Numb",
				"type": "int256"
			}
		],
		"name": "setFileList_weekDownloader",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Numb",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Value",
				"type": "uint256"
			}
		],
		"name": "setISOList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idMongoose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDownloader",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "weekDownloader",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "blockTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					},
					{
						"internalType": "enum FileStruct.Kind",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "IsISO",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "IsLabeling",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.File",
				"name": "_file",
				"type": "tuple"
			}
		],
		"name": "setISOListFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "investor",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "percentage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct FileStruct.Invest",
				"name": "_tempInvest",
				"type": "tuple"
			}
		],
		"name": "setISOList_investListISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_IsUsingID",
				"type": "uint256"
			}
		],
		"name": "setIsUsingID",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "setListIDISO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_ownerUserBehaviorContract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_ownerRankingContract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_ownerDidaSystemContract",
				"type": "address"
			}
		],
		"name": "setOnlyOwnerContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Now",
				"type": "uint256"
			},
			{
				"internalType": "enum FileStruct.Kind",
				"name": "_kind",
				"type": "uint8"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "lastWeekDownloader",
						"type": "int256"
					}
				],
				"internalType": "struct FileStruct.FileRanking",
				"name": "_fileRanking",
				"type": "tuple"
			}
		],
		"name": "setRankingHistory",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "songHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contentHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "contractMoney",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ownerCompensationAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "ownerApproved",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "signer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "signerCompensationAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "signerApproved",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "timeExpired",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCancel",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.SongContract",
				"name": "_songContract",
				"type": "tuple"
			}
		],
		"name": "setSongContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Now",
				"type": "uint256"
			}
		],
		"name": "setTimeRanking",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idContractMongo",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_contractOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_contractSigner",
				"type": "address"
			}
		],
		"name": "setUserContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "setUserList_downloadList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "setUserList_investList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "setUserList_uploadList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Numb",
				"type": "uint256"
			}
		],
		"name": "setVarIdFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

exports.tokenABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferFromTo",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "UserBehaviorContract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "DidaSystem",
				"type": "address"
			}
		],
		"name": "setOnlyUserBehaviorContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

exports.rankingABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_now",
				"type": "uint256"
			}
		],
		"name": "Log_RankPerWeek",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "RankPerWeek",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_fileStorage",
				"type": "address"
			}
		],
		"name": "setFileStorage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_TimeRanking",
				"type": "uint256"
			},
			{
				"internalType": "enum FileStruct.Kind",
				"name": "_kind",
				"type": "uint8"
			}
		],
		"name": "getRanking",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "lastWeekDownloader",
						"type": "int256"
					}
				],
				"internalType": "struct FileStruct.FileRanking[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeRanking",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

exports.didaSystemABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idSurvey",
				"type": "uint256"
			}
		],
		"name": "Log_createSurveySuccessfully",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "Log_sharingIndividualData",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idFile",
				"type": "uint256"
			}
		],
		"name": "Log_takenFeedbackSuccessfully",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "people",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idSurvey",
				"type": "uint256"
			}
		],
		"name": "Log_takenSurveySuccessfully",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_peopleInNeed",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_hunter",
				"type": "address"
			}
		],
		"name": "huntEventSuccessfully",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_partAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalWage",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "_subHash",
				"type": "string[]"
			}
		],
		"name": "FindLabler",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idUnlabelFile",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_hashFile",
				"type": "string"
			}
		],
		"name": "Labeling",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idHuntFile",
				"type": "uint256"
			}
		],
		"name": "approveHuntedFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idUnlabelFile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_idPart",
				"type": "uint256"
			}
		],
		"name": "approveLabeledFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idHuntFile",
				"type": "uint256"
			}
		],
		"name": "cancelHuntedFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_idMongoose",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contentHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_endDay",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_feePerASurvey",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_surveyInDemand",
				"type": "uint256"
			}
		],
		"name": "createSurvey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllHuntFile",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idhuntFile",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "idhuntedFile",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "peopleInNeed",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "characteristicHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "hunter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isHunted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCanceled",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.huntedFile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllUnlableFile",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "partAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalWage",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "renter",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idPart",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "subHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "labeler",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "subHashLabeled",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "partWage",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "isAccept",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.Label[]",
						"name": "arrPartLabel",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.UnlabelFile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "getFeedback",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "ownerFeedback",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "hashContent",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "star",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					}
				],
				"internalType": "struct FileStruct.Feedback[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idUnlabelFile",
				"type": "uint256"
			}
		],
		"name": "getHashLabel",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idHuntFile",
				"type": "uint256"
			}
		],
		"name": "getHuntFile",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idhuntFile",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "idhuntedFile",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "peopleInNeed",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "characteristicHash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "hunter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "fee",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isHunted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCanceled",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.huntedFile",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getPersonalDataByAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "dataHash",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "shared",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.individualData",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getPersonalInformation",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "dataHash",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "shared",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.individualData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUnlabelFilePerAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "partAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalWage",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "renter",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idPart",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "subHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "labeler",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "subHashLabeled",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "partWage",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "isAccept",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.Label[]",
						"name": "arrPartLabel",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.UnlabelFile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "getUnlableFile",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idFile",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "partAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalWage",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "renter",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idPart",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "subHash",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "labeler",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "subHashLabeled",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "partWage",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "isAccept",
								"type": "bool"
							}
						],
						"internalType": "struct FileStruct.Label[]",
						"name": "arrPartLabel",
						"type": "tuple[]"
					}
				],
				"internalType": "struct FileStruct.UnlabelFile",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getpersonaldatatest",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "dataHash",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "shared",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.individualData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getpublishpersonaldatatest",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "dataHash",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "shared",
						"type": "bool"
					}
				],
				"internalType": "struct FileStruct.individualData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idHuntFile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_idHuntedFile",
				"type": "uint256"
			}
		],
		"name": "hunt",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_characteristicHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "postHuntFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "publishInformation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idUnlabelFile",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_idPart",
				"type": "uint256"
			}
		],
		"name": "removeLabeledFile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pDMoney",
				"type": "uint256"
			}
		],
		"name": "setDataSharingCommision",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_dataHash",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_shared",
				"type": "bool"
			}
		],
		"name": "setPersonalInformation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_fileStorage",
				"type": "address"
			}
		],
		"name": "setTokenAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_hashContent",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_star",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_idFile",
				"type": "uint256"
			}
		],
		"name": "takeFeedback",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idUnlabelFile",
				"type": "uint256"
			}
		],
		"name": "takeLabeler",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idSurvey",
				"type": "uint256"
			}
		],
		"name": "takeSurvey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idSurvey",
				"type": "uint256"
			}
		],
		"name": "withdrawExcessFromSurvey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]