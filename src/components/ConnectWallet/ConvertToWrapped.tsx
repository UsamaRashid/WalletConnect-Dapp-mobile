"use client";

import * as React from "react";

import { parseEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";

export function ConvertToWrapped() {
  const { address } = useAccount();
  React.useEffect(() => {}, [address]);

  const {
    write: DepositWrite,
    isSuccess,
    isError,
    error,
    data,
  } = useContractWrite({
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",

    abi: [
      {
        constant: false,
        inputs: [],
        name: "deposit",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
    ],

    functionName: "deposit",
    value: parseEther("0.1"),
    onSettled(data, error) {
      if (error) {
        console.log("Onsettled Error", error);
      } else {
        console.log("data: when No error", data);
      }
    },
  });
  return (
    <>
      <div>
        {address && (
          <button
            className='mt-3 bg-blue-500  text-white font-bold py-2 px-4 rounded'
            onClick={() => DepositWrite?.()}
          >
            Convert 0.1 matic to WrappedMatic
          </button>
        )}
        {isSuccess && (
          <div>
            Successfully converted
            <div className='mt-3 bg-blue-500 '>
              <a href={`https://polygonscan.com/tx/${data?.hash}`}>
                Mumbai Scan Tx
              </a>
            </div>
          </div>
        )}
        {isError && <div>Error: {error?.message}</div>}
      </div>
    </>
  );
}
