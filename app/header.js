"use client";

import { useTonWallet, TonConnectButton } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

const manifestUrl =
  "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json";

export default function Header() {
  const wallet = useTonWallet();
  const [balance, setBalance] = useState(null);
  const address = wallet?.account?.address;
  const url = `https://toncenter.com/api/v2/getAddressInformation?address=${address}`;
  useEffect(() => {
    if (wallet) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setBalance(data?.result?.balance))
        .catch((error) => console.error("Error:", error));
    }
  }, [wallet, url]);

  return (
    <header>
      {wallet && <p>Balance: {balance} TON</p>}
      <TonConnectButton />
    </header>
  );
}
