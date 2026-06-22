"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import Image from "next/image";
import styles from "../app/software.module.css";

function HeroPills() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const tickingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);

    // Disable parallax on mobile for better performance
    if (mobile) {
      return;
    }

    const onScroll = () => {
      scrollRef.current = window.scrollY;
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          setScrollY(scrollRef.current);
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Memoize parallax calculation
  const getParallaxStyle = useCallback((factor: number) => {
    if (isMobile) return {}; // No parallax on mobile
    return {
      transform: `translateY(${scrollY * factor}px)`,
    };
  }, [scrollY, isMobile]);

  return (
    <div className={styles.stacksprintHackathonParent}>
      <div className={styles.heroContentContainer}>
        <div className={styles.stacksprintHackathon}>
          <span className={styles.heroTitleLine}>Future Stack AI</span>
          <br />
          <span className={`${styles.heroTitleLine} ${styles.heroTitleSecondary}`}>
            Internship
          </span>
        </div>

        <section className={styles.heroBottomBar}>
          <div className={styles.frameInner} />
          <div className={styles.hoursParent}>
            <div className={styles.barLeft}>
            </div>
            <div className={styles.barCenter}>
              <button className={styles.scrollDownBtn} aria-label="Scroll down">
                <span className={styles.scrollDownText}>Scroll down</span>
                <Image
                  className={styles.scrollDownIcon}
                  width={14}
                  height={14}
                  alt=""
                  src="/Union1.svg"
                />
              </button>
            </div>

          </div>
        </section>
      </div>

      {/* Small pills — HTML, Tailwind, JavaScript, Python, CSS */}
      <div className={`${styles.html} ${styles.pillFloat5}`} style={getParallaxStyle(-0.14)}>
        <h3 className={styles.javascript}>HTML</h3>
      </div>
      <div className={`${styles.tailwind} ${styles.pillFloat1}`} style={getParallaxStyle(-0.10)}>
        <h3 className={styles.tailwind2}>Tailwind</h3>
      </div>
      <div className={`${styles.js} ${styles.pillFloat2}`} style={getParallaxStyle(-0.16)}>
        <h3 className={styles.javascript}>JavaScript</h3>
      </div>
      <div className={`${styles.python} ${styles.pillFloat3}`} style={getParallaxStyle(-0.09)}>
        <h3 className={styles.python2}>Python</h3>
      </div>
      <div className={`${styles.css} ${styles.pillFloat4}`} style={getParallaxStyle(-0.13)}>
        <h3 className={styles.css2}>CSS</h3>
      </div>
    </div>
  );
}

export default memo(HeroPills);
