"use client";
import { useTonWallet, useTonAddress  } from "@tonconnect/ui-react";

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
    </main>
  );
}
