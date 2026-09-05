import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  LoaderCircle,
  Menu,
  Network,
  QrCode,
  ShieldCheck,
  Wallet,
  X,
} from 'lucide-react';
import type { AuthorizedIssuer, Certificate } from '@/data/mockData';
import { demoWallet } from '@/data/mockData';

export function WalletButton({ connected, onConnect, onDisconnect }: { connected: boolean; onConnect: () => void; onDisconnect: () => void }) {
  if (connected) {
    return (
      <button type="button" data-testid="button-wallet-disconnect" onClick={onDisconnect} className="cf-focus cf-button inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-xs font-bold text-cyan-100">
        <span className="grid size-6 place-items-center rounded-lg bg-cyan-300/15 text-cyan-200"><Wallet size={14} /></span>
        <span className="hidden sm:inline">{demoWallet}</span><ChevronDown size={13} className="text-cyan-200/70" />
      </button>
    );
  }
  return (
    <button type="button" data-testid="button-wallet-connect" onClick={onConnect} className="cf-focus cf-button inline-flex items-center gap-2 rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2.5 text-sm font-bold text-cyan-100 hover:bg-cyan-300/16">
      <Wallet size={15} /> Connect wallet
    </button>
  );
}

export function Navbar({ walletConnected, onConnect, onDisconnect }: { walletConnected: boolean; onConnect: () => void; onDisconnect: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { to: '/verify', label: 'Verify' },
    { to: '/issuer', label: 'For issuers' },
    { to: '/credentials', label: 'My credentials' },
    { to: '/admin', label: 'Admin' },
  ];
  return (
    <header className="relative z-40 border-b border-white/[.07] bg-[#0b0f22]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" data-testid="link-brand" className="cf-focus flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl border border-cyan-200/25 bg-gradient-to-br from-cyan-300/25 to-indigo-400/20 shadow-[0_0_24px_rgba(68,231,235,.12)]"><Fingerprint size={19} className="text-cyan-200" /></span>
          <span className="cf-display text-lg font-bold tracking-[-.04em] text-slate-100">Certi<span className="text-cyan-200">Flow</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => <NavLink key={link.to} to={link.to} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`} className={({ isActive }) => `cf-focus text-sm transition-colors ${isActive ? 'text-cyan-200' : 'text-slate-400 hover:text-slate-100'}`}>{link.label}</NavLink>)}
        </nav>
        <div className="hidden md:block"><WalletButton connected={walletConnected} onConnect={onConnect} onDisconnect={onDisconnect} /></div>
        <button type="button" data-testid="button-mobile-menu" onClick={() => setOpen(!open)} className="cf-focus rounded-lg p-2 text-slate-300 md:hidden">{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {open && <div className="border-t border-white/[.07] px-5 pb-5 pt-3 md:hidden">
        <nav className="flex flex-col gap-1">
          {links.map((link) => <NavLink onClick={() => setOpen(false)} key={link.to} to={link.to} data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`} className="rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/[.05]">{link.label}</NavLink>)}
        </nav>
        <div className="mt-3"><WalletButton connected={walletConnected} onConnect={onConnect} onDisconnect={onDisconnect} /></div>
      </div>}
    </header>
  );
}

export function StatusBadge({ status }: { status: Certificate['status'] | AuthorizedIssuer['status'] }) {
  const isGood = status === 'Verified' || status === 'Active';
  const isPending = status === 'Pending';
  return <span data-testid={`status-${status.toLowerCase()}`} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.13em] ${isGood ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200' : isPending ? 'border-amber-300/20 bg-amber-300/10 text-amber-200' : 'border-rose-300/20 bg-rose-300/10 text-rose-200'}`}><span className={`size-1.5 rounded-full ${isGood ? 'bg-emerald-300' : isPending ? 'bg-amber-300' : 'bg-rose-300'}`} />{status}</span>;
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return <div data-testid="loading-skeleton" className={`cf-shimmer rounded-xl bg-white/[.06] ${className}`} />;
}

export function CertificateCard({ certificate, onView, onQr }: { certificate: Certificate; onView?: () => void; onQr?: () => void }) {
  const accent = certificate.accent === 'cyan' ? 'from-cyan-300/20 to-cyan-400/5 border-cyan-200/20' : certificate.accent === 'indigo' ? 'from-indigo-400/20 to-indigo-500/5 border-indigo-300/20' : 'from-violet-400/20 to-violet-500/5 border-violet-300/20';
  return <article data-testid={`card-certificate-${certificate.id}`} className={`cf-glass group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${accent} p-5 transition-transform duration-300 hover:-translate-y-1`}>
    <div className="absolute -right-7 -top-8 size-28 rounded-full border border-white/10 opacity-60" /><div className="absolute -right-1 top-0 size-16 rounded-full border border-white/10 opacity-40" />
    <div className="relative flex items-start justify-between gap-3"><div className="flex items-center gap-2 text-xs text-slate-400"><span className="grid size-8 place-items-center rounded-lg bg-white/[.07]"><FileCheck2 size={15} className="text-cyan-200" /></span><span>SOULBOUND CREDENTIAL</span></div><StatusBadge status={certificate.status} /></div>
    <div className="relative mt-8"><p className="text-xs font-medium text-slate-400">{certificate.issuer}</p><h3 className="cf-display mt-1 max-w-[250px] text-xl font-bold leading-tight text-slate-100">{certificate.title}</h3><p className="mt-2 text-sm text-slate-400">{certificate.recipient} · {certificate.issued}</p></div>
    <div className="relative mt-6 flex items-end justify-between border-t border-white/10 pt-4"><div><p className="cf-mono text-[10px] uppercase tracking-widest text-slate-500">Token ID</p><p className="cf-mono mt-1 text-xs text-cyan-100">{certificate.tokenId}</p></div><div className="flex gap-1.5">{onQr && <button type="button" data-testid={`button-qr-${certificate.id}`} onClick={onQr} className="cf-focus rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-cyan-200"><QrCode size={15} /></button>}{onView && <button type="button" data-testid={`button-view-${certificate.id}`} onClick={onView} className="cf-focus rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-cyan-200"><ArrowUpRight size={15} /></button>}</div></div>
  </article>;
}

export function QRCodeModal({ certificate, onClose }: { certificate: Certificate | null; onClose: () => void }) {
  if (!certificate) return null;
  return <div role="dialog" aria-modal="true" data-testid="modal-qr-code" className="fixed inset-0 z-50 grid place-items-center bg-[#050817]/80 p-5 backdrop-blur-md">
    <div className="cf-glass relative w-full max-w-sm rounded-3xl p-7 text-center"><button type="button" data-testid="button-close-qr" onClick={onClose} className="cf-focus absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X size={18} /></button><div className="mx-auto mb-5 grid size-11 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200"><QrCode size={21} /></div><p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-200">Public credential link</p><h2 className="cf-display mt-2 text-2xl font-bold text-white">{certificate.title}</h2><div className="mx-auto my-6 w-fit rounded-2xl bg-white p-4"><QRCodeSVG value={`https://certiflow.network/verify?token=${certificate.tokenId}`} size={174} /></div><p className="cf-mono text-xs text-slate-400">{certificate.tokenId}</p><p className="mt-2 text-xs text-slate-500">Scan to verify on Sepolia Testnet</p></div>
  </div>;
}

export function VerifySearch({ value, onChange, onSubmit, loading }: { value: string; onChange: (value: string) => void; onSubmit: () => void; loading?: boolean }) {
  return <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }} className="cf-glass flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center">
    <div className="flex min-w-0 flex-1 items-center gap-3 px-3"><Network size={18} className="shrink-0 text-cyan-200" /><input data-testid="input-verify-search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter token ID or wallet address" className="cf-focus min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500" /></div>
    <button type="submit" data-testid="button-verify-search" disabled={loading} className="cf-button inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-[#09101f] disabled:cursor-wait disabled:opacity-70">{loading ? <LoaderCircle size={16} className="animate-spin" /> : <ShieldCheck size={16} />}{loading ? 'Searching ledger' : 'Verify credential'}</button>
  </form>;
}

export function CertificateDetails({ certificate, onClose, onQr }: { certificate: Certificate | null; onClose: () => void; onQr: () => void }) {
  if (!certificate) return null;
  const rows = [['Recipient', certificate.recipient], ['Issuing institution', certificate.issuer], ['Field of study', certificate.field], ['Result', certificate.grade], ['Wallet', certificate.wallet], ['Transaction', certificate.txHash]];
  return <div role="dialog" aria-modal="true" data-testid="modal-certificate-details" className="fixed inset-0 z-50 grid place-items-center bg-[#050817]/80 p-5 backdrop-blur-md"><div className="cf-glass cf-scrollbar relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8"><button type="button" data-testid="button-close-details" onClick={onClose} className="cf-focus absolute right-5 top-5 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X size={18} /></button><div className="flex items-center gap-3"><div className="grid size-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200"><FileCheck2 size={23} /></div><div><p className="text-xs uppercase tracking-[.17em] text-cyan-200">Credential record</p><h2 className="cf-display mt-1 pr-8 text-2xl font-bold text-white">{certificate.title}</h2></div></div><div className="mt-7 grid gap-3 sm:grid-cols-2">{rows.map(([label, value]) => <div key={label} className="rounded-xl border border-white/[.08] bg-black/10 p-3"><p className="text-[10px] uppercase tracking-[.14em] text-slate-500">{label}</p><p data-testid={`detail-${label.toLowerCase().replaceAll(' ', '-')}`} className={`mt-1 break-all text-sm text-slate-200 ${label === 'Wallet' || label === 'Transaction' ? 'cf-mono text-xs' : ''}`}>{value}</p></div>)}</div><div className="mt-6 flex flex-wrap gap-3"><button type="button" data-testid="button-details-qr" onClick={onQr} className="cf-button inline-flex items-center gap-2 rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-4 py-2.5 text-sm font-bold text-cyan-100"><QrCode size={16} /> Show QR</button><a href={`https://sepolia.etherscan.io/tx/${certificate.txHash.replace('...', '')}`} target="_blank" rel="noreferrer" data-testid="link-etherscan" className="cf-button inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[.06]"><ExternalLink size={15} /> View on explorer</a></div></div></div>;
}

export function EmptyState({ title, description, icon: Icon = CircleHelp }: { title: string; description: string; icon?: typeof CircleHelp }) {
  return <div data-testid="empty-state" className="rounded-2xl border border-dashed border-white/10 bg-white/[.02] px-6 py-12 text-center"><div className="mx-auto grid size-12 place-items-center rounded-2xl bg-indigo-400/10 text-indigo-200"><Icon size={22} /></div><h3 className="mt-4 text-base font-bold text-slate-200">{title}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p></div>;
}

export function Footer() {
  return <footer className="border-t border-white/[.07] bg-[#080b1a]"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-2"><Fingerprint size={15} className="text-cyan-200" /> CertiFlow Network</div><p>Built for a more portable academic future · Sepolia Testnet</p><div className="flex items-center gap-4"><span>Protocol v0.9</span><span className="inline-flex items-center gap-1.5 text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-300" /> Systems operational</span></div></div></footer>;
}

export function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: typeof Check }) {
  return <div className="cf-glass rounded-2xl p-4"><Icon size={17} className="text-cyan-200" /><p data-testid={`stat-${label}`} className="cf-display mt-4 text-2xl font-bold text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>;
}
