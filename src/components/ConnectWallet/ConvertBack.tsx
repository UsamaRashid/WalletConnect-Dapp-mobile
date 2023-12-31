"use client";

import * as React from "react";

import { parseEther, parseGwei } from "viem";
import { useAccount, useContractWrite } from "wagmi";

export function ConvertBack() {
  const { address } = useAccount();
  React.useEffect(() => {}, [address]);
  const {
    write: DepositWrite,
    isSuccess,
    isError,
    error,
    data,
  } = useContractWrite({
    address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    abi: [
      {
        constant: false,
        inputs: [{ name: "wad", type: "uint256" }],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],

    functionName: "withdraw",
    // value: parseEther("0.1"),
    args: [parseEther("0.01")],

    onSettled(data, error) {
      // setError(minterror);
      if (error) {
        console.log("Onsettled Error", error);
      } else {
        // setError(data.status);
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
            withdraw 0.01 matic from WrappedMatic
          </button>
        )}
        {isSuccess && (
          <div>
            Successfully converted
            <div className='mt-3 bg-blue-500 '>
              <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>
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
