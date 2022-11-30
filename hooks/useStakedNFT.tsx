import { useEffect, useState } from "react";
import { useContractRead } from 'wagmi';

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;
const nftContractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN;

export function useStakedNFTs(address: any) {
    const { data, isError, isLoading, isSuccess } = useContractRead({
        address: stakingContractAddress,
        abi:[
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
            }
        ],
        functionName: 'userStakeInfo',
        args:[address ?? `0x`],
        enabled: true,
        onError(error) {
            console.log('Error', error.message);
        },
        onSuccess(data) {
            console.log('Success', data);
        }
    })
    const tokenIds = data?.tokenIds
    const rewards = data?._availableRewards

    return { tokenIds, rewards }
}
