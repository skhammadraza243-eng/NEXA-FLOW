import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Send,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { footerNavigation } from '../../data/footer';
import { brandConfig } from '../../data/navigation';
import styles from './Footer.module.css';

// Crisp Brand SVGs
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer({ onOpenContact }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 1500);
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Newsletter Subscription Row */}
        <div className={styles.newsletterRow}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>Stay Ahead of Distributed Edge Innovation</h3>
            <p className={styles.newsletterSubtitle}>
              Receive our monthly engineering digest on WASM runtimes, kernel eBPF tracing, and AI
              vector indexing.
            </p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className={styles.newsletterForm} noValidate>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input
                  type="email"
                  placeholder="Enter your engineer email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={styles.newsletterInput}
                  aria-label="Email address for newsletter"
                />
                {error && <span style={{ fontSize: '11px', color: 'var(--accent-rose)' }}>{error}</span>}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className={styles.newsletterBtn}
              >
                <span>Subscribe</span>
                <Send size={14} />
              </motion.button>
            </form>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)' }}>
              <CheckCircle size={18} />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                Subscribed! Welcome to the ApexCloud engineering digest.
              </span>
            </div>
          )}
        </div>

        {/* Multi-Column Navigation Grid */}
        <div className={styles.footerGrid}>
          {/* Brand & Status Column */}
          <div className={styles.brandCol}>
            <a href="#hero" className={styles.brandLink}>
              <div className={styles.brandLogoWrapper}>
                <Layers size={18} strokeWidth={2.4} />
              </div>
              <span>{brandConfig.name}</span>
            </a>

            <p className={styles.brandDesc}>
              Next-generation distributed edge runtime and vector fabric designed for ultra-low
              latency, real-time AI inference, and autonomous elasticity.
            </p>

            <div className={styles.statusCard}>
              <span className={styles.pulseDot} />
              <span>All 280 Edge PoPs Operational (100%)</span>
            </div>
          </div>

          {/* Column 1: Products */}
          <div>
            <h4 className={styles.colTitle}>Products</h4>
            <ul className={styles.linkList}>
              {footerNavigation.products.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className={styles.footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className={styles.colTitle}>Solutions</h4>
            <ul className={styles.linkList}>
              {footerNavigation.solutions.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className={styles.footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className={styles.colTitle}>Resources</h4>
            <ul className={styles.linkList}>
              {footerNavigation.resources.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className={styles.footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              {footerNavigation.company.map((item, i) => (
                <li key={i}>
                  {item.label === 'Contact Us' ? (
                    <button
                      onClick={onOpenContact}
                      className={styles.footerLink}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a href={item.href} className={styles.footerLink}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className={styles.bottomBar}>
          <div>
            © {new Date().getFullYear()} ApexCloud Infrastructure, Inc. All rights reserved.
          </div>

          <div className={styles.complianceBadges}>
            <div className={styles.badgeItem}>
              <ShieldCheck size={14} color="var(--accent-emerald)" />
              <span>SOC2 Type II</span>
            </div>
            <div className={styles.badgeItem}>
              <ShieldCheck size={14} color="var(--accent-emerald)" />
              <span>ISO 27001</span>
            </div>
            <div className={styles.badgeItem}>
              <ShieldCheck size={14} color="var(--accent-emerald)" />
              <span>HIPAA Compliant</span>
            </div>
          </div>

          <ul className={styles.socialList}>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="GitHub">
                <GithubIcon />
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="Twitter">
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="Discord">
                <DiscordIcon />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
