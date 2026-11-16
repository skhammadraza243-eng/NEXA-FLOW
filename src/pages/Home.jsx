import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import BentoGrid from '../components/BentoGrid/BentoGrid';
import Showcase from '../components/Showcase/Showcase';
import StatsPricing from '../components/StatsPricing/StatsPricing';
import Footer from '../components/Footer/Footer';
import ContactModal from '../components/ContactModal/ContactModal';
import styles from './Home.module.css';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro Scale');

  const handleOpenContact = (planName) => {
    if (typeof planName === 'string') {
      setSelectedPlan(planName);
    }
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Subtle Background Texture */}
      <div className={styles.gridTexture} />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar onOpenContact={() => handleOpenContact('Pro Scale')} />

      {/* Main Sections */}
      <main className={styles.mainContent}>
        {/* Animated Hero Section */}
        <Hero onOpenContact={() => handleOpenContact('Pro Scale')} />

        {/* Bento Grid Features Section */}
        <BentoGrid />

        {/* Interactive Showcase / Filterable Tabs */}
        <Showcase onOpenContact={() => handleOpenContact('Custom Edge PoP')} />

        {/* Pricing / Stats Section */}
        <StatsPricing onOpenContact={handleOpenContact} />
      </main>

      {/* Responsive Footer */}
      <Footer onOpenContact={() => handleOpenContact('Pro Scale')} />

      {/* Animated Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}
