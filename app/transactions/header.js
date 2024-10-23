"use client";

import { useTonWallet, TonConnectButton } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const wallet = useTonWallet();
  const [balance, setBalance] = useState(null);
  const address = wallet?.account?.address;

  useEffect(() => {
    if (wallet && address) {

      fetch(`/api/getBalance?address=${address}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error:", data.error);
          } else {
            setBalance(data.balance)
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [wallet, address]);

  return (
    <header>
      {wallet ? (
        <p>Balance: {balance === null ? "Loading..." : `${balance} TON`}</p>
      ) : (
        <p>Connect your wallet</p>
      )}
      <Link href='/'>Back</Link>
    </header>
  );
}
