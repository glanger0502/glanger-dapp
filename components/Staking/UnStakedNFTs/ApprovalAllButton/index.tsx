
import { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite,useContractEvent } from 'wagmi';
import { glangerNFTAbi } from '../../../../abi/glangerNFT';
import { useToast,Progress } from '@chakra-ui/react'

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;
const nftContractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;

export default function ApprovalAllButton() {
    const toast = useToast()
    
    const { config } = usePrepareContractWrite({
        address: nftContractAddress,
        abi: glangerNFTAbi,
        functionName: 'setApprovalForAll',
        args:[stakingContractAddress ?? `0x`, true],
        enabled: true,
        overrides: {
            // from: stakingContractAddress
        },
        onError(error) {
            console.log('Error', error.message);
        }
    })

    useContractEvent({
        address: nftContractAddress,
        abi: glangerNFTAbi,
        eventName: "ApprovalForAll",
        listener(...args) {
            console.log(args);
            
            toast({
                title: 'stake success.',
                description: "glanger nft stake success.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        },
    })
    
    const { write, isError, error:error4, isSuccess, isLoading } = useContractWrite(config);

    useEffect(() => {
        if(isSuccess) {
            toast({
                title: 'approval success.',
                description: "glanger nft stake approval success.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    }, [isSuccess, isLoading])

    return (
        <>
            <Progress size='xs' isIndeterminate className='hidden'/>
            <button className="btn btn-primary mx-1" onClick={(e) => {e.preventDefault(); write?.()}}>Approval All</button> 
        </>
    )
}