import { BigNumber } from 'ethers';

export type UserStakedNFTs = {
    _tokensStaked: BigNumber;
    _availableRewards: BigNumber;
    tokenIds: BigNumber[];
} 

export type UserNFTs = {
    message: string,
    result: 
        UserNFT[]
    ,
    status: string
}

export type UserNFT = {
    tokenID: string,
    tokenName: string,
    tokenSymbol: string
}
