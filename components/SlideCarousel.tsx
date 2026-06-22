"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./SlideCarousel.module.css";

const IMAGES = [
  { src: "/carousal/1.png",  alt: "Journey photo 1" },
  { src: "/carousal/2.png",  alt: "Journey photo 2" },
  { src: "/carousal/3.png",  alt: "Journey photo 3" },
  { src: "/carousal/4.jpeg", alt: "Journey photo 4" },
];

const AUTOPLAY_INTERVAL = 3500; // ms between slides

export default function SlideCarousel() {
  const total        = IMAGES.length;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>("");
  const isPaused     = useRef(false);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── lightbox handlers ─────────────────────────────────── */
  const openLightbox = useCallback((imageSrc: string) => {
    setLightboxImage(imageSrc);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setLightboxImage("");
    document.body.style.overflow = 'unset';
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [lightboxOpen, closeLightbox]);

  /* ── transition helper ─────────────────────────────────── */
  const goTo = useCallback(
    (nextIdx: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(nextIdx);
        setAnimating(false);
      }, 480); // matches CSS transition duration
    },
    [animating]
  );

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, "right");
  }, [current, total, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % total, "left");
  }, [current, total, goTo]);

  /* ── auto-play ─────────────────────────────────────────── */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPaused.current) {
        setCurrent((c) => {
          const next = (c + 1) % total;
          setDirection("left");
          setAnimating(true);
          setTimeout(() => {
            setCurrent(next);
            setAnimating(false);
          }, 480);
          return c; // hold old value; setTimeout does the real update
        });
      }
    }, AUTOPLAY_INTERVAL);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  /* ── index helpers ─────────────────────────────────────── */
  const getIdx = (offset: number) => (current + offset + total) % total;

  /* ── position classes based on animation state ─────────── */
  const centerClass =
    animating
      ? `${styles.card} ${styles.cardCenter} ${
          direction === "left" ? styles.slideOutLeft : styles.slideOutRight
        }`
      : `${styles.card} ${styles.cardCenter} ${styles.slideIn}`;

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      {/* Prev */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={prev}
        aria-label="Previous"
      >
        &#8249;
      </button>

      <div className={styles.track}>
        {/* Left card */}
        <div className={`${styles.card} ${styles.cardSide} ${styles.cardLeft}`}>
          <div className={styles.imgWrap}>
            <Image
              src={IMAGES[getIdx(-1)].src}
              alt={IMAGES[getIdx(-1)].alt}
              fill
              sizes="28vw"
              className={styles.img}
            />
          </div>
        </div>

        {/* Center card */}
        <div className={centerClass} onClick={() => openLightbox(IMAGES[current].src)} style={{ cursor: 'pointer' }}>
          <div className={styles.imgWrap}>
            <Image
              src={IMAGES[current].src}
              alt={IMAGES[current].alt}
              fill
              sizes="40vw"
              className={styles.img}
              priority
            />
          </div>
        </div>

        {/* Right card */}
        <div className={`${styles.card} ${styles.cardSide} ${styles.cardRight}`}>
          <div className={styles.imgWrap}>
            <Image
              src={IMAGES[getIdx(1)].src}
              alt={IMAGES[getIdx(1)].alt}
              fill
              sizes="28vw"
              className={styles.img}
            />
          </div>
        </div>
      </div>

      {/* Next */}
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={next}
        aria-label="Next"
      >
        &#8250;
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {IMAGES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i, i > current ? "left" : "right")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close lightbox">
            ×
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage}
              alt="Full size image"
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
