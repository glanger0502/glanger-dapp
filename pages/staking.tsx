import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';
import useSWR from 'swr'
import axios from 'axios'

import { UserAllNFTs, StakedNFT } from '../types';
import NFTs from "../components/Staking/StakedNFTs";
import NotNFTs from "../components/Staking/UnStakedNFTs";
import Reward from '../components/Staking/Reward/index';

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS;
const nftContractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN;


function getAllNFTs(address:string) {
    let userAllNFTs1:UserAllNFTs|undefined;
    let userAllNFTsError:Error|undefined;
    const getNFTs = (url: string) => axios.get(url).then(res => res.data);
    const api = `https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${nftContractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${etherscan}`
    return { data:userAllNFTs1, error:userAllNFTsError } = useSWR<UserAllNFTs, Error>(api, getNFTs)
}

function getSortedNFTs(userAllNFTs2:StakedNFT[], tokenIds:Readonly<BigNumber[]>|undefined) {
   
    // const tokenIds:BigNumber[] = userStakedNFT?.tokenIds;

    let tmpIds :string[] = []
    let returnNFTs1:UserAllNFTs = {
        'message': 'ok',
        'result': [],
        'status': 'ok'
    };
    let returnNFTs2:UserAllNFTs = {
        'message': 'ok',
        'result': [],
        'status': 'ok'
    };
    userAllNFTs2?.forEach((ele, index) => {
        if (!tmpIds.includes(ele.tokenID)) {
            tmpIds.push(ele.tokenID);
            if(tokenIds?.length == 0) {
                returnNFTs1.result.push(userAllNFTs2[index])
            } else {
                tokenIds?.forEach((ele2) => {
                    if(ele.tokenID == ele2.toString()) {
                        returnNFTs2.result.push(userAllNFTs2[index])
                    } else {
                        returnNFTs1.result.push(userAllNFTs2[index])
                    }
                });
            }
        }
    })
    return [returnNFTs1, returnNFTs2];  
}

const Staking: NextPage = () => {
    // connected
    const { address, isConnected } = useAccount();
    
    const [connectState, setConnectState] = useState(false);
    useEffect(() => {
        setConnectState(true);
    }, [isConnected])

    const stakedNFT:StakedNFT[] = []
    const [notStakedNFTs, setNotStakedNFTs] = useState({message: 'ok',result: stakedNFT, status: 'ok'});
    const [stakedNFTs, setStakedNFTs] = useState({message: 'ok',result: stakedNFT, status: 'ok'});

    const { data:userStakedNFT, isError, isLoading, isSuccess: isNftSuccess } = useContractRead({
        address: stakingContractAddress,
        abi:[
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }
                ],
                "name": "userStakeInfo",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokensStaked",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_availableRewards",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "tokenIds",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        functionName: 'userStakeInfo',
        args:[address ?? `0x`],
        enabled: true,
        onError(error) {
            console.log('Error', error.message);
        },
        onSuccess(data) {
            console.log('Success', data);
        }
    })

    const {data, error} = getAllNFTs(address ?? `0x`);
    const [allNFTStatus, setAllNFTStatus] = useState(false);

    const [nftStatus, setNftStatus] = useState(false);
    useEffect(() => {
        if(isNftSuccess) {
            setNftStatus(true);
        }
        if(isNftSuccess && data) {
            const [staked1, staked2] = getSortedNFTs(data.result, userStakedNFT?.tokenIds);
            setStakedNFTs(staked2);
            setNotStakedNFTs(staked1);
            setAllNFTStatus(true);
        }
        // setNftStatus(false)
    }, [isNftSuccess, data])

    return (
        <div className="bg-hero min-h-screen flex-wrap py-2 px-[5%]">
            {connectState &&
            <div className="container items-center justify-items-center mt-4 mx-auto">
                <div className='relative flex items-center justify-items-center mt-0 flex-row flex-wrap justify-between'>
                    <span className='w-[40%]'>
                    <a className='max-w-[130px]' href="/#">
                        <img src='./logo.png' className='absolute inset-0 w-16 h-16'  />
                    </a>
                    </span>
                    <div className='border'>
                        <ConnectButton label="Sign in" accountStatus={"avatar"} />
                    </div>
                </div>
                <div className="relative flex pt-32 pb-80 w-full">
                    <div className="flex flex-col mx-auto my-0 text-center prose lg:prose-xl">
                        {nftStatus && <Reward rewards={userStakedNFT?._availableRewards} />}
                        <hr />
                        <h2>Your Staked NFTs</h2>
                        {nftStatus && <NFTs nftStatus={allNFTStatus} data={stakedNFTs} />}
                        <hr />
                        <h2>Your Unstaked NFTs</h2>
                        {nftStatus && <NotNFTs nftStatus={allNFTStatus} data={notStakedNFTs} />}
                    </div>
                </div>
            </div>}
            {!connectState &&
                <div>
                    <div className="flex flex-row-reverse container items-center justify-items-center mx-auto">
                        <div className="relative my-2">
                            <ConnectButton />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-items-center mt-[40%] mx-auto">
                        <div className="relative mx-auto my-0 text-center">
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Staking;