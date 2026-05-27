"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PageLoader.module.css';

// Smooth custom cubic-bezier curves
const smoothEase = [0.25, 0.1, 0.25, 1] as const;       // standard ease
const silkEase   = [0.4,  0.0, 0.2, 1] as const;        // material design standard
const breatheEase= [0.45, 0.05, 0.55, 0.95] as const;   // gentle sine-like

type Particle = {
  x: number;
  y: number;
  targetY: number;
  duration: number;
  delay: number;
};

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2600);

    document.body.style.overflow = 'hidden';

    const width  = window.innerWidth;
    const height = window.innerHeight;

    setParticles(
      Array.from({ length: 14 }, () => ({
        x:        Math.random() * width,
        y:        Math.random() * height,
        targetY:  Math.random() * height,
        duration: Math.random() * 4 + 3,
        delay:    Math.random() * 2.5,
      })),
    );

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={styles.loaderContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: silkEase }}
        >
          {/* Subtle animated background radial */}
          <motion.div
            className={styles.gradientBg}
            animate={{
              background: [
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
                'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: breatheEase,
            }}
          />

          {/* Main content */}
          <div className={styles.content}>

            {/* ── Logo centred ── */}
            <motion.div
              className={styles.logoWrapper}
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              transition={{ duration: 0.9, ease: silkEase, delay: 0.1 }}
            >
              {/* Soft pulse ring */}
              <motion.div
                className={styles.pulseRing}
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.12, 0.5] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: breatheEase,
                }}
              />

              <Image
                src="/white.png"
                alt="Lenient Tree logo"
                width={160}
                height={80}
                className={styles.logoImage}
                priority
              />
            </motion.div>

            {/* ── Loading bar ── */}
            <motion.div
              className={styles.loadingBarContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: smoothEase }}
            >
              <motion.div
                className={styles.loadingBar}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 2.4,
                  ease: [0.4, 0, 0.6, 1],   // smooth accelerate-decelerate
                  delay: 0.4,
                }}
              />
            </motion.div>

            {/* ── Loading text + dots ── */}
            <motion.div
              className={styles.loadingTextContainer}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.55, ease: silkEase }}
            >
              <span className={styles.loadingText}>Loading</span>
              <div className={styles.dotsContainer}>
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={i}
                    className={styles.dot}
                    animate={{
                      opacity: [0.2, 0.9, 0.2],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      delay: i * 0.22,
                      ease: breatheEase,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Particles ── */}
          <div className={styles.particles}>
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                initial={{ x: particle.x, y: particle.y, opacity: 0 }}
                animate={{
                  y: [null, particle.targetY],
                  opacity: [0, 0.45, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],  // smooth organic float
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
