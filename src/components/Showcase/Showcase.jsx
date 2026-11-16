import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Sparkles,
  Terminal,
  Cpu,
  Lock,
  Database,
  Layers,
  ArrowRight,
  ExternalLink,
  X,
  Check,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { showcaseCategories, showcaseItems } from '../../data/showcase';
import styles from './Showcase.module.css';

// Lucide icon mapping
const iconMap = {
  Globe,
  Sparkles,
  Terminal,
  Cpu,
  Lock,
  Database,
  Layers,
};

export default function Showcase({ onOpenContact }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [copied, setCopied] = useState(false);

  // Filter items based on activeCategory
  const filteredItems =
    activeCategory === 'All'
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === activeCategory);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  const handleCopyCode = (snippet) => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className={styles.section}>
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
            <Sparkles size={14} />
            <span>Interactive Showcase</span>
          </div>

          <h2 className={styles.sectionTitle}>
            Modular Runtimes & Primitives for{' '}
            <span className={styles.gradientText}>Modern Engineering Stacks</span>
          </h2>

          <p className={styles.sectionSubtitle}>
            Select a domain to filter specialized edge capabilities. Click any component card to
            inspect the architecture, SDK integration, and live latency benchmarks.
          </p>
        </motion.div>

        {/* Category Filter Pills using Framer Motion layoutId */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabsContainer} role="tablist">
            {showcaseCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className={styles.activeTabBackground}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <motion.div layout className={styles.cardsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const IconComponent = iconMap[item.icon] || Globe;
              const isEmerald = item.accent === 'emerald';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedItem(item)}
                  className={`${styles.cardItem} ${isEmerald ? styles.cardItemEmerald : ''}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                >
                  <div>
                    {/* Card Top: Icon & Badge */}
                    <div className={styles.cardTop}>
                      <div
                        className={`${styles.cardIcon} ${
                          isEmerald ? styles.cardIconEmerald : styles.cardIconIndigo
                        }`}
                      >
                        <IconComponent size={20} strokeWidth={2.2} />
                      </div>

                      <span
                        className={`${styles.badge} ${
                          isEmerald ? styles.badgeEmerald : styles.badgeIndigo
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardSubtitle}>{item.subtitle}</p>
                    <p className={styles.cardDesc}>{item.description}</p>

                    {/* Metrics Callout */}
                    <div className={styles.metricsCallout}>
                      <span className={styles.metricsValue}>{item.metrics.primary}</span>
                      <span className={styles.metricsLabel}>{item.metrics.label}</span>
                    </div>

                    {/* Tag Pills */}
                    <div className={styles.tagsContainer}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className={styles.cardCta}>
                    <span>Inspect Module Spec</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className={styles.modalPanel}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <div className={styles.modalTitleGroup}>
                  <div
                    className={`${styles.cardIcon} ${
                      selectedItem.accent === 'emerald'
                        ? styles.cardIconEmerald
                        : styles.cardIconIndigo
                    }`}
                  >
                    {React.createElement(iconMap[selectedItem.icon] || Globe, { size: 24 })}
                  </div>
                  <div>
                    <h3 className={styles.modalTitle}>{selectedItem.title}</h3>
                    <span className={styles.cardSubtitle}>{selectedItem.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className={styles.modalCloseBtn}
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className={styles.modalBody}>
                <p className={styles.modalLongDesc}>{selectedItem.longDescription}</p>

                {/* Features List */}
                <div>
                  <h4
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 700,
                      marginBottom: '8px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Architectural Highlights
                  </h4>
                  <ul className={styles.featuresList}>
                    {selectedItem.features.map((feature, i) => (
                      <li key={i} className={styles.featureItem}>
                        <CheckCircle2 size={16} color="var(--accent-emerald)" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Sample */}
                <div>
                  <div className={styles.codeHeader}>
                    <span className={styles.codeTitle}>SDK Integration Sample</span>
                    <button
                      onClick={() => handleCopyCode(selectedItem.codeSnippet)}
                      className={styles.copyBtn}
                    >
                      {copied ? (
                        <>
                          <Check size={12} color="var(--accent-emerald)" />
                          <span style={{ color: 'var(--accent-emerald)' }}>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className={styles.codeBlock}>
                    <code>{selectedItem.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className={styles.modalActions}>
                <button
                  onClick={() => setSelectedItem(null)}
                  className={styles.cardSubtitle}
                  style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onOpenContact();
                  }}
                  className={styles.modalDeployBtn}
                >
                  <span>Provision This Primitive</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
