import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useContractRead } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';

import StakedNFTs from "../components/Staking/StakedNFTs";
import UnStakedNFTs from "../components/Staking/UnStakedNFTs";
import Reward from '../components/Staking/Reward/index';
import NftHeader from '../components/Header/nftHeader/index';
import { useChainState } from "../hooks/useChainState";
import { useConnectState } from "../hooks/useConnectState";
import { useNFT } from "../hooks/useNFT";

const Staking: NextPage = () => {
    const chainStatus = useChainState();
    const connectState = useConnectState();
    console.log('connectState', connectState);
    const {nftStatus, stakedNFTs, notStakedNFTs, rewardToken} = useNFT();

    return (
        <div className="bg-hero min-h-screen flex-wrap py-2 px-[5%]">
            {chainStatus && <div className="absolute top-0 left-0 w-full flex bg-secondary"><div className=" mx-auto my-0 text-secondar">the current network is not Geoli Test </div></div>}
            {connectState &&
            <div className="container items-center justify-items-center mt-4 mx-auto">
                <NftHeader />
                <div className="relative flex pt-32 pb-80 w-full">
                    <div className="flex flex-col mx-auto my-0 text-center prose lg:prose-xl">
                        {nftStatus && <Reward rewards={rewardToken} />}
                        <hr />
                        <h2>Your Staked NFTs</h2>
                        {nftStatus && <StakedNFTs nftStatus={nftStatus} data={stakedNFTs} />}
                        <hr />
                        <h2>Your Unstaked NFTs</h2>
                        {nftStatus && <UnStakedNFTs nftStatus={nftStatus} data={notStakedNFTs} />}
                    </div>
                </div>
            </div>}
            {!connectState &&
                <div>
                    <div className="flex flex-row-reverse container items-center justify-items-center mx-auto">
                        <div className="relative my-2">
                            <ConnectButton />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-items-center mt-[40%] mx-auto">
                        <div className="relative mx-auto my-0 text-center">
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Staking;
