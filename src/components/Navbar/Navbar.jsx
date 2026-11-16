import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Layers, Sparkles, ChevronRight } from 'lucide-react';
import { navLinks, brandConfig } from '../../data/navigation';
import styles from './Navbar.module.css';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for glassmorphism styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor active section using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'features', 'showcase', 'stats-pricing'];
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className={styles.brand}
            aria-label="ApexCloud Home"
          >
            <div className={styles.logoIconWrapper}>
              <Layers size={20} strokeWidth={2.4} />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>{brandConfig.name}</span>
              <span className={styles.versionBadge}>{brandConfig.version}</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveIndicator"
                      className={styles.activeIndicator}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className={styles.actionsRight}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenContact}
              className={styles.primaryCta}
            >
              <span>Get Started</span>
              <ArrowRight size={15} />
            </motion.button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.mobileMenuBtn}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.drawerBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              className={styles.drawerPanel}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className={styles.drawerHeader}>
                <div className={styles.brand}>
                  <div className={styles.logoIconWrapper}>
                    <Layers size={18} />
                  </div>
                  <span className={styles.brandName}>{brandConfig.name}</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerCloseBtn}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className={styles.drawerNavList}>
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1 }}
                    >
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className={`${styles.drawerNavLink} ${
                          isActive ? styles.drawerActiveLink : ''
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={16} opacity={0.6} />
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <div className={styles.drawerFooter}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className={styles.primaryCta}
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                >
                  <span>Request Early Access</span>
                  <ArrowRight size={16} />
                </motion.button>

                <div className={styles.drawerFooterStatus}>
                  <span className={styles.statusDot} />
                  <span>Global Edge Network: 280/280 Nodes Online</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
