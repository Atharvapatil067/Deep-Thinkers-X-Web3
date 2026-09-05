import type { Eip1193Provider } from 'ethers';

export const SEPOLIA_CHAIN_ID = 11155111;

export type InjectedEthereumProvider = Eip1193Provider & {
  isMetaMask?: boolean;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    listener: (...args: unknown[]) => void,
  ) => void;
};

declare global {
  interface Window {
    ethereum?: InjectedEthereumProvider;
  }
}

export function getInjectedProvider(): InjectedEthereumProvider | undefined {
  const ethereum = typeof window !== 'undefined' ? window.ethereum : undefined;
  return ethereum?.isMetaMask ? ethereum : undefined;
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}