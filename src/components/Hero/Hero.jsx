import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Terminal,
  Sparkles,
  Zap,
  Activity,
  ShieldCheck,
  Globe2,
  CheckCircle2,
} from 'lucide-react';
import styles from './Hero.module.css';

// Framer Motion staggered animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Region mock telemetry for interactive card
const regions = [
  {
    id: 'tokyo-hnd',
    name: 'Tokyo (HND)',
    latency: '3.8ms',
    traffic: '1.4M req/s',
    health: '100%',
    status: 'OPTIMAL',
  },
  {
    id: 'frankfurt-fra',
    name: 'Frankfurt (FRA)',
    latency: '4.2ms',
    traffic: '2.1M req/s',
    health: '100%',
    status: 'OPTIMAL',
  },
  {
    id: 'us-east-iad',
    name: 'US East (IAD)',
    latency: '2.9ms',
    traffic: '3.6M req/s',
    health: '100%',
    status: 'OPTIMAL',
  },
];

export default function Hero({ onOpenContact }) {
  const [activeRegion, setActiveRegion] = useState(regions[2]);

  const handleScrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      const offset = 80;
      const elementPos = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className={styles.heroSection}>
      {/* Background Ambient Glows */}
      <div className={styles.ambientGlow} />
      <div className={styles.ambientSecondaryGlow} />

      <div className={`container ${styles.heroGrid}`}>
        {/* Left Column: Staggered Entrance Content */}
        <motion.div
          className={styles.contentLeft}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Announcement Badge */}
          <motion.div variants={itemVariants} className={styles.announcementBadge}>
            <span className={styles.badgePill}>New v3.4</span>
            <span>Autonomous Edge Runtime & AI Vectors</span>
            <Sparkles size={14} />
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className={styles.title}>
            Deploy at the Edge.{' '}
            <span className={styles.gradientText}>Scale with Autonomous Intelligence.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className={styles.description}>
            ApexCloud combines sub-5ms distributed edge isolates, zero-overhead eBPF
            observability, and embedded vector search. Ship mission-critical microservices with zero
            operational friction.
          </motion.p>

          {/* Primary / Secondary CTA Buttons with Micro-interactions */}
          <motion.div variants={itemVariants} className={styles.ctaGroup}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenContact}
              className={styles.primaryBtn}
            >
              <span>Deploy to Edge in 60s</span>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleScrollToFeatures}
              className={styles.secondaryBtn}
            >
              <Terminal size={17} />
              <span>Explore Architecture</span>
            </motion.button>
          </motion.div>

          {/* Social Proof & Key Metrics */}
          <motion.div variants={itemVariants} className={styles.socialProof}>
            <span className={styles.proofLabel}>Engineered for Production Scale</span>
            <div className={styles.proofMetrics}>
              <div className={styles.proofItem}>
                <span className={styles.proofNum}>99.99%</span>
                <span className={styles.proofText}>SLA Uptime</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.proofNum}>&lt; 0.8ms</span>
                <span className={styles.proofText}>WASM Cold Start</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.proofNum}>280+</span>
                <span className={styles.proofText}>Global PoPs</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating Interactive UI Card */}
        <motion.div
          className={styles.visualRight}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.floatingCardWrapper}>
            {/* Top Floating Badge */}
            <motion.div
              className={styles.floatingBadgeTop}
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <ShieldCheck size={16} color="var(--accent-emerald)" />
              <span>Zero-Trust mTLS v1.3 Active</span>
            </motion.div>

            {/* Bottom Floating Badge */}
            <motion.div
              className={styles.floatingBadgeBottom}
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
            >
              <Activity size={16} color="var(--accent-indigo)" />
              <span>P99 Latency: {activeRegion.latency}</span>
            </motion.div>

            {/* Main Interactive Preview Card */}
            <motion.div
              className={styles.cardContainer}
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              whileHover={{ y: -8 }}
            >
              {/* Card Window Bar */}
              <div className={styles.cardHeader}>
                <div className={styles.windowDots}>
                  <span className={`${styles.dot} ${styles.dotRed}`} />
                  <span className={`${styles.dot} ${styles.dotYellow}`} />
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <div className={styles.cardHeaderTitle}>
                  <span className={styles.statusIndicatorPulse} />
                  <span>apex-runtime :: {activeRegion.id}</span>
                </div>
                <Globe2 size={15} color="var(--text-muted)" />
              </div>

              {/* Card Content & Interactive Controls */}
              <div className={styles.cardBody}>
                {/* Region Selector Pills */}
                <div className={styles.regionSelector}>
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => setActiveRegion(region)}
                      className={`${styles.regionBtn} ${
                        activeRegion.id === region.id ? styles.regionBtnActive : ''
                      }`}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>

                {/* Live Telemetry Display */}
                <div className={styles.telemetryGrid}>
                  <div className={styles.telemetryBox}>
                    <span className={styles.telemetryLabel}>Round Trip</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryEmerald}`}>
                      {activeRegion.latency}
                    </span>
                  </div>
                  <div className={styles.telemetryBox}>
                    <span className={styles.telemetryLabel}>Throughput</span>
                    <span className={styles.telemetryValue}>{activeRegion.traffic}</span>
                  </div>
                  <div className={styles.telemetryBox}>
                    <span className={styles.telemetryLabel}>Node Health</span>
                    <span className={`${styles.telemetryValue} ${styles.telemetryEmerald}`}>
                      {activeRegion.health}
                    </span>
                  </div>
                </div>

                {/* Simulated Terminal Live Log Stream */}
                <div className={styles.terminalBlock}>
                  <div className={styles.terminalLine}>
                    <span className={styles.termPrompt}>$</span>
                    <span className={styles.termCmd}>apex deploy --region={activeRegion.id}</span>
                  </div>
                  <div className={styles.terminalLine}>
                    <span className={styles.termMuted}>[isolate] compiling wasm bytecode...</span>
                  </div>
                  <div className={styles.terminalLine}>
                    <span className={styles.termMuted}>[network] anycast routes synchronized</span>
                  </div>
                  <div className={styles.terminalLine}>
                    <span className={styles.termSuccess}>
                      ✓ Live at https://{activeRegion.id}.edge.apex.io (0.7ms)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
