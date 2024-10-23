"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl =
  "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json";

export default function Providers({ children }) {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
}
