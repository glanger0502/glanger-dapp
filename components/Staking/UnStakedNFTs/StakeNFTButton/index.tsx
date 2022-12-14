
import { BigNumber, ethers } from 'ethers';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { useAccount, useContractEvent, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { UserNFT, UserNFTs } from '../../../../types';
import { useToast } from '@chakra-ui/react'

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;

export default function StakeNFTButton(props:{nftStatus:boolean, data:UserNFT[]|undefined}) {
    const { address } = useAccount();
    const [debouncedAddress] = useDebounce(address, 500);
    const toast = useToast();
    const nfts = props.data;

    const [tokenStatus, setTokenStatus] = useState(false);
    const [currentToken, setCurrentToken] = useState(BigNumber.from("0"));
    useEffect(() => {
        if(nfts != undefined && nfts.length) {
            if(nfts[0].tokenID) {
                setCurrentToken(BigNumber.from(nfts[0].tokenID)); 
                setTokenStatus(true);
            }
        }
    }, [nfts])

    const { config:stakeConfig } = usePrepareContractWrite({
        address: stakingContractAddress,
        abi: [
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
        ],
        functionName: 'stake',
        args:[currentToken],
        enabled: tokenStatus,
        overrides: {
            from: debouncedAddress,
            value: ethers.utils.parseEther("0"),
        },
        onError(prepareError) {
            console.log('Error', prepareError.message);
        }
    })

    const { write:stakeWrite, isSuccess} = useContractWrite(stakeConfig);

    useEffect(() => {
        if(isSuccess) {
            toast({
                title: 'Staking is on the way.',
                description: "staking glanger nft.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [isSuccess])

    useContractEvent({
        address: stakingContractAddress,
        abi: [
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
            }
        ],
        eventName: 'Stake',
        listener(node, label, owner) {
            console.log(node, label, owner)
            toast({
                title: 'Stake Success!',
                description: "stake glanger nft success",
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
        },
    })

    return (
        <button className="btn btn-primary mx-1" onClick={(e) => {e.preventDefault(); stakeWrite?.()}}>Stake NFT</button>
    )
}