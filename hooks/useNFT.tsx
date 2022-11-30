import { getAllNFTs } from "../helpers/getAllNFTs";
import { useAddressState } from "../hooks/ussAddressState";
import { useSortedNFTs } from "./useSortedNFT";
import { useStakedNFTs } from "./useStakedNFT";
import { UserNFT } from '../types';

export function useNFT() {

    const {addressState, address} = useAddressState();
    const {data:userNFTs} = getAllNFTs(address);
    const {tokenIds, rewards:rewardToken} = useStakedNFTs(address);

    if(!userNFTs) {
        let nftStatus = false;
        let stakedNFTs: UserNFT[] = [];
        let notStakedNFTs: UserNFT[] = [];
        return {nftStatus, stakedNFTs, notStakedNFTs, undefined}
    }
    const allnfts = userNFTs.result;

    const {nftStatus, stakedNFTs, notStakedNFTs} = useSortedNFTs(allnfts, tokenIds);

    return {nftStatus, stakedNFTs, notStakedNFTs, rewardToken}
}