import { NextPage } from 'next';
import React from 'react';
import Navbar from './Navbar';

export default function Header() {
    return (
        <div className='mb-6 w-full my-0 ma-auto relative'>
                <div className='relative  md:bg-none pb-0 pt-5 duration-700 ease-in w-full  px-[2%] top-0 z-50 flex items-center'>
                    <Navbar />
                </div>
        </div>
    )
}