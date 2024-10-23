"use client";
import { useTonWallet, useTonAddress  } from "@tonconnect/ui-react";
import Link from "next/link";

export default function Body() {
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();

  if (!wallet) {
    return null;
  }
  return (
    <main>
      <div>
        <p>{`Address wallet: ${userFriendlyAddress}`}</p>
      </div>
      <div>
        <Link href="/transactions">Do transaction</Link>
      </div>
    </main>
  );
}
