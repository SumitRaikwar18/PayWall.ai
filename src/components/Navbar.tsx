'use client';

import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.logoDot}></div>
        PayWall.ai
      </div>
      <div className={styles.navLinks}>
        <Link href="#how">How it works</Link>
        <Link href="#usecases">Use cases</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <a 
        href="https://github.com/SumitRaikwar18/PayWall.ai" 
        className={styles.navCta}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
    </nav>
  );
};

export default Navbar;
