'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initKit = async () => {
      try {
        // @ts-ignore
        const { StellarWalletsKit } = await import("@creit-tech/stellar-wallets-kit");
        // @ts-ignore
        const { defaultModules } = await import("@creit-tech/stellar-wallets-kit/modules/utils");
        StellarWalletsKit.init({ modules: defaultModules() });
      } catch (err) {
        console.warn("Stellar Wallets Kit not yet available or failed to load", err);
      }
    };
    initKit();
  }, []);

  const connect = async () => {
    try {
      // @ts-ignore
      const { StellarWalletsKit } = await import("@creit-tech/stellar-wallets-kit");
      const { address } = await StellarWalletsKit.authModal();
      setAddress(address);
      router.push('/dashboard');
    } catch (err: any) {
      console.error("Connection failed", {
        message: err?.message || "Unknown error",
        code: err?.code,
        err
      });
    }
  };

  const disconnect = () => {
    setAddress(null);
    router.push('/');
  };

  return (
    <WalletContext.Provider value={{ address, isConnected: !!address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};
