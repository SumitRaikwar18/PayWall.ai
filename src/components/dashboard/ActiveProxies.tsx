import { ServiceEntry } from '@/lib/types';
import styles from './ActiveProxies.module.css';

interface ActiveProxiesProps {
  services?: ServiceEntry[];
}

const ActiveProxies = ({ services = [] }: ActiveProxiesProps) => {
  return (
    <div className={styles.dashPanel}>
      <div className={styles.dashPanelHdr}>
        <span className={styles.dpTitle}>Active proxies</span>
        <span className={`${styles.dpBadge} ${styles.purple}`}>{services.length} running</span>
      </div>
      <div>
        {services.map((svc, i) => (
          <div key={i} className={styles.svcRow}>
            <div className={styles.svcTop}>
              <span className={styles.svcName}>{svc.name}</span>
              <span className={styles.svcPrice}>{svc.price}</span>
            </div>
            <div className={styles.svcUrl}>↔ {svc.url}</div>
            <div className={styles.svcFooter}>
              <span className={`${styles.svcTag}`}>
                {svc.status}
              </span>
              <span className={styles.svcPays}>{svc.calls} calls</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveProxies;
