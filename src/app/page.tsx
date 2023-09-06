"use client";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
} from "wagmi/chains";

import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import { SendTransaction } from "@/components/ConnectWallet/SendTransaction";
import { TransactionComponent } from "@/components/ConnectWallet/TransactionComponent";
import { ConvertToWrapped } from "@/components/ConnectWallet/ConvertToWrapped";
import { ConvertBack } from "@/components/ConnectWallet/ConvertBack";

const chains = [polygon];
const projectId = "ada12c1d0f2d502f905e4d35ef5d752f";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Home() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ConnectWallet />
        {/* <SendTransaction /> */}
        <ConvertToWrapped />
        <ConvertBack />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={polygon}
      />
    </>
  );
}
