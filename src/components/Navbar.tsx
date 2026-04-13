'use client';

import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isConnected, connect } = useWallet();

  const handleLaunchApp = (e: React.MouseEvent) => {
    if (!isConnected) {
      e.preventDefault();
      connect();
    }
  };

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
      <Link 
        href="/dashboard" 
        className={styles.navCta}
        onClick={handleLaunchApp}
      >
        {isConnected ? 'Go to Dashboard →' : 'Launch App →'}
      </Link>
    </nav>
  );
};

export default Navbar;
