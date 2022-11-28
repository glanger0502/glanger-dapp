import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="bg-[url('/background.jpeg')] min-h-screen items-center justify-items-center flex-col flex">    
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}
