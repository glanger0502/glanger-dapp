import React from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit';

import MintNFTButton from './MintButton';

import { useConnectState } from "../../hooks/useConnectState";
import { useMintNum } from "../../hooks/useMintNum";

export default function MintNFT() {
    const connectState = useConnectState();
    const {mintNum, setMintNum} = useMintNum();
    const price = 0.001;
    const totalPrice = price * mintNum;

    return (
        <div className='relative container mx-auto my-0 flex flex-col items-center justify-items-center w-full px-4 pt-32 pb-80 prose lg:prose-xl'>
            <h1 className=''>Glanger NFT</h1>
            <h3 className=''>Mint a Glanger NFT!</h3>
            <p className='text-lg max-w-7xl'>It's a NFT for test only. Staking will open soon to earn $GGC.
            <br />the utils I'm still working on it. be positive and enjoy your life.</p>
            <div className="m-5 w-full align-middle justify-items-center flex flex-col">
                <div className="relative mx-auto my-2">
                    <label className="text-secondary">Mint Stage: </label>
                    <label className="text-neutral">Public Mint </label>
                </div>
                <div className="relative mx-auto my-3">
                    <label className="text-secondary"> Price: </label>
                    <label className="text-neutral">0.001E</label>
                </div>
                <div className="relative mx-auto my-3">
                    <button className="btn btn-primary" onClick={() => {setMintNum(mintNum-1)}}>-</button>
                    <label className="text-primary mx-3">{mintNum}</label>
                    <button className="btn btn-primary" onClick={() => {setMintNum(mintNum+1)}}>+</button>
                </div>
                <div className="relative mx-auto my-3">
                    { <MintNFTButton totalPrice={totalPrice} mintNum={mintNum} connectState={connectState} />}
                    {/* { !connectState && <ConnectButton />} */}
                </div>
                <div className="relative my-3">
                        <h3 className="text-info">Mint Button is disabled?</h3>
                        <p className="mt-0"><b>Probable Reason 1: </b> <br />the mint is on georili test network.you can visit <a href="https://goerlifaucet.com/" target={"_blank"}>https://goerlifaucet.com/</a> to get some coin</p>
                        <p className="mt-0"><b>Probable Reason 2: </b> <br />you have already minted in this stage.</p>
                </div>
            </div>
        </div>
    )
   
}