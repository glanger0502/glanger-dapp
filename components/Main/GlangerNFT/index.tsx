import React from "react";
import { useRouter } from 'next/router';

export default function GlangerNFT() {
    const router = useRouter();
    
    return (
        <div className='my-0 mx-auto items-center justify-items-center prose lg:prose-xl'>
            <div className='container relative flex-col items-center justify-items-center w-full mt-24 px-6'>
                <h1 className='text-center'>Glanger NFT</h1>
                <div className='flex flex-col items-center justify-items-center gap-1 md:flex-row'>
                    <div className='m-w-full md:w-1/2 flex flex-col border-2 border-solid rounde-2xl min-h-200 h-full border-red-50 text-base-content rounded-2xl items-center justify-items-center px-6' role="button" onClick={() => router.push('/mint')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-droplet-fill mt-8 text-primary" viewBox="0 0 16 16">
                            <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
                        </svg>
                        <h2 className='leading-tight text-4xl mt-0 mb-2 text-secondary hover:text-secondary-focus'>Mint a NFT</h2>
                        <p className='mt-0'>
                        Use the NFT Drop Contract to claim an NFT from the collection.
                        </p>
                    </div>
                    <div className='m-w-full md:w-1/2 flex flex-col border-2 border-solid rounde-2xl min-h-200 h-full border-red-50 rounded-2xl items-center justify-items-center px-6' role="button" onClick={() => router.push('/staking')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-airplane-engines-fill mt-8 text-primary" viewBox="0 0 16 16">
                            <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0Z"/>
                        </svg>
                        <h2 className='leading-tight text-4xl mt-0 mb-2 text-secondary hover:text-secondary-focus'>Staking a NFT</h2>
                        <p className='mt-0'>
                        Use the NFT Drop Contract to claim an NFT from the collection.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}