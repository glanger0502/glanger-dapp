
import { UserNFT } from '../../../types';
import StakeNFTButton from './StakeNFTButton';
import ApprovalAllButton from './ApprovalAllButton';
import { useState } from 'react';

const nftUrl = process.env.NEXT_PUBLIC_NFT_URL;

export default function NotNFTs(props: {nftStatus:boolean, data:UserNFT[]|undefined}) {

    const nftStatus = props.nftStatus;
    const allNFTs = props.data;

    //select nfts
    const initNFT: UserNFT[] = [{tokenID:'',tokenName:'', tokenSymbol:''}];
    const [selectedNFTs, setSelectedNFTs] = useState(initNFT);

    const selectedPic: string[] = [];
    function addPic2Stake(tokenId:string) {
        console.log(tokenId);
        const index = selectedPic.indexOf(tokenId);
        if(index > -1) {
            selectedPic.splice(index);
        } else {
            selectedPic.push(tokenId);
        }
        console.log(selectedPic);
    }

    const handleClick = (event: any, id: string) => {
        const imgObj = document.getElementById('img' + id);
        imgObj?.classList.toggle('border-2');
        imgObj?.classList.toggle('border-solid');
        if(allNFTs != undefined) {
            allNFTs.forEach((ele, key) => {
                if (id == ele.tokenID) {
                    setSelectedNFTs([allNFTs[key]]);
                }
            });
        } 
    }
    
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row mx-auto my-0'>
            {
                allNFTs?.map((ele:UserNFT,key:number) => (
                    <div key={key} className="m-1">
                        <button className='' onClick={(e) => {addPic2Stake(ele.tokenID);handleClick(e, ele.tokenID)}}>
                            <img src={nftUrl + ele.tokenID + '.png'} width={140} height={180} className={`rounded-md border-red-400 hover:border-2 focus:border-2 after:border-2`} key={key} id={'img' +ele.tokenID}/>
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <ApprovalAllButton />
                <StakeNFTButton nftStatus={nftStatus} data={selectedNFTs} />
            </div>
      </div>
    );
}
