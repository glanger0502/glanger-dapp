import { BigNumber } from "ethers";
import { UserNFT } from '../types';

export function useSortedNFTs(userNFTs:UserNFT[]|undefined, tokenIds:readonly BigNumber[]|undefined) {
    
    let tmpIds :string[] = []
    let notStakedNFTs: UserNFT[] = [];
    let stakedNFTs: UserNFT[] = [];
    let nftStatus = true;

    if(tokenIds?.length == 0) {
        return {nftStatus, userNFTs, stakedNFTs}
    }
    //deal with the tokenIds
    let newTokenIds: string[] = [];
    tokenIds?.forEach((val, key) => {
        newTokenIds.push(val.toString());
    })
    
    userNFTs?.forEach((ele, index) => {
        if (!tmpIds.includes(ele.tokenID)) {
            tmpIds.push(ele.tokenID);
            if(newTokenIds.includes(ele.tokenID)) {
                stakedNFTs.push(userNFTs[index])
            } else {
                notStakedNFTs.push(userNFTs[index])
            }
        }
    })
    return {nftStatus, notStakedNFTs, stakedNFTs};  
}