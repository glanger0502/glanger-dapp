import { NextPage } from 'next'
import Footer from '../components/Footer';
import MintNFT from '../components/Mint';
import NftHeader from '../components/Header/nftHeader';
 
const Mint: NextPage = () => {
 
  return (
    <div className="bg-hero min-h-screen flex-wrap py-2 px-[5%]">
      <NftHeader />
      <MintNFT />
      <Footer />
    </div>
  )
}

export default Mint;