import React from "react";
import { useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json";
import contractAddress from "../constants/contractAddresses.json";

import { useMoralis } from "react-moralis";

export default function LotteryEntrance() {
  const { chainId } = useMoralis();
  console.log(chainId);
  //   const {runContractFunction: enterLottery} = useWeb3Contract({
  //       contractAddress: contractAddress,
  //       abi: abi,
  //   functionName: "enterLottery",
  //   params: {},
  //   msgValue: //
  //   })

  return <div>LotteryEntrance</div>;
}
