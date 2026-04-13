'use client';

import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import styles from './CtaSection.module.css';

const CtaSection = () => {
  const { isConnected, connect } = useWallet();

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!isConnected) {
      e.preventDefault();
      connect();
    }
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaGlow}></div>
      <div className={styles.sectionTag}>
        <span>★</span>
        Get started
      </div>
      <h2 className={styles.ctaTitle}>
        Your API.<br />
        <em>Your revenue.</em><br />
        Starting now.
      </h2>
      <p className={styles.ctaSub}>One proxy. Any API. Stellar USDC payments. Live in 60 seconds.</p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link 
          href="/dashboard" 
          className={styles.btnPrimary}
          onClick={handleDashboardClick}
        >
          {isConnected ? 'Go to Dashboard →' : 'Open Dashboard →'}
        </Link>
        <a href="https://github.com" className={styles.btnSecondary} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
