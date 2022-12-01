
import { BigNumber, ethers } from 'ethers';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { useAccount, useContractEvent, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { UserNFT, UserNFTs } from '../../../../types';
import { useToast } from '@chakra-ui/react'

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;

export default function UnStakeNFTButton(props:{nftStatus:boolean, data:UserNFT[]|undefined}) {
    const { address } = useAccount();
    const [debouncedAddress] = useDebounce(address, 500);
    const toast = useToast();
    const nfts = props.data;

    const [tokenStatus, setTokenStatus] = useState(false);
    const [currentToken, setCurrentToken] = useState(BigNumber.from("0"));
    useEffect(() => {
        if(nfts != undefined && nfts.length) {
            if(nfts[0].tokenID) {
                console.log(currentToken);
                setCurrentToken(BigNumber.from(nfts[0].tokenID)); 
                setTokenStatus(true);
            }
        }
    }, [nfts])

    const { config } = usePrepareContractWrite({
        address: stakingContractAddress,
        abi: [
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
        ],
        functionName: 'withdraw',
        args:[currentToken],
        enabled: tokenStatus,
        overrides: {
            // from: debouncedAddress,
        },
        onError(prepareError2) {
            console.log('Error', prepareError2.message);
        }
    })

    const { write:stakeWrite, isSuccess } = useContractWrite(config);

    useEffect(() => {
        if(isSuccess) {
            toast({
                title: 'Withdraw is on the way.',
                description: "withdraw glanger nft.",
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
                "name": "Withdraw",
                "type": "event"
            }
        ],
        eventName: 'Withdraw',
        listener(node, label, owner) {
            console.log(node, label, owner)
            toast({
                title: 'Withdraw Success!',
                description: "withdraw glanger nft success",
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
        },
    })

    return (
        <div>
            <button className="btn btn-primary mx-1" onClick={(e) => {e.preventDefault(); stakeWrite?.()}}>Withdraw NFT</button>
        </div>
    )
}