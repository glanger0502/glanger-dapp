export const glangerStakingAbi = [
{
    "inputs": [
        {
            "internalType": "contract IERC721A",
            "name": "_nftCollection",
            "type": "address"
        },
        {
            "internalType": "contract IERC20",
            "name": "_rewardsToken",
            "type": "address"
        }
    ],
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
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "indexed": true,
            "internalType": "bool",
            "name": "locked",
            "type": "bool"
        }
    ],
    "name": "Stake",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
        },
        {
            "indexed": true,
            "internalType": "bool",
            "name": "locked",
            "type": "bool"
        }
    ],
    "name": "StakeBatch",
    "type": "event"
},
{
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "getRewardsPerHour",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_staker",
            "type": "address"
        }
    ],
    "name": "isStaking",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "nftCollection",
    "outputs": [
        {
            "internalType": "contract IERC721A",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "owner",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "rewardsToken",
    "outputs": [
        {
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_newValue",
            "type": "uint256"
        }
    ],
    "name": "setRewardsPerHour",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256[]",
            "name": "_tokenIds",
            "type": "uint256[]"
        }
    ],
    "name": "stakeBatch",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "name": "stakers",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "timeOfLastUpdate",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "unclaimedRewards",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_user",
            "type": "address"
        }
    ],
    "name": "userStakeInfo",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "_tokensStaked",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "_availableRewards",
            "type": "uint256"
        },
        {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256[]",
            "name": "_tokenIds",
            "type": "uint256[]"
        }
    ],
    "name": "withdrawBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]