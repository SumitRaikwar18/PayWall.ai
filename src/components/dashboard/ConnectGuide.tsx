'use client';

import { useState } from 'react';
import styles from './ConnectGuide.module.css';

interface ConnectGuideProps {
  isOnline?: boolean;
}

const ConnectGuide = ({ isOnline = false }: ConnectGuideProps) => {
  const [checking, setChecking] = useState(false);
  const [localOnline, setLocalOnline] = useState(false);

  const proxyOnline = isOnline || localOnline;

  const checkProxy = async () => {
    setChecking(true);
    try {
      const r = await fetch('http://localhost:4021/health', { signal: AbortSignal.timeout(2000) });
      setLocalOnline(r.ok);
    } catch {
      setLocalOnline(false);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div>
      {/* Create a paywall */}
      <div className={styles.dashPanel}>
        <div className={styles.dashPanelHdr}>
          <span className={styles.dpTitle}>Create a paywall</span>
        </div>
        <div style={{ padding: '1rem 1.5rem' }}>
          <p style={{ fontSize: '12px', color: 'var(--fg2)', lineHeight: '1.7', marginBottom: '0.8rem' }}>Set these 3 env vars and run the proxy:</p>
          <div className={styles.connectCode}>
            {`ORIGIN_URL=https://your-api.com\nPRICE_USDC=0.001\nSELLER_ADDRESS=G...\n\nnpm run paywall`}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--fg2)', lineHeight: '1.7', margin: '1rem 0 0.5rem' }}>Then ask Claude:</p>
          <div className={styles.promptChip}>"Create a paywall for my portfolio at 0.10 USDC"</div>
          <p style={{ fontSize: '12px', color: 'var(--fg2)', lineHeight: '1.7', margin: '0.5rem 0 0.5rem' }}>The Magic Prompt:</p>
          <div className={styles.connectCode} style={{ fontSize: '9px', opacity: 0.8 }}>
            "Claude, use PayWall.ai to monetize [URL]..."
          </div>
        </div>
      </div>


      {/* Proxy Status */}
      <div className={styles.dashPanel}>
        <div className={styles.dashPanelHdr}>
          <span className={styles.dpTitle}>Proxy status</span>
          <span className={`${styles.dpBadge} ${proxyOnline ? styles.online : styles.offline}`}>
            {proxyOnline ? 'online' : 'offline'}
          </span>
        </div>
        <div style={{ padding: '1rem 1.5rem' }}>
          <p style={{ fontSize: '12px', color: 'var(--fg2)', marginBottom: '0.8rem', lineHeight: '1.6' }}>
            Start the proxy server to begin accepting payments.
          </p>
          <div className={styles.connectCode}>npm run paywall</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.8rem' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: '10px', color: 'var(--fg3)' }}>
              http://localhost:4021
            </span>
            <button 
              onClick={checkProxy} 
              disabled={checking}
              style={{ 
                fontFamily: 'var(--font-dm-mono), monospace', 
                fontSize: '10px', 
                padding: '5px 12px', 
                border: '0.5px solid var(--border)', 
                borderRadius: '2px', 
                background: 'transparent', 
                color: 'var(--fg2)', 
                cursor: 'pointer' 
              }}
            >
              {checking ? '...' : 'check'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectGuide;
