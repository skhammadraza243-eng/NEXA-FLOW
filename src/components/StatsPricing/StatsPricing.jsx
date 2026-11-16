import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Check, ArrowRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { statsData, pricingPlans } from '../../data/pricing';
import styles from './StatsPricing.module.css';

// Animated Number Counter Component using Framer Motion
function Counter({ targetValue, decimals = 0, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(decimals > 0 ? (0).toFixed(decimals) : '0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetValue, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString());
        },
      });
      return () => controls.stop();
    }
  }, [isInView, targetValue, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsPricing({ onOpenContact }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="stats-pricing" className={styles.section}>
      <div className={styles.ambientGlow} />

      <div className="container">
        {/* Animated Stats Numbers on Scroll */}
        <div className={styles.statsGrid}>
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              className={styles.statCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className={`${styles.statNumber} ${
                  stat.accent === 'emerald' ? styles.statNumberEmerald : styles.statNumberIndigo
                }`}
              >
                <Counter
                  targetValue={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <h3 className={styles.statLabel}>{stat.label}</h3>
              <p className={styles.statDesc}>{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Section Header */}
        <motion.div
          className={styles.pricingHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.chip}>
            <Zap size={14} />
            <span>Transparent Infrastructure Pricing</span>
          </div>

          <h2 className={styles.title}>
            Predictable Costs.{' '}
            <span className={styles.gradientText}>Zero Hidden Overages.</span>
          </h2>

          <p className={styles.subtitle}>
            Start free on our global edge network. Scale seamlessly into high-throughput enterprise
            workloads with guaranteed latency SLAs and 24/7 dedicated support.
          </p>

          {/* Interactive Billing Toggle Switch */}
          <div className={styles.toggleWrapper}>
            <div className={styles.toggleContainer}>
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`${styles.toggleBtn} ${!isAnnual ? styles.toggleBtnActive : ''}`}
              >
                {!isAnnual && (
                  <motion.div
                    layoutId="billingToggleIndicator"
                    className={styles.toggleIndicator}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                Monthly Billing
              </button>

              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`${styles.toggleBtn} ${isAnnual ? styles.toggleBtnActive : ''}`}
              >
                {isAnnual && (
                  <motion.div
                    layoutId="billingToggleIndicator"
                    className={styles.toggleIndicator}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                Annual Billing
              </button>
            </div>

            <span className={styles.saveBadge}>Save 20% + 2 Months Free</span>
          </div>
        </motion.div>

        {/* Pricing Tier Cards */}
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, idx) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                className={`${styles.pricingCard} ${plan.isPopular ? styles.popularCard : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {plan.isPopular && <div className={styles.popularTag}>Most Popular Choice</div>}

                <div>
                  <div className={styles.planHeader}>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    <p className={styles.planDesc}>{plan.description}</p>
                  </div>

                  <div className={styles.priceBox}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>{price}</span>
                    <span className={styles.period}>/ month {isAnnual ? '(billed annually)' : ''}</span>
                  </div>

                  <ul className={styles.featuresList}>
                    {plan.features.map((feature, i) => (
                      <li key={i} className={styles.featureItem}>
                        <Check size={16} color="var(--accent-emerald)" strokeWidth={2.4} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenContact(plan.name)}
                  className={`${styles.planBtn} ${
                    plan.isPopular ? styles.planBtnPopular : styles.planBtnStandard
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={15} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
