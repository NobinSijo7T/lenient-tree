"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../app/software.module.css";

export default function HeroPills() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const tick = () => {
      setScrollY(scrollRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Each pill gets a different parallax multiplier for depth effect
  const p = (factor: number) => ({
    transform: `translateY(${scrollY * factor}px)`,
  });

  return (
    <div className={styles.stacksprintHackathonParent}>
      <div className={styles.heroContentContainer}>
        <div className={styles.stacksprintHackathon}>
          <span className={styles.heroTitleLine}>FutureStack AI</span>
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
              <button className={styles.scrollDownBtn}>
                <span className={styles.scrollDownText}>Scroll down</span>
                <Image
                  className={styles.scrollDownIcon}
                  width={14}
                  height={14}
                  alt="scroll"
                  src="/Union1.svg"
                />
              </button>
            </div>

          </div>
        </section>
      </div>

      {/* Large pills — React.js, Express.js, Mongo DB, Node.js */}
      <div className={`${styles.r} ${styles.pillFloat1}`} style={p(-0.08)}>
        <h2 className={styles.reactjs}>React.js</h2>
      </div>
      <div className={`${styles.e} ${styles.pillFloat2}`} style={p(-0.12)}>
        <h2 className={styles.expressjs}>express.js</h2>
      </div>
      <div className={`${styles.m} ${styles.pillFloat3}`} style={p(-0.06)}>
        <h2 className={styles.mongoDb}>Mongo DB</h2>
      </div>
      <div className={`${styles.n} ${styles.pillFloat1}`} style={p(-0.10)}>
        <h2 className={styles.nodejs}>Node.js</h2>
      </div>


      {/* Small pills — HTML, Tailwind, JavaScript, Python, CSS */}
      <div className={`${styles.html} ${styles.pillFloat4}`} style={p(-0.14)}>
        <h3 className={styles.javascript}>HTML</h3>
      </div>
      <div className={`${styles.tailwind} ${styles.pillFloat5}`} style={p(-0.10)}>
        <h3 className={styles.tailwind2}>tailwind</h3>
      </div>
      <div className={`${styles.js} ${styles.pillFloat2}`} style={p(-0.16)}>
        <h3 className={styles.javascript}>javascript</h3>
      </div>
      <div className={`${styles.python} ${styles.pillFloat1}`} style={p(-0.09)}>
        <h3 className={styles.python2}>python</h3>
      </div>
      <div className={`${styles.css} ${styles.pillFloat3}`} style={p(-0.13)}>
        <h3 className={styles.css2}>css</h3>
      </div>
    </div>
  );
}
