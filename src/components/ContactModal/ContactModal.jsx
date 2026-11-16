import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import styles from './ContactModal.module.css';

export default function ContactModal({ isOpen, onClose, defaultPlan = 'Pro Scale' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    plan: defaultPlan,
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync defaultPlan when prop changes
  useEffect(() => {
    if (defaultPlan) {
      setFormData((prev) => ({ ...prev, plan: defaultPlan }));
    }
  }, [defaultPlan]);

  // Lock scroll & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Client-side validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid business email address.';
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      newErrors.company = 'Company or team name is required.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters detailing your workload.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1100);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.titleArea}>
                <h3 id="contact-modal-title" className={styles.title}>
                  {isSubmitted ? 'Provisioning Confirmed' : 'Deploy With ApexCloud'}
                </h3>
                <p className={styles.subtitle}>
                  {isSubmitted
                    ? 'Your dedicated edge cluster is being initialized.'
                    : 'Get started with instant sandbox provisioning or request an architecture review.'}
                </p>
              </div>

              <button
                onClick={handleClose}
                className={styles.closeBtn}
                aria-label="Close contact dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Form or Success View */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                {/* Row 1: Name & Work Email */}
                <div className={styles.rowTwo}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      <span>Work Email *</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="alex@acme.ai"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Company & Plan */}
                <div className={styles.rowTwo}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>
                      <span>Organization / Team *</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Systems"
                      value={formData.company}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
                    />
                    {errors.company && <span className={styles.errorText}>{errors.company}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="plan" className={styles.label}>
                      <span>Selected Tier</span>
                    </label>
                    <select
                      id="plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="Developer Starter">Developer Starter ($0)</option>
                      <option value="Pro Scale">Pro Scale ($29/mo)</option>
                      <option value="Enterprise Ultra">Enterprise Ultra (Bespoke)</option>
                      <option value="Custom Edge PoP">Dedicated Edge Node</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Message / Scope */}
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    <span>Workload Description *</span>
                    <span style={{ color: 'var(--text-muted)' }}>min 10 chars</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your traffic volumes, target regions, or WASM / AI workloads..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  />
                  {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Validating & Provisioning...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Request Instant Cluster Access</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                className={styles.successView}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div className={styles.successIconWrapper}>
                  <CheckCircle2 size={36} strokeWidth={2.4} />
                </div>
                <h4 className={styles.successTitle}>Cluster Access Requested!</h4>
                <p className={styles.successDesc}>
                  Thank you, <strong>{formData.name}</strong>. We've routed your request to our
                  solutions team for <strong>{formData.company}</strong> on the{' '}
                  <strong>{formData.plan}</strong> tier. Check your inbox ({formData.email}) for
                  your deployment keys.
                </p>
                <button
                  onClick={handleClose}
                  className={styles.submitBtn}
                  style={{ width: 'auto', paddingInline: '32px' }}
                >
                  Return to Site
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
