import styles from './StatCards.module.css';

interface StatProps {
  label: string;
  value: string | number;
  sub: string;
  type: 'green' | 'purple' | 'amber' | 'red';
  trend?: 'up' | 'down';
  addon?: string;
}

const StatCard = ({ label, value, sub, type, trend, addon }: StatProps) => (
  <div className={`${styles.dashStat} ${styles[type]}`}>
    <div className={styles.dsLabel}>{label}</div>
    <div className={styles.dsValue}>
      {value}
      {addon && <span style={{ fontSize: '1.4rem' }}>{addon}</span>}
    </div>
    <div className={`${styles.dsSub} ${trend === 'up' ? styles.dsUp : trend === 'down' ? styles.dsDown : ''}`}>
      {sub}
    </div>
  </div>
);

interface StatCardsProps {
  totalEarned?: string;
  totalCalls?: number;
  activeCount?: number;
}

const StatCards = ({ 
  totalEarned = '0.0247', 
  totalCalls = 247, 
  activeCount = 2 
}: StatCardsProps) => {
  return (
    <div className={styles.dashStats}>
      <StatCard 
        label="Total earned" 
        value={totalEarned} 
        sub="TESTNET USDC" 
        type="green" 
        addon=" USDC"
      />
      <StatCard 
        label="Total requests" 
        value={totalCalls} 
        sub="paid requests" 
        type="green" 
      />
      <StatCard 
        label="Success rate" 
        value="100" 
        addon="%" 
        sub="verified settlements" 
        type="purple" 
      />
      <StatCard 
        label="Active proxies" 
        value={activeCount} 
        sub="monetized services" 
        type="amber" 
      />
    </div>
  );
};

export default StatCards;
