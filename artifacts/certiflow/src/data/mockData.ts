export type CertificateStatus = 'Verified' | 'Pending' | 'Revoked';

export type Certificate = {
  id: string;
  tokenId: string;
  title: string;
  recipient: string;
  wallet: string;
  issuer: string;
  issuerWallet: string;
  issued: string;
  issuedISO: string;
  status: CertificateStatus;
  grade: string;
  field: string;
  txHash: string;
  accent: 'cyan' | 'indigo' | 'violet';
};

export type AuthorizedIssuer = {
  id: string;
  name: string;
  wallet: string;
  added: string;
  status: 'Active' | 'Revoked';
};

export const demoWallet = '0x71C4...9A2E';
export const fullDemoWallet = '0x71C4A9D2E0F4B74B916C6B8D2F9A9A2E';

export const initialCertificates: Certificate[] = [
  {
    id: 'cert-aurora',
    tokenId: 'CF-2024-001847',
    title: 'BSc Computer Science',
    recipient: 'Maya Chen',
    wallet: fullDemoWallet,
    issuer: 'Aurora University',
    issuerWallet: '0xAUR0...1284',
    issued: 'Jun 18, 2024',
    issuedISO: '2024-06-18',
    status: 'Verified',
    grade: 'First Class Honours',
    field: 'Computer Science',
    txHash: '0x4b7c...98fd',
    accent: 'cyan',
  },
  {
    id: 'cert-design',
    tokenId: 'CF-2023-000912',
    title: 'Certificate in Product Design',
    recipient: 'Maya Chen',
    wallet: fullDemoWallet,
    issuer: 'Northstar Institute',
    issuerWallet: '0xN0RT...4421',
    issued: 'Nov 02, 2023',
    issuedISO: '2023-11-02',
    status: 'Verified',
    grade: 'Distinction',
    field: 'Product Design',
    txHash: '0x1ac9...73e1',
    accent: 'indigo',
  },
  {
    id: 'cert-data',
    tokenId: 'CF-2022-000306',
    title: 'Data Ethics & Society',
    recipient: 'Maya Chen',
    wallet: fullDemoWallet,
    issuer: 'Civic Lab Academy',
    issuerWallet: '0xC1V1...7710',
    issued: 'Aug 27, 2022',
    issuedISO: '2022-08-27',
    status: 'Verified',
    grade: 'Completed',
    field: 'Data Ethics',
    txHash: '0x8da1...11bc',
    accent: 'violet',
  },
  {
    id: 'cert-verified-demo',
    tokenId: 'CF-2024-001999',
    title: 'MSc Sustainable Systems',
    recipient: 'Jonas Reed',
    wallet: '0x9B18C8A440B70C3E881CF1E22C884421',
    issuer: 'Pioneer Technical University',
    issuerWallet: '0xP10N...8890',
    issued: 'Jul 09, 2024',
    issuedISO: '2024-07-09',
    status: 'Verified',
    grade: 'Merit',
    field: 'Sustainable Systems',
    txHash: '0xf19d...02ca',
    accent: 'cyan',
  },
];

export const initialIssuers: AuthorizedIssuer[] = [
  { id: 'issuer-aurora', name: 'Aurora University', wallet: '0xAUR0...1284', added: 'Mar 12, 2024', status: 'Active' },
  { id: 'issuer-northstar', name: 'Northstar Institute', wallet: '0xN0RT...4421', added: 'Apr 06, 2024', status: 'Active' },
  { id: 'issuer-civic', name: 'Civic Lab Academy', wallet: '0xC1V1...7710', added: 'May 19, 2024', status: 'Active' },
];

export const liveStats = [
  { value: '12,840', label: 'Credentials issued' },
  { value: '98.7%', label: 'Verification success' },
  { value: '46', label: 'Partner institutions' },
  { value: '2.1s', label: 'Average lookup' },
];
