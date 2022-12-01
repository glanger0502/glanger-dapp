
import { useContractWrite, usePrepareContractWrite, useContractEvent } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { BigNumber, ethers } from 'ethers';
import { useState,useEffect } from 'react';
import { useAddressState } from './ussAddressState';
import { useToast } from '@chakra-ui/react'

const nftContractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;

export function useMint(totalPrice, mintNum) {
    const {address} = useAddressState();
    const [debouncedAddress] = useDebounce(address, 500);
    const [debouncedMintNum] = useDebounce(mintNum, 500);

    const [disableMint, setDisableMint] = useState(true);
    const toast = useToast()

    const { config } = usePrepareContractWrite({
        address: nftContractAddress,
        abi: [
            {
                name: 'mint',
                type: 'function',
                stateMutability: 'payable',
                inputs: [
                    {"internalType":"address","name":"to","type":"address"},
                    {"internalType":"uint256","name":"quantity","type":"uint256"}
                ],
                outputs: []
            },
        ],
        functionName: 'mint',
        args:[debouncedAddress ?? `0x`, BigNumber.from(debouncedMintNum)],
        enabled: Boolean(debouncedMintNum),
        overrides: {
            from: debouncedAddress,
            value: ethers.utils.parseEther(totalPrice.toString()),
        },
        onError(error) {
            console.log('Error', error.message);
            setDisableMint(false);
        }
    })
    const { write:mint, isSuccess } = useContractWrite(config)

    useContractEvent({
        address: nftContractAddress,
        abi: [
            {
                name: 'NFTMintEvent',
                type: 'event',
                stateMutability: 'payable',
                inputs: [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "stageType",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "token",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                outputs: []
            },
        ],
        eventName: 'NFTMintEvent',
        listener(node, label, owner) {
            console.log(node, label, owner)
            toast({
                title: 'Mint Success!',
                description: "mint glanger nft success",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        },
    })

    useEffect(() => {
        if(isSuccess) {
            toast({
                title: 'mint is on the way!',
                description: "mint glanger nft",
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
        }
    }, [isSuccess])

    return {disableMint, mint}
}