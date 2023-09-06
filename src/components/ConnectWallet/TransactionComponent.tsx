import React, { useState } from "react";
import Web3 from "web3";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi";
import { ethers } from "ethers";

export function TransactionComponent() {
  const { isConnected } = useAccount();
  const { data: walletConnectClient } = useWalletClient();
  console.log("isConnected ", isConnected);
  console.log(walletConnectClient);
  const { config } = usePrepareSendTransaction({
    to: "0x6d1120a2577B190e5174a443C9d6572154842Da6",
    value: ethers.parseEther("0.01"),
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const estimateGas = async () => {
    let walletClient = walletConnectClient || window?.ethereum;

    if (!walletClient) {
      // @ts-ignore
      const ethereum = window?.ethereum;
      if (!ethereum) {
        throw new Error("No ethereum provider found");
      } else {
        walletClient = ethereum;
      }
    }

    if (walletClient?.request) {
      try {
        await walletClient?.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
      } catch (error) {}
    }

    const web3 = new Web3(walletClient);
    const account = web3.eth.accounts;

    const accounts = await web3.eth.getAccounts();

    const transaction = {
      to: "0x6d1120a2577B190e5174a443C9d6572154842Da6",
      value: ethers.parseEther("0.01"),
    };

    try {
      const gasEstimate = await web3.eth.estimateGas(transaction);
      return gasEstimate;
    } catch (error) {
      console.error("Error estimating gas:", error);
    }
  };

  const handleSendTransaction = async () => {
    // const gasLimit = await estimateGas();
    // if (gasLimit) {
    //   console.log("Gas Limittt:", gasLimit);
    //   //   sendTransaction?.({ gas: gasLimit }); // Pass the gas limit to the sendTransaction function
    // }
  };

  return (
    <>
      <button
        className='m-3 bg-blue-500 text-white font-bold py-2 px-4 rounded'
        onClick={handleSendTransaction}
      >
        Send 0.01 eth Transaction comp
      </button>
      {isSuccess && (
        <div>
          Successfully sent to: 0x6d1120a2577B190e5174a443C9d6572154842Da6
          value: ethers.parseEther 0.01,
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </>
  );
}
