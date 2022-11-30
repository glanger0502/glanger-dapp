import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { useEffect, useState } from "react";
import { BigNumber } from 'ethers';

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;

export default function Reward(props:{ rewards: BigNumber | undefined}) {
    // connected
    const { address } = useAccount();
    console.log(props.rewards);
    let rewards = BigNumber.from("0");
    if(props.rewards != undefined) {
        rewards = props.rewards;
    }

    const { config } = usePrepareContractWrite({
        address: stakingContractAddress,
        abi:[
            {
                "inputs": [],
                "name": "claimRewards",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        functionName: 'claimRewards',
        enabled: true,
        overrides: {
            from: address,
        }
    })

    const { write:clainReward } = useContractWrite(config);

    return (
        <div>
            <h2>Your Tokens</h2>
            <div className="my-2">
                Balance: <label className="text-primary">{(props.rewards)?.toString()} </label> GGC
            </div>
            <div>
            <button className="btn btn-primary" onClick={() => {clainReward?.()}}>Claim Rewards</button>
            </div>
        </div>
    );
}