import { BigNumber } from 'ethers';


// get userStakedNFT
export type UserStakedNFTA = {
    _tokensStaked: BigNumber;
    _availableRewards: BigNumber;
    tokenIds: BigNumber[];
} 

export type UserStakedNFTArr = [BigNumber, BigNumber, BigNumber[]]


export type UserStakedNFT = UserStakedNFTA & UserStakedNFTArr

export type UserAllNFTs = {
    message: string,
    result: 
        StakedNFT[]
    ,
    status: string
}

export type StakedNFT = {
    tokenID: string,
    tokenName: string,
    tokenSymbol: string
}
