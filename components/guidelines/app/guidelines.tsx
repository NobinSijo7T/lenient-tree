"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./guidelines.module.css";

const pointerTrack = [
  [40, 225],
  [60, 249.8],
  [80, 265],
  [100, 275.2],
  [120, 281.5],
  [140, 284.5],
  [160, 284.5],
  [180, 281.2],
  [200, 274.8],
  [220, 264.8],
  [240, 249],
  [260, 224],
  [280, 160],
  [300, 103],
  [320, 60.5],
  [340, 41.2],
  [360, 28.8],
  [380, 20.8],
  [400, 16.2],
  [420, 14.8],
  [440, 16.2],
  [460, 20.8],
  [480, 29.2],
  [500, 41.8],
  [520, 61],
  [540, 109.5],
  [560, 161.2],
  [580, 225],
  [600, 249.8],
  [620, 265],
  [640, 275.2],
  [660, 281.5],
  [680, 284.5],
  [700, 284.5],
  [720, 281.2],
  [740, 274.8],
  [760, 264.8],
  [780, 249],
  [800, 224],
  [820, 160],
  [840, 103],
  [860, 60.5],
  [880, 41.2],
  [900, 28.8],
  [920, 20.8],
  [940, 16.2],
  [960, 14.8],
  [980, 16.2],
  [1000, 20.8],
  [1020, 29.2],
  [1040, 41.8],
  [1060, 61],
] as const;

const pointerEndTrack = [
  [40, 252],
  [60, 270],
  [80, 282.5],
  [100, 291.5],
  [120, 297],
  [140, 299.5],
  [160, 299.5],
  [180, 296.5],
  [200, 291],
  [220, 282.5],
  [240, 269.5],
  [260, 251.5],
  [280, 224.5],
  [300, 147],
  [320, 83.5],
  [340, 60],
  [360, 45.5],
  [380, 36.5],
  [400, 31.5],
  [420, 29.5],
  [440, 31.5],
  [460, 36.5],
  [480, 46],
  [500, 60.5],
  [520, 84],
  [540, 159],
  [560, 225.5],
  [580, 252],
  [600, 270],
  [620, 282.5],
  [640, 291.5],
  [660, 297],
  [680, 299.5],
  [700, 299.5],
  [720, 296.5],
  [740, 291],
  [760, 282.5],
  [780, 269.5],
  [800, 251.5],
  [820, 224.5],
  [840, 147],
  [860, 83.5],
  [880, 60],
  [900, 45.5],
  [920, 36.5],
  [940, 31.5],
  [960, 29.5],
  [980, 31.5],
  [1000, 36.5],
  [1020, 46],
  [1040, 60.5],
  [1060, 84],
] as const;

const pointerEndBias = 0.68;
const pointerYOffset = 0;

const getPointerXAtY = (
  track: readonly (readonly [number, number])[],
  targetY: number,
) => {
  if (targetY <= track[0][0]) {
    return track[0][1];
  }

  for (let i = 1; i < track.length; i += 1) {
    const [currentY, currentX] = track[i];
    const [previousY, previousX] = track[i - 1];

    if (targetY <= currentY) {
      const progress = (targetY - previousY) / (currentY - previousY);
      return previousX + (currentX - previousX) * progress;
    }
  }

  return track[track.length - 1][1];
};

const Guidelines: NextPage = () => {
  const [glowProgress, setGlowProgress] = useState(0);
  const [pointerPosition, setPointerPosition] = useState({ x: 225, y: 40 });
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

      if (rect.height > 0) {
        const revealEndY = Math.min(
          Math.max(clampedProgress * rect.height, pointerTrack[0][0]),
          pointerTrack[pointerTrack.length - 1][0],
        );
        const pointerY = Math.min(
          Math.max(revealEndY + pointerYOffset, pointerTrack[0][0]),
          pointerTrack[pointerTrack.length - 1][0],
        );
        const centerX = getPointerXAtY(pointerTrack, revealEndY);
        const endX = getPointerXAtY(pointerEndTrack, revealEndY);

        setPointerPosition({
          x: centerX + (endX - centerX) * pointerEndBias,
          y: pointerY,
        });
      }
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
          <div
            className={styles.timelinePointer}
            style={{ left: `${pointerPosition.x}px`, top: `${pointerPosition.y}px` }}
            aria-hidden="true"
          >
            <span className={styles.timelinePointerLabel}>LT</span>
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
            <h2 className={styles.teamCollaboration}> Talent Identification & Skill Evaluation</h2>
            <div className={styles.workEffectivelyAs}>
             Evaluating entrepreneurial mindset, technical capabilities, and growth potential
            </div>
          </div>
          <div className={styles.teamCollaborationParent}>
            <h2 className={styles.teamCollaboration}>Real-World Project Building</h2>
            <div className={styles.workEffectivelyAs}>
              Hands-on MVP development, product design, and implementation.
            </div>
          </div>
          <div className={styles.teamCollaborationParent}>
            <h2 className={styles.teamCollaboration}> Deployment & Professional Execution</h2>
            <div className={styles.workEffectivelyAs}>
              Production deployment, presentation, collaboration, and startup-level execution.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Guidelines;
