import { BigNumber } from "ethers";
import { UserNFT } from '../types';

export function useSortedNFTs(userNFTs:UserNFT[]|undefined, tokenIds:readonly BigNumber[]|undefined) {
    
    let tmpIds :string[] = []
    let notStakedNFTs: UserNFT[] = [];
    let stakedNFTs: UserNFT[] = [];
    let nftStatus = true;
    userNFTs?.forEach((ele, index) => {
        if (!tmpIds.includes(ele.tokenID)) {
            tmpIds.push(ele.tokenID);
            if(tokenIds?.length == 0) {
                notStakedNFTs.push(userNFTs[index])
            } else {
                tokenIds?.forEach((ele2) => {
                    if(ele.tokenID == ele2.toString()) {
                        stakedNFTs.push(userNFTs[index])
                    } else {
                        notStakedNFTs.push(userNFTs[index])
                    }
                });
            }
        }
    })
    return {nftStatus, notStakedNFTs, stakedNFTs};  
}