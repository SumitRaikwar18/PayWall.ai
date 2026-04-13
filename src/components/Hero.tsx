'use client';

import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import styles from './Hero.module.css';

const Hero = () => {
  const { isConnected, connect } = useWallet();

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!isConnected) {
      e.preventDefault();
      connect();
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGrid}></div>
        <div className={styles.heroGlow}></div>

        <div className={styles.badge}>
          <span>★</span>
          Built on Stellar · x402 Protocol · Soroban
        </div>

        <h1>
          Monetize <span className={styles.serifItalic}>any</span><br />
          API in <span className={styles.lightWord}>60</span><br />
          seconds
        </h1>

        <p className={styles.heroSub}>
          A reverse proxy that wraps any HTTP endpoint with x402 micropayments on Stellar. No code changes. No subscriptions. AI agents pay per request in USDC — automatically.
        </p>

        <div className={styles.heroActions}>
          <Link 
            href="/dashboard" 
            className={styles.btnPrimary}
            onClick={handleDashboardClick}
          >
            {isConnected ? 'Go to Dashboard →' : 'Open Dashboard →'}
          </Link>
          <Link href="#how" className={styles.btnSecondary}>
            See how it works
          </Link>
        </div>

        <div className={styles.codePreview}>
          <div className={styles.codeWindow}>
            <div className={styles.codeHeader}>
              <div className={`${styles.codeDot} ${styles.red}`}></div>
              <div className={`${styles.codeDot} ${styles.yellow}`}></div>
              <div className={`${styles.codeDot} ${styles.green}`}></div>
              <span className={styles.codeFilename}>.env</span>
            </div>
            <div className={styles.codeBody}>
              <span className={styles.cm}># Wrap any API in 3 env vars</span><br /><br />
              <span className={styles.cy}>ORIGIN_URL</span>=<span className={styles.cs}>https://api.weather.com</span><br />
              <span className={styles.cy}>PRICE_USDC</span>=<span className={styles.cg}>0.001</span><br />
              <span className={styles.cy}>SELLER_ADDRESS</span>=<span className={styles.cs}>G...</span><br /><br />
              <span className={styles.cm}># Then run:</span><br />
              <span className={styles.cp}>$</span> <span className={styles.cf}>npm</span> run paywall<br /><br />
              <span className={styles.cg}>✓</span> Proxy running on :4000<br />
              <span className={styles.cg}>✓</span> x402 gate active — 0.001 USDC/req<br />
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className={styles.statsStrip}>
        <div className={styles.stat}>
          <div className={styles.statNum}>60<span>s</span></div>
          <div className={styles.statLabel}>Setup time</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>0<span>¢</span></div>
          <div className={styles.statLabel}>Monthly fee</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>∞</div>
          <div className={styles.statLabel}>APIs supported</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>3<span>s</span></div>
          <div className={styles.statLabel}>Settlement</div>
        </div>
      </div>

      {/* TICKER */}
      <div className={styles.tickerWrap} aria-hidden="true">
        <div className={styles.ticker}>
          <span className={styles.ti}>x402 payment <b>verified ✓</b></span>
          <span className={styles.ti}>0.001 USDC <b>settled on Stellar</b></span>
          <span className={styles.ti}>weather API <b>monetized</b></span>
          <span className={styles.ti}>AI agent <b>paid autonomously</b></span>
          <span className={styles.ti}>proxy request <b>forwarded</b></span>
          <span className={styles.ti}>new service <b>registered ✓</b></span>
          {/* Duplicate for seamless ticker */}
          <span className={styles.ti}>x402 payment <b>verified ✓</b></span>
          <span className={styles.ti}>0.001 USDC <b>settled on Stellar</b></span>
          <span className={styles.ti}>weather API <b>monetized</b></span>
          <span className={styles.ti}>AI agent <b>paid autonomously</b></span>
          <span className={styles.ti}>proxy request <b>forwarded</b></span>
          <span className={styles.ti}>new service <b>registered ✓</b></span>
        </div>
      </div>
    </>
  );
};

export default Hero;
