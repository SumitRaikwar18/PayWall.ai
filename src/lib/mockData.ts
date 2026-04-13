import { PaymentRecord, ServiceEntry } from './types';

export const MOCK_PAYMENTS: PaymentRecord[] = [
  { name: "Weather Proxy", url: "http://localhost:4000/London", amt: "0.0010", time: "Just now", hash: "a3f9c2bd1e4f", ok: true },
  { name: "Weather Proxy", url: "http://localhost:4000/Tokyo", amt: "0.0010", time: "45s ago", hash: "c9e8a7b2d1f0", ok: true },
];

export const MOCK_SERVICES: ServiceEntry[] = [
  {
    name: "Weather Gateway (TESTNET)",
    price: "0.001 USDC/req",
    url: "http://localhost:4021",
    status: "active",
    calls: 5,
    verified: true,
    payments: 5
  },
  {
    name: "Premium Portfolio Paywall",
    price: "0.10 USDC/req",
    url: "http://localhost:4021/premium-portfolio",
    status: "active",
    calls: 2,
    verified: true,
    payments: 2
  }
];
