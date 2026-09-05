import { useCallback, useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ArrowLeft, FileQuestion, Fingerprint } from 'lucide-react';
import { Navbar } from '@/components/CertiFlowComponents';
import { initialCertificates, initialIssuers, type AuthorizedIssuer, type Certificate } from '@/data/mockData';
import { getInjectedProvider, SEPOLIA_CHAIN_ID, shortenAddress } from '@/lib/wallet';
import { AdminPage, CredentialsPage, IssuerPage, LandingPage, VerifyPage } from '@/pages/CertiFlowPages';

function NotFound() {
  return <main className="grid min-h-[calc(100dvh-72px)] place-items-center bg-[#0b0f22] px-5 text-center"><div><div className="mx-auto grid size-16 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200"><FileQuestion size={28} /></div><p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-cyan-200">404 / record not found</p><h1 className="cf-display mt-3 text-4xl font-bold text-white">This route is not on the ledger.</h1><Link to="/" data-testid="link-not-found-home" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-bold text-[#09101f]"><ArrowLeft size={16} /> Back to CertiFlow</Link></div></main>;
}

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletChainId, setWalletChainId] = useState<number | null>(null);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(() => Boolean(getInjectedProvider()));
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [issuers, setIssuers] = useState<AuthorizedIssuer[]>(initialIssuers);
  const walletConnected = Boolean(walletAddress);
  const isSepolia = walletChainId === SEPOLIA_CHAIN_ID;

  const syncWallet = useCallback(async () => {
    const ethereum = getInjectedProvider();
    setIsMetaMaskAvailable(Boolean(ethereum));
    if (!ethereum) {
      setWalletAddress(null);
      setWalletChainId(null);
      return;
    }

    const provider = new BrowserProvider(ethereum);
    const accounts = (await ethereum.request({ method: 'eth_accounts' })) as string[];
    if (!accounts[0]) {
      setWalletAddress(null);
      setWalletChainId(null);
      return;
    }

    const network = await provider.getNetwork();
    setWalletAddress(accounts[0]);
    setWalletChainId(Number(network.chainId));
  }, []);

  useEffect(() => {
    void syncWallet();
    const ethereum = getInjectedProvider();
    if (!ethereum?.on) return;

    const handleAccountsChanged = () => void syncWallet();
    const handleChainChanged = () => void syncWallet();
    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
      ethereum.removeListener?.('chainChanged', handleChainChanged);
    };
  }, [syncWallet]);

  const connectWallet = async () => {
    const ethereum = getInjectedProvider();
    if (!ethereum) {
      const message = 'MetaMask is unavailable. Install or enable the MetaMask extension to connect.';
      setWalletError(message);
      toast.error(message);
      return;
    }

    setIsConnecting(true);
    setWalletError(null);
    try {
      const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[];
      if (!accounts[0]) throw new Error('No wallet account was selected.');
      await syncWallet();
      const provider = new BrowserProvider(ethereum);
      const network = await provider.getNetwork();
      const connectedChainId = Number(network.chainId);
      if (connectedChainId !== SEPOLIA_CHAIN_ID) {
        toast.error('Wrong network. Switch MetaMask to Sepolia Testnet.');
      } else {
        toast.success(`Wallet connected: ${shortenAddress(accounts[0])}`);
      }
    } catch (error) {
      const message = error instanceof Error && error.message.includes('rejected')
        ? 'MetaMask connection request was rejected.'
        : 'MetaMask could not connect. Please try again.';
      setWalletError(message);
      toast.error(message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletChainId(null);
    setWalletError(null);
    toast('Wallet disconnected.', { icon: <Fingerprint size={16} /> });
  };
  const mintCertificate = async (certificate: Certificate) => { setCertificates((current) => [certificate, ...current]); };
  const addIssuer = (issuer: AuthorizedIssuer) => setIssuers((current) => [issuer, ...current]);
  const revokeIssuer = (id: string) => setIssuers((current) => current.map((issuer) => issuer.id === id ? { ...issuer, status: 'Revoked' } : issuer));
  return <div className="dark cf-noise min-h-[100dvh] bg-[#0b0f22]"><BrowserRouter basename={import.meta.env.BASE_URL}><Navbar walletConnected={walletConnected} walletAddress={walletAddress} walletChainId={walletChainId} isMetaMaskAvailable={isMetaMaskAvailable} isConnecting={isConnecting} walletError={walletError} onConnect={connectWallet} onDisconnect={disconnectWallet} /><Routes><Route path="/" element={<LandingPage walletConnected={walletConnected} onConnect={connectWallet} onDisconnect={disconnectWallet} />} /><Route path="/verify" element={<VerifyPage certificates={certificates} />} /><Route path="/issuer" element={<IssuerPage walletConnected={walletConnected} walletAddress={walletAddress} isSepolia={isSepolia} walletChainId={walletChainId} isMetaMaskAvailable={isMetaMaskAvailable} isConnecting={isConnecting} onConnect={connectWallet} onDisconnect={disconnectWallet} certificates={certificates} onMint={mintCertificate} />} /><Route path="/credentials" element={<CredentialsPage walletConnected={walletConnected} walletAddress={walletAddress} walletChainId={walletChainId} isMetaMaskAvailable={isMetaMaskAvailable} isConnecting={isConnecting} onConnect={connectWallet} onDisconnect={disconnectWallet} certificates={certificates} />} /><Route path="/admin" element={<AdminPage issuers={issuers} onAdd={addIssuer} onRevoke={revokeIssuer} />} /><Route path="*" element={<NotFound />} /></Routes><Toaster position="bottom-right" toastOptions={{ style: { background: '#171f43', color: '#e9f1ff', border: '1px solid rgba(130,150,232,.2)', fontSize: '13px' } }} /></BrowserRouter></div>;
}

export default App;