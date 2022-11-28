
import { UserAllNFTs, StakedNFT } from "../../../types";
import StakeNFTButton from './StakeNFTButton';
import ApprovalAllButton from './ApprovalAllButton';

const nftUrl = process.env.NEXT_PUBLIC_NFT_URL;

export default function NotNFTs(props: {nftStatus:boolean, data:UserAllNFTs|undefined}) {

    const nftStatus = props.nftStatus;
    const allNFTs = props.data;

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
        const a = document.getElementById('img' + id);
        a?.classList.toggle('border-2');
    }
    
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row mx-auto my-0'>
            {
                allNFTs?.result.map((ele:StakedNFT,key:number) => (
                    <div key={key} className="m-1">
                        <button className='' onClick={(e) => {addPic2Stake(ele.tokenID);handleClick(e, ele.tokenID)}}>
                            <img src={nftUrl + ele.tokenID + '.png'} width={140} height={180} className={`rounded-md border-red-400 hover:border-2 focus:border-2 after:border-2`} key={key} id={'img' +ele.tokenID}/>
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <ApprovalAllButton />
                <StakeNFTButton nftStatus={nftStatus} data={allNFTs} />
            </div>
      </div>
    );
}