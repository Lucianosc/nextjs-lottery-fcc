import React, { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json";
import contractAddresses from "../constants/contractAddresses.json";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis(); // response the Chain Id in hexadecimal
  const dispatch = useNotification();
  const chainId = parseInt(chainIdHex);
  const lotteryAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [entranceFee, setEntranceFee] = useState();
  const [numPlayers, setNumPlayers] = useState();
  const [recentWinner, setRecentWinner] = useState();

  // const checkEvent = async () => {
  //   const provider = new ethers.providers.EtherscanProvider([
  //     "localhost",
  //     [process.env.ETHERSCAN_API_KEY],
  //   ]);
  //   const contract = new ethers.Contract(lotteryAddress, abi, provider);

  //   contract.on("Transfer", (from, to, value, event) => {
  //     let transferEvent = {
  //       from: from,
  //       to: to,
  //       value: value,
  //       eventData: event,
  //     };

  //     console.log(JSON.stringify(transferEvent, null, 4));
  //   });
  // };
  // checkEvent();
  // console.log(process.env.ETHERSCAN_API_KEY);

  const { runContractFunction: enterLottery } = useWeb3Contract({
    contractAddress: lotteryAddress,
    abi: abi,
    functionName: "enterLottery",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    contractAddress: lotteryAddress,
    abi: abi,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    contractAddress: lotteryAddress,
    abi: abi,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    contractAddress: lotteryAddress,
    abi: abi,
    functionName: "getRecentWinner",
    params: {},
  });

  const updateUi = async () => {
    const entranceFeeCall = (await getEntranceFee()).toString();
    const numberOfPlayersCall = (await getNumberOfPlayers()).toString();
    const recentWinnerCall = (await getRecentWinner()).toString();
    setEntranceFee(entranceFeeCall);
    setNumPlayers(numberOfPlayersCall);
    setRecentWinner(recentWinnerCall);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUi();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUi();
  };

  const handleNewNotification = (tx) => {
    dispatch({
      type: "info",
      message: "Transaction complete!",
      title: "Tx Notification",
      position: "topR",
      icon: "bell",
    });
  };

  return (
    <div>
      LotteryEntrance
      {lotteryAddress ? (
        <div>
          <button
            onClick={async () => {
              await enterLottery({
                // contract functions comes with onSuccess, onError, onComplete, etc
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
          >
            Enter Lottery
          </button>
          <div>
            Entrance Fee: {entranceFee && ethers.utils.formatEther(entranceFee)}{" "}
            ETH
          </div>
          <div>Players: {numPlayers && numPlayers}</div>
          <div>Last Winner: {recentWinner && recentWinner}</div>
        </div>
      ) : (
        <div>No Lottery Address detected</div>
      )}
    </div>
  );
}
