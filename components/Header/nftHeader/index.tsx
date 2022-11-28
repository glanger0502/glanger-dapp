import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function NftHeader() {
    return (
      <div className="m-5">
         <div className='relative flex items-center justify-items-center mt-0 flex-row flex-wrap justify-between'>
            <span className='w-[40%]'>
              <a className='max-w-[130px]' href='/#'>
                <img src='./logo.png' className='absolute inset-0 w-16 h-16' />
              </a>
            </span>
              <ConnectButton />
        </div>
      </div>
    )
}