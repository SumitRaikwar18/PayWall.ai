import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <div className={styles.logoDot}></div>
        PayWall.ai
      </div>
      <div className={styles.footerLinks}>
        <a href="https://developers.stellar.org/docs/build/agentic-payments/x402" target="_blank" rel="noopener noreferrer">
          x402 Docs
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div className={styles.footerNote}>Agents on Stellar Hackathon · April 2026</div>
    </footer>
  );
};

export default Footer;
