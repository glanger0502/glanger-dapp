import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { BigNumber, ethers } from 'ethers';
import { useState } from 'react';

const nftContractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;

export default function MintNFTButton(props:{totalPrice:number, mintNum:number}) {
    const { address } = useAccount();
    const [debouncedAddress] = useDebounce(address, 500);

    const totalPrice = props.totalPrice
    const mintNum = props.mintNum;
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

    return (
        <button className="btn btn-primary mx-2" disabled={!disableMint} onClick={(e) => {e.preventDefault(); mint?.()}}>Mint</button>
    )
}