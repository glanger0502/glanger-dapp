
import { useContractWrite, usePrepareContractWrite, useAccount, chain, useNetwork } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAddressState } from './ussAddressState';

const nftContractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;

export function useMint(totalPrice, mintNum) {
    const {address} = useAddressState();
    const [debouncedAddress] = useDebounce(address, 500);
    const [debouncedMintNum] = useDebounce(mintNum, 500);

    const [disableMint, setDisableMint] = useState(true);

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
    const { write:mint } = useContractWrite(config)

    return {disableMint, mint}
}