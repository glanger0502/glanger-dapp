import { NextPage } from 'next'
import Footer from '../components/Footer';
import MintNFT from '../components/Mint';
import NftHeader from '../components/Header/nftHeader';
import { useChainState } from '../hooks/useChainState';
 
const Mint: NextPage = () => {
  const chainStatus = useChainState();
  
  return (
    <div className="bg-hero min-h-screen flex-wrap py-2 px-[5%]">
      {chainStatus && <div className="absolute top-0 left-0 w-full flex bg-secondary"><div className=" mx-auto my-0 text-secondar">the current network is not Geoli Test </div></div>}
      <NftHeader />
      <MintNFT />
      <Footer />
    </div>
  )
}

export default Mint;