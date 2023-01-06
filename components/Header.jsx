import React from "react";
import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="border-b-2 p-5 flex flex-row justify-between max-w-screen-xl mx-auto">
      <h1 className="py-4 px-4 font-blog text-3xl">Decentralized Lottery</h1>
      <div className="my-auto px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
