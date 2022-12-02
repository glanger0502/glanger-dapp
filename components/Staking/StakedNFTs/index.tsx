import { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'ethers';
import { UserNFTs, UserNFT } from "../../../types";
import UnStakeNFTButton from './UnstakeNFTButton';

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;
const nftUrl = process.env.NEXT_PUBLIC_NFT_URL;

export default function StakedNFTs(props: {nftStatus:boolean, data:UserNFT[]|undefined}) {
    const stakedNFTs = props.data;
    const nftStatus = props.nftStatus;
    
    //select nfts
    const initNFT: UserNFT[] = [{tokenID:'',tokenName:'', tokenSymbol:''}];
    const [selectedNFTs, setSelectedNFTs] = useState(initNFT);

    const selectedPic: string[] = [];
    function addPic2Stake(tokenId:string) {
        // console.log(tokenId);
        const index = selectedPic.indexOf(tokenId);
        if(index > -1) {
            selectedPic.splice(index);
        } else {
            selectedPic.push(tokenId);
        }
        // console.log(selectedPic);
    }

    const handleClick = (event: any, id: string) => {
        // event.currentTarget.classList.toggle('border-2');
        const a = document.getElementById('img' + id);
        a?.classList.toggle('border-2');
        a?.classList.toggle('border-solid');
        if(stakedNFTs != undefined) {
            stakedNFTs.forEach((ele, key) => {
                if (id == ele.tokenID) {
                    setSelectedNFTs([stakedNFTs[key]]);
                } else {
                    setSelectedNFTs([stakedNFTs[0]]);
                }
            });
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row mx-auto my-0'>
            {
                stakedNFTs?.map((ele:UserNFT,key:number) => (
                    <div key={key} className="m-1">
                        <button className='' onClick={(e) => {addPic2Stake(ele.tokenID);handleClick(e, ele.tokenID)}}>
                            <img src={nftUrl + ele.tokenID + '.png'} width={140} height={180} className={`rounded-md border-red-400 hover:border-2 focus:border-2 after:border-2`} key={key} id={'img' +ele.tokenID}/>
                        </button>
                    </div>
                ))}
            </div>
            <UnStakeNFTButton nftStatus={nftStatus} data={selectedNFTs} />
      </div>
    );
}
