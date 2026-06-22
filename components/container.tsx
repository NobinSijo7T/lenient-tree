"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import PolicyModal from "./PolicyModal";
import styles from "./container.module.css";

export type ContainerType = {
  className?: string;
};

interface PolicyContent {
  title: string;
  content: string[];
}

const Container: NextPage<ContainerType> = ({ className = "" }) => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState<PolicyContent | null>(null);
  const [termsConditions, setTermsConditions] = useState<PolicyContent | null>(null);

  useEffect(() => {
    // Load Privacy Policy
    fetch('/Privacy_Policy_Lenient_Tree.json')
      .then(res => res.json())
      .then(data => setPrivacyPolicy(data))
      .catch(err => console.error('Error loading privacy policy:', err));

    // Load Terms and Conditions
    fetch('/Terms_and_Conditions_Lenient_Tree.json')
      .then(res => res.json())
      .then(data => setTermsConditions(data))
      .catch(err => console.error('Error loading terms and conditions:', err));
  }, []);

  const scrollToTimeline = () => {
    const guidelinesElement = document.getElementById('guidelines');
    if (guidelinesElement) {
      guidelinesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrivacyClick = () => {
    setIsPrivacyModalOpen(true);
  };

  const handleTermsClick = () => {
    setIsTermsModalOpen(true);
  };

  return (
    <section className={[styles.container, className].join(" ")}>
      <div className={styles.container2}>
        <div className={styles.item}>
          <div className={styles.quickLinks}>Quick Links</div>
        </div>
        <div className={styles.list}>
          <div className={styles.item}>
            <div className={styles.component5} onClick={scrollToTimeline} style={{ cursor: 'pointer' }}>
              <div className={styles.text}>Timeline</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.component5} onClick={handlePrivacyClick} style={{ cursor: 'pointer' }}>
              <div className={styles.text}>Privacy Policy</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.component5} onClick={handleTermsClick} style={{ cursor: 'pointer' }}>
              <div className={styles.text}>Terms and Conditions</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container5}>
        <div className={styles.item}>
          <div className={styles.quickLinks}>Follow Us</div>
        </div>
        <div className={styles.container6}>
          <a
            className={styles.socials}
            href="https://x.com/lenienttree"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Lenient Tree on Instagram"
          >
            <Image
              className={styles.maskGroupIcon}
              width={28}
              height={28}
              sizes="100vw"
              alt=""
              src="/Mask-group1@2x.png"
            />
          </a>
          <a
            className={styles.socials}
            href="https://www.instagram.com/lenient_tree?igsh=ZmV4ajVlNGhhNW52"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Lenient Tree on X"
          >
            <Image
              className={styles.maskGroupIcon}
              width={28}
              height={28}
              sizes="100vw"
              alt=""
              src="/Mask-group@2x.png"
            />
          </a>
          <a
            className={styles.socials}
            href="https://www.linkedin.com/company/lenient-tree/"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Lenient Tree on LinkedIn"
          >
            <span className={styles.in}>in</span>
          </a>
        </div>
      </div>

      {/* Policy Modals */}
      {privacyPolicy && (
        <PolicyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
          title={privacyPolicy.title}
          content={privacyPolicy.content}
        />
      )}
      {termsConditions && (
        <PolicyModal
          isOpen={isTermsModalOpen}
          onClose={() => setIsTermsModalOpen(false)}
          title={termsConditions.title}
          content={termsConditions.content}
        />
      )}
    </section>
  );
};

export default Container;
