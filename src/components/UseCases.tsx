import styles from './UseCases.module.css';

const USE_CASES = [
  { icon: "🌤", title: "Weather & Environmental", desc: "Wrap OpenWeatherMap, wttr.in, or any climate API. Agents pay per forecast query.", price: "~0.001 USDC / request" },
  { icon: "🔍", title: "Search & Discovery", desc: "Monetize Brave Search, DuckDuckGo, or your own search index. Replace monthly API keys.", price: "~0.002 USDC / query" },
  { icon: "📈", title: "Financial Market Data", desc: "Price feeds, trading signals, on-chain analytics. Per-request billing vs subscriptions.", price: "~0.005 USDC / tick" },
  { icon: "🤖", title: "AI Inference", desc: "Gate your own model endpoints. Agents pay per completion, per token, or per image.", price: "~0.001 USDC / call" },
  { icon: "🗞", title: "News & Content", desc: "Pay-per-article access. Publishers monetize without paywalls that break agent workflows.", price: "~0.003 USDC / article" },
  { icon: "⚙️", title: "Any Internal API", desc: "Gate your internal services for cross-team billing. Every microservice becomes revenue.", price: "Custom pricing" },
];

const UseCases = () => {
  return (
    <section className={styles.section} id="usecases">
      <div className={styles.sectionInner}>
        <div className={styles.sectionTag}>Use cases</div>
        <h2 className={styles.sectionTitle}>
          Any API.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Monetized.</em>
        </h2>
        <p className={styles.sectionSub}>From weather to AI inference — if it responds to HTTP, PayWall.ai can gate it with Stellar micropayments.</p>

        <div className={styles.usecases}>
          {USE_CASES.map((uc, i) => (
            <div key={i} className={styles.usecase}>
              <span className={styles.ucIcon}>{uc.icon}</span>
              <div className={styles.ucTitle}>{uc.title}</div>
              <div className={styles.ucDesc}>{uc.desc}</div>
              <div className={styles.ucPrice}>{uc.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
