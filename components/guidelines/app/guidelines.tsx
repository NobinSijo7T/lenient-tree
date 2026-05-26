"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./guidelines.module.css";

const Guidelines: NextPage = () => {
  const [glowProgress, setGlowProgress] = useState(0);
  const pathFrameRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const updateGlowProgress = () => {
      const pathFrame = pathFrameRef.current;

      if (!pathFrame) {
        return;
      }

      const rect = pathFrame.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const startLine = viewportHeight * 0.78;
      const endLine = viewportHeight * 0.22;
      const travelDistance = rect.height + startLine - endLine;
      const nextProgress =
        travelDistance <= 0
          ? 0
          : (startLine - rect.top) / travelDistance;
      const clampedProgress = Math.min(Math.max(nextProgress, 0), 1);

      setGlowProgress(clampedProgress);
    };

    const scheduleUpdate = () => {
      if (animationFrame.current !== null) {
        return;
      }

      animationFrame.current = window.requestAnimationFrame(() => {
        animationFrame.current = null;
        updateGlowProgress();
      });
    };

    updateGlowProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const glowProgressPercent = Math.round(glowProgress * 1000) / 10;
  const pathFrameStyle = {
    "--path-glow-progress": `${glowProgressPercent}%`,
  } as CSSProperties;

  return (
    <div className={styles.guidelines}>
      <h1 className={styles.guidelines2}>Guidelines</h1>
      <main className={styles.frameParent}>
        <div
          ref={pathFrameRef}
          className={styles.pathFrame}
          style={pathFrameStyle}
        >
          <Image
            className={styles.frameChild}
            loading="lazy"
            width={300}
            height={1110}
            sizes="100vw"
            alt=""
            src="/Frame-1731@2x.png"
          />
          <div
            className={`${styles.glowRevealLayer} ${styles.glowAura}`}
            aria-hidden="true"
          >
            <div className={styles.glowPathMask}>
              <Image
                className={styles.glowPath}
                width={300}
                height={1110}
                sizes="100vw"
                alt=""
                src="/Frame-1731-gradient-path.png"
              />
            </div>
          </div>
          <div
            className={`${styles.glowRevealLayer} ${styles.glowCore}`}
            aria-hidden="true"
          >
            <div className={styles.glowPathMask}>
              <Image
                className={styles.glowPath}
                width={300}
                height={1110}
                sizes="100vw"
                alt=""
                src="/Frame-1731-gradient-path.png"
              />
            </div>
          </div>
          <div
            className={`${styles.glowRevealLayer} ${styles.glowHotline}`}
            aria-hidden="true"
          >
            <div className={styles.glowPathMask}>
              <Image
                className={styles.glowPath}
                width={300}
                height={1110}
                sizes="100vw"
                alt=""
                src="/Frame-1731-glow-path.png"
              />
            </div>
          </div>
          {/* Timeline circle date overlays */}
          <div className={styles.circleOverlay1}>
            <span className={styles.monthText}>June</span>
            <span className={styles.daysText}>10<sup>th</sup> – 16<sup>th</sup></span>
          </div>
          <div className={styles.circleOverlay2}>
            <span className={styles.monthText}>June</span>
            <span className={styles.daysText}>17<sup>th</sup> – 23<sup>rd</sup></span>
          </div>
          <div className={styles.circleOverlay3}>
            <span className={styles.monthText}>June</span>
            <span className={styles.daysText}>24<sup>th</sup> – 30<sup>th</sup></span>
          </div>
          <div className={styles.circleOverlay4}>
            <span className={styles.monthText}>July</span>
            <span className={styles.daysText}>1<sup>st</sup> – 7<sup>th</sup></span>
          </div>
        </div>
        <section className={styles.frameGroup}>
          <div className={styles.teamCollaborationParent}>
            <h2 className={styles.teamCollaboration}>Team Collaboration</h2>
            <div className={styles.workEffectivelyAs}>
              Work effectively as a team, ensuring equal contribution and clear
              communication throughout.
            </div>
          </div>
          <div className={styles.teamCollaborationParent}>
            <h2 className={styles.teamCollaboration}>Innovation First</h2>
            <div className={styles.workEffectivelyAs}>
              Build original solutions that solve real problems creatively, not
              just incremental improvements.
            </div>
          </div>
          <div className={styles.teamCollaborationParent}>
            <h2 className={styles.teamCollaboration}>Time Discipline</h2>
            <div className={styles.workEffectivelyAs}>
              Complete your project within the given timeframe—no late
              submissions or post-deadline edits.
            </div>
          </div>
          <div className={styles.functionalPrototypeParent}>
            <h2 className={styles.teamCollaboration}>Functional Prototype</h2>
            <div className={styles.workEffectivelyAs}>
              Deliver a working demo that clearly demonstrates your idea and its
              core functionality.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Guidelines;
