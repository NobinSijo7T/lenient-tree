"use client";

import React, { useEffect } from 'react';
import styles from './PolicyModal.module.css';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string[];
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Function to detect if a line is a section title (starts with number followed by period and tab)
  const isSectionTitle = (text: string) => {
    return /^\d+\.\t/.test(text);
  };

  // Function to detect if a line is a subsection title (starts with number.number and tab)
  const isSubsectionTitle = (text: string) => {
    return /^\d+\.\d+\t/.test(text);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          {content.map((paragraph, index) => {
            if (isSectionTitle(paragraph)) {
              return (
                <h3 key={index} className={styles.sectionTitle}>
                  {paragraph}
                </h3>
              );
            } else if (isSubsectionTitle(paragraph)) {
              return (
                <h4 key={index} className={styles.subsectionTitle}>
                  {paragraph}
                </h4>
              );
            } else {
              return (
                <p key={index} className={styles.contentParagraph}>
                  {paragraph}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
