import useSWR from 'swr'
import axios from 'axios'
import { UserNFTs } from '../types';
import { useAddressState } from '../hooks/ussAddressState';

const nftContractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN;

export function getAllNFTs() {
    const {addressState, address} = useAddressState();
    const getNFTs = (url: string) => axios.get(url).then(res => res.data);
    const api = `https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${nftContractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${etherscan}`
    const { data, error } = useSWR<UserNFTs, Error>(api, getNFTs)
    return {data, error}
}