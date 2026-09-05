import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ArrowLeft, FileQuestion, Fingerprint } from 'lucide-react';
import { Navbar } from '@/components/CertiFlowComponents';
import { initialCertificates, initialIssuers, type AuthorizedIssuer, type Certificate } from '@/data/mockData';
import { AdminPage, CredentialsPage, IssuerPage, LandingPage, VerifyPage } from '@/pages/CertiFlowPages';

function NotFound() {
  return <main className="grid min-h-[calc(100dvh-72px)] place-items-center bg-[#0b0f22] px-5 text-center"><div><div className="mx-auto grid size-16 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200"><FileQuestion size={28} /></div><p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-cyan-200">404 / record not found</p><h1 className="cf-display mt-3 text-4xl font-bold text-white">This route is not on the ledger.</h1><Link to="/" data-testid="link-not-found-home" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-bold text-[#09101f]"><ArrowLeft size={16} /> Back to CertiFlow</Link></div></main>;
}

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [issuers, setIssuers] = useState<AuthorizedIssuer[]>(initialIssuers);
  const connectWallet = () => { setWalletConnected(true); toast.success('Demo wallet connected.'); };
  const disconnectWallet = () => { setWalletConnected(false); toast('Wallet disconnected.', { icon: <Fingerprint size={16} /> }); };
  const mintCertificate = async (certificate: Certificate) => { setCertificates((current) => [certificate, ...current]); };
  const addIssuer = (issuer: AuthorizedIssuer) => setIssuers((current) => [issuer, ...current]);
  const revokeIssuer = (id: string) => setIssuers((current) => current.map((issuer) => issuer.id === id ? { ...issuer, status: 'Revoked' } : issuer));
  return <div className="dark cf-noise min-h-[100dvh] bg-[#0b0f22]"><BrowserRouter basename={import.meta.env.BASE_URL}><Navbar walletConnected={walletConnected} onConnect={connectWallet} onDisconnect={disconnectWallet} /><Routes><Route path="/" element={<LandingPage walletConnected={walletConnected} onConnect={connectWallet} onDisconnect={disconnectWallet} />} /><Route path="/verify" element={<VerifyPage certificates={certificates} />} /><Route path="/issuer" element={<IssuerPage walletConnected={walletConnected} onConnect={connectWallet} onDisconnect={disconnectWallet} certificates={certificates} onMint={mintCertificate} />} /><Route path="/credentials" element={<CredentialsPage walletConnected={walletConnected} onConnect={connectWallet} onDisconnect={disconnectWallet} certificates={certificates} />} /><Route path="/admin" element={<AdminPage issuers={issuers} onAdd={addIssuer} onRevoke={revokeIssuer} />} /><Route path="*" element={<NotFound />} /></Routes><Toaster position="bottom-right" toastOptions={{ style: { background: '#171f43', color: '#e9f1ff', border: '1px solid rgba(130,150,232,.2)', fontSize: '13px' } }} /></BrowserRouter></div>;
}

export default App;