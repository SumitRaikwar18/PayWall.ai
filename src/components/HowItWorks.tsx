'use client';

import { useState } from 'react';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const [copyStatus, setCopyStatus] = useState('Run →');

  const handleCopy = () => {
    navigator.clipboard.writeText('ORIGIN_URL=https://wttr.in PRICE_USDC=0.001 npm run paywall');
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus('Run →'), 2000);
  };

  return (
    <section className={styles.section} id="how">
      <div className={styles.sectionInner}>
        <div className={styles.sectionTag}>How it works</div>
        <h2 className={styles.sectionTitle}>
          One proxy.<br />Any API.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Instant paywall.</em>
        </h2>
        <p className={styles.sectionSub}>No SDKs to integrate. No code to modify. Just point PayWall.ai at your origin and set a price.</p>

        <div className={styles.flowSteps}>
          <div className={styles.flowStep}>
            <div className={styles.stepNum}>01</div>
            <div className={styles.stepIcon}>⚡</div>
            <h3>Point & configure</h3>
            <p>Set ORIGIN_URL to any existing API — weather, search, market data, your own service. Set your USDC price per request.</p>
            <span className={styles.stepTag}>3 env vars</span>
          </div>
          <div className={styles.flowStep}>
            <div className={styles.stepNum}>02</div>
            <div className={styles.stepIcon}>⛓</div>
            <h3>Proxy intercepts</h3>
            <p>PayWall.ai sits in front of your API. Every request hits the proxy first. Unpaid requests get a 402 challenge with Stellar payment details.</p>
            <span className={styles.stepTag}>x402 protocol</span>
          </div>
          <div className={styles.flowStep}>
            <div className={styles.stepNum}>03</div>
            <div className={styles.stepIcon}>💸</div>
            <h3>Agent pays & gets data</h3>
            <p>AI agents sign a Soroban auth entry, pay USDC via OpenZeppelin facilitator, and receive your API response. Fully autonomous.</p>
            <span className={styles.stepTag}>Stellar USDC</span>
          </div>
        </div>

        {/* Architecture */}
        <div className={styles.archDiagram}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className={styles.archTag}>Payment flow</span>
          </div>
          <div className={styles.archRow}>
            <div className={styles.archBox}>
              <div className={styles.archBoxLabel}>AI Agent</div>
              <div className={styles.archBoxName}>Claude / GPT</div>
            </div>
            <div className={styles.archArrow}>
              <div className={styles.archArrowLine}></div>
              <div className={styles.archArrowLabel}>HTTP req</div>
            </div>
            <div className={`${styles.archBox} ${styles.accent}`}>
              <div className={styles.archBoxLabel}>PayWall.ai</div>
              <div className={styles.archBoxName}>x402 Proxy</div>
            </div>
            <div className={styles.archArrow}>
              <div className={styles.archArrowLine}></div>
              <div className={styles.archArrowLabel}>→ 402</div>
            </div>
            <div className={styles.archBox}>
              <div className={styles.archBoxLabel}>OZ Facilitator</div>
              <div className={styles.archBoxName}>Settles USDC</div>
            </div>
            <div className={styles.archArrow}>
              <div className={styles.archArrowLine}></div>
              <div className={styles.archArrowLabel}>paid req</div>
            </div>
            <div className={styles.archBox}>
              <div className={styles.archBoxLabel}>Origin API</div>
              <div className={styles.archBoxName}>Unchanged</div>
            </div>
          </div>
        </div>

        {/* Quick start command */}
        <div className={styles.commandBox}>
          <span className={styles.cmdLabel}>Quick start</span>
          <span className={styles.cmdCode}>ORIGIN_URL=https://wttr.in PRICE_USDC=0.001 npm run paywall</span>
          <button className={styles.cmdRun} onClick={handleCopy}>{copyStatus}</button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
