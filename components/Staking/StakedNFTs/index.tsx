import { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'ethers';
import { UserAllNFTs, StakedNFT } from "../../../types";

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;
const nftUrl = process.env.NEXT_PUBLIC_NFT_URL;

export default function NFTs(props: {nftStatus:boolean, data:UserAllNFTs|undefined}) {
    const nfts = props.data?.result;
    const stakedNFTs = props.data;

    const [tokenStatus, setTokenStatus] = useState(false);
    const [currentToken, setCurrentToken] = useState(BigNumber.from("0"));
    useEffect(() => {
        if(nfts != undefined && nfts.length) {
            setCurrentToken(BigNumber.from(nfts[0].tokenID)); 
            setTokenStatus(true);
        }
    },[tokenStatus])

    // console.log(nfts);
    const { config, isLoading, isSuccess } = usePrepareContractWrite({
        address: stakingContractAddress,
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        functionName: 'withdraw',
        args:[currentToken],
        enabled: tokenStatus,
        overrides: {
            // from: debouncedAddress,
        },
        onError(prepareError2) {
            console.log('Error', prepareError2.message);
        }
    })
    
    const { write } = useContractWrite(config);

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
        // event.currentTarget.classList.toggle('border-2');
        const a = document.getElementById('img' + id);
        a?.classList.toggle('border-2');
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row mx-auto my-0'>
            {
                stakedNFTs?.result.map((ele:StakedNFT,key:number) => (
                    <div key={key} className="m-1">
                        <button className='' onClick={(e) => {addPic2Stake(ele.tokenID);handleClick(e, ele.tokenID)}}>
                            <img src={nftUrl + ele.tokenID + '.png'} width={140} height={180} className={`rounded-md border-red-400 hover:border-2 focus:border-2 after:border-2`} key={key} id={'img' +ele.tokenID}/>
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <button className="btn btn-primary mx-1" onClick={(e) => {e.preventDefault(); write?.();}}>UnStake All</button> 
            </div>
      </div>
    );
}
