import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  GitBranch,
  Activity,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { bentoFeatures } from '../../data/features';
import styles from './BentoGrid.module.css';

// Map icon string to Lucide React component
const iconMap = {
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  GitBranch,
  Activity,
};

// Render custom mini visual for each bento card type
function BentoVisual({ type }) {
  switch (type) {
    case 'edge-nodes':
      return (
        <div className={styles.visualContainer}>
          <div className={styles.edgeNodesVisual}>
            <div className={styles.edgeNodeItem}>
              <span className={styles.nodeDot} />
              <span className={styles.nodeLabel}>NRT (Tokyo)</span>
              <span className={styles.nodePing}>0.4ms</span>
            </div>
            <div className={styles.edgeNodeItem}>
              <span className={styles.nodeDot} style={{ background: 'var(--accent-emerald)' }} />
              <span className={styles.nodeLabel}>FRA (Frankfurt)</span>
              <span className={styles.nodePing}>0.6ms</span>
            </div>
            <div className={styles.edgeNodeItem}>
              <span className={styles.nodeDot} />
              <span className={styles.nodeLabel}>IAD (Virginia)</span>
              <span className={styles.nodePing}>0.3ms</span>
            </div>
          </div>
        </div>
      );
    case 'security-badge':
      return (
        <div className={styles.visualContainer}>
          <div className={styles.securityVisual}>
            <span className={styles.secPill}>TLS 1.3 ChaCha20</span>
            <span style={{ color: 'var(--accent-emerald)' }}>✓ Cryptographic Hash</span>
          </div>
        </div>
      );
    case 'metric-gauge':
      return (
        <div className={styles.visualContainer}>
          <div className={styles.gaugeVisual}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Auto-scale:</span>
            <div className={styles.gaugeBarOuter}>
              <div className={styles.gaugeBarFill} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              99.2%
            </span>
          </div>
        </div>
      );
    case 'vector-preview':
      return (
        <div className={styles.visualContainer}>
          <div className={styles.vectorVisual}>
            <div className={styles.clusterBox}>HNSW Dim: 1536</div>
            <div className={styles.clusterBox}>Cosine Dist: 0.96</div>
            <div className={styles.clusterBox}>Cached: 94%</div>
          </div>
        </div>
      );
    case 'git-flow':
      return (
        <div className={styles.visualContainer}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-accent)' }}>
              git push apex feat/auth
            </span>
            <span style={{ fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              Preview Ready (1.4s)
            </span>
          </div>
        </div>
      );
    case 'trace-stream':
      return (
        <div className={styles.visualContainer}>
          <div className={styles.traceVisual}>
            <span style={{ color: 'var(--text-secondary)' }}>eBPF Socket RingBuffer:</span>
            <div className={styles.traceWave}>
              {[12, 18, 8, 22, 14, 20, 10, 16, 24].map((h, i) => (
                <div
                  key={i}
                  className={styles.waveBar}
                  style={{
                    height: `${h}px`,
                    opacity: 0.4 + (i % 3) * 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function BentoGrid() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.ambientOrb} />
      <div className={styles.ambientOrbRight} />

      <div className="container">
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionChip}>
            <Zap size={14} />
            <span>Architecture Capabilities</span>
          </div>

          <h2 className={styles.sectionTitle}>
            Engineered from Silicon Up for{' '}
            <span className={styles.highlightGradient}>Uncompromising Velocity</span>
          </h2>

          <p className={styles.sectionSubtitle}>
            Explore the distributed core services powering high-concurrency applications across 280+
            interconnected points of presence.
          </p>
        </motion.div>

        {/* 3-Column Bento Grid */}
        <div className={styles.bentoGrid}>
          {bentoFeatures.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || Cpu;
            const isSpan2 = feature.spanClass === 'span-2';
            const isEmerald = feature.accent === 'emerald';

            return (
              <motion.article
                key={feature.id}
                className={`${styles.bentoCard} ${isSpan2 ? styles.span2 : styles.span1} ${
                  isEmerald ? styles.bentoCardEmerald : ''
                }`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: (idx % 3) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className={styles.cardTopRow}>
                    <div
                      className={`${styles.iconWrapper} ${
                        isEmerald ? styles.iconEmerald : styles.iconIndigo
                      }`}
                    >
                      <IconComponent size={22} strokeWidth={2.2} />
                    </div>

                    <span
                      className={`${styles.badgePill} ${
                        isEmerald ? styles.badgeEmerald : styles.badgeIndigo
                      }`}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardDesc}>{feature.description}</p>

                  {/* Mini Visual Diagram */}
                  <BentoVisual type={feature.visualType} />
                </div>

                {/* Card Bottom Meta */}
                <div className={styles.cardBottom}>
                  <div className={styles.statTag}>
                    <span className={styles.statTagLabel}>{feature.stats.label}</span>
                    <span className={styles.statTagValue}>{feature.stats.value}</span>
                  </div>

                  <div className={styles.highlightPill}>
                    <CheckCircle size={13} color="var(--accent-emerald)" />
                    <span>{feature.highlight}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
