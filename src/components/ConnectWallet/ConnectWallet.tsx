"use client ";
import React, { useEffect } from "react";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import { parseEther } from "viem";
import { switchNetwork } from "@wagmi/core";

const ConnectWallet = () => {
  const { chain, chains } = useNetwork();
  const switchChain = async () => {
    const network = await switchNetwork({
      chainId: 80001,
    });
  };

  useEffect(() => {
    switchChain();
  }, [chain]);

  const { address } = useAccount();
  useEffect(() => {}, [address]);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x2586A1FbbC8d4707860BC7703C5B60D196443776",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "_name", type: "string" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "mint",
    args: [5, "Elon"],
    value: parseEther("0.02"),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  return (
    <div>
      {chain ? <>{chain?.name}</> : <>No chain Connected</>}
      <br />
      {address ? <>{address}</> : <> Not Connected</>}
      <br />

      <Web3Button />
      <br />
    </div>
  );
};

export default ConnectWallet;
