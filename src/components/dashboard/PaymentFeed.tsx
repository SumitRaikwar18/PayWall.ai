import { PaymentRecord } from '@/lib/types';
import styles from './PaymentFeed.module.css';

interface PaymentFeedProps {
  payments?: PaymentRecord[];
}

const PaymentFeed = ({ payments = [] }: PaymentFeedProps) => {
  return (
    <div className={styles.dashPanel}>
      <div className={styles.dashPanelHdr}>
        <span className={styles.dpTitle}>Live payment feed</span>
        <span className={styles.dpBadge}>{payments.length} payments</span>
      </div>
      <div>
        {payments.map((p, i) => (
          <div key={i} className={styles.payRow}>
            <div className={`${styles.payIcon} ${styles.ok}`}>✓</div>
            <div>
              <div className={styles.payName}>{p.name}</div>
              <div className={styles.payUrl}>{p.url}</div>
              <div className={styles.payHash} style={{ marginTop: '2px' }}>
                <a href={`https://stellar.expert/explorer/testnet/tx/${p.hash}`} target="_blank" rel="noopener noreferrer">
                  {p.hash.slice(0, 8)}...{p.hash.slice(-6)}
                </a>
              </div>
            </div>
            <div>
              <div className={styles.payAmt}>+{p.amt} USDC</div>
              <div className={styles.payTime}>{p.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentFeed;
