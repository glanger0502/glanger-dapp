
import { BigNumber, ethers } from 'ethers';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { UserAllNFTs } from '../../../../types';
import { useToast } from '@chakra-ui/react'

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;

export default function StakeNFTButton(props:{nftStatus:boolean, data:UserAllNFTs|undefined}) {
    const { address } = useAccount();
    const [debouncedAddress] = useDebounce(address, 500);
    const toast = useToast();
    const nfts = props.data?.result;

    const [tokenStatus, setTokenStatus] = useState(false);
    const [currentToken, setCurrentToken] = useState(BigNumber.from("0"));
    useEffect(() => {
        if(nfts != undefined && nfts.length) {
            setCurrentToken(BigNumber.from(nfts[0].tokenID)); 
            setTokenStatus(true);
        }
    }, [tokenStatus])

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
                title: 'Staking Success.',
                description: "staking glanger nft.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    })

    return (
        <button className="btn btn-primary mx-1" onClick={(e) => {e.preventDefault(); stakeWrite?.()}}>Stake NFT</button>
    )
}