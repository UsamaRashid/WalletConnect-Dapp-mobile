import { ethers } from "ethers";
import * as React from "react";
import { useDebounce } from "use-debounce";
import { parseGwei } from "viem";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";

export function SendTransaction() {
  const [to, setTo] = React.useState("");
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = React.useState("");
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config } = usePrepareSendTransaction({
    to: "0x6d1120a2577B190e5174a443C9d6572154842Da6",
    value: ethers.parseEther("0.001"),
  });
  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <button
        className='mt-3 bg-blue-500  text-white font-bold py-2 px-4 rounded'
        onClick={() => sendTransaction?.()}
      >
        Send 0.01 eth
      </button>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </>
  );
}
