'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Dashboard.module.css';
import { useWallet } from '@/context/WalletContext';
import StatCards from '@/components/dashboard/StatCards';
import PaymentFeed from '@/components/dashboard/PaymentFeed';
import ActiveProxies from '@/components/dashboard/ActiveProxies';
import ConnectGuide from '@/components/dashboard/ConnectGuide';
import { useProxyData } from '@/hooks/useProxyData';

export default function DashboardPage() {
  const [lastUpdated, setLastUpdated] = useState<string>('—');
  const [showDropdown, setShowDropdown] = useState(false);
  const { address, disconnect } = useWallet();
  const { payments, services, proxyOnline } = useProxyData();

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const truncatedAddress = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : 'Not Connected';

  return (
    <div className={styles.dashPage}>
      <header className={styles.dashHeader}>
        <div className={styles.dashLogo}>
          <div className={styles.logoDot}></div>
          PayWall.ai
          <span style={{ fontSize: '11px', color: 'var(--fg3)', fontWeight: 300 }}>/ Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className={styles.liveBadge}><div className={styles.liveDot}></div>Live</div>
          <div className={styles.dashNet}>stellar:testnet</div>
          
          <div className={styles.walletWrapper}>
            <button 
              className={styles.backBtn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {truncatedAddress} ▾
            </button>
            {showDropdown && (
              <div className={styles.dropdown}>
                <button 
                  className={styles.dropdownItem} 
                  onClick={() => { disconnect(); setShowDropdown(false); }}
                >
                  <span>🔒</span> Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={styles.dashBody}>
        {/* Stat cards */}
        <StatCards 
          activeCount={services.length} 
          totalCalls={services.reduce((acc, s) => acc + s.calls, 0)} 
        />

        <div className={styles.dashGrid}>
          {/* LEFT COLUMN */}
          <div>
            <PaymentFeed payments={payments} />
            <ActiveProxies services={services} />
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <ConnectGuide isOnline={proxyOnline} />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className={styles.statusBar}>
        <div className={`${styles.si} ${styles.ok}`}>● Stellar Testnet Connected</div>
        <div className={`${styles.si} ${proxyOnline ? styles.ok : styles.err}`}>
          ● Gateway Port 4021: {proxyOnline ? 'ONLINE' : 'OFFLINE'}
        </div>
        <div className={styles.si}>Last updated: <span style={{ color: 'var(--fg)' }}>{lastUpdated}</span></div>
        <div className={styles.si}>Auto-refresh: <span style={{ color: 'var(--purple)' }}>30s</span></div>
        <div className={styles.si} style={{ marginLeft: 'auto' }}>
          PayWall.ai v0.1.0 · <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>GitHub</a>
        </div>
      </div>
    </div>
  );
}
