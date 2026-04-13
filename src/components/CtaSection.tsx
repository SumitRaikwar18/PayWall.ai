'use client';

import Link from 'next/link';
import styles from './CtaSection.module.css';

const CtaSection = () => {
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
        <a 
          href="https://github.com/SumitRaikwar18/PayWall.ai" 
          className={styles.btnPrimary}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub →
        </a>
        <a 
          href="https://github.com/SumitRaikwar18/PayWall.ai" 
          className={styles.btnSecondary} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Stellar Docs
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
