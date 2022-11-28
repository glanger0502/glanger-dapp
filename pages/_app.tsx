import type { AppProps } from 'next/app'
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider } from '@chakra-ui/react'

import {
  WagmiConfig,
  createClient,
  chain,
  configureChains,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';



const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli, chain.mainnet],
  [publicProvider(), alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || ''
  }), infuraProvider({
    apiKey: process.env.NEXT_PUBLIC_INFURA_KEY || ''
  })],
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const client = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
