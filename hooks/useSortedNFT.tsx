import { BigNumber } from "ethers";
import { UserNFT, UserNFTs } from '../types';

export function useSortedNFTs(userNFTs:UserNFTs|undefined, tokenIds:readonly BigNumber[]|undefined) {
    
    let tmpIds :string[] = []
    let notStakedNFTs: UserNFT[] = [];
    let stakedNFTs: UserNFT[] = [];
    let nftStatus = true;

    if(tokenIds?.length == 0 || userNFTs == undefined) {
        return {nftStatus, userNFTs, stakedNFTs}
    }
    const userNFTsArr = userNFTs.result;
    if(!userNFTsArr[0].tokenID) {
        return {nftStatus, userNFTs, stakedNFTs}
    }
    //deal with the tokenIds
    let newTokenIds: string[] = [];
    tokenIds?.forEach((val, key) => {
        newTokenIds.push(val.toString());
    })
    
    userNFTsArr?.forEach((ele, index) => {
        if (!tmpIds.includes(ele.tokenID)) {
            tmpIds.push(ele.tokenID);
            if(newTokenIds.includes(ele.tokenID)) {
                stakedNFTs.push(userNFTsArr[index])
            } else {
                notStakedNFTs.push(userNFTsArr[index])
            }
        }
    })
    return {nftStatus, notStakedNFTs, stakedNFTs};  
}