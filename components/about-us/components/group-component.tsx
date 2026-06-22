"use client";

import type { NextPage } from "next";
import Image from "next/image";
import FrameComponent from "./frame-component";
import styles from "./group-component.module.css";
import { useEffect, useRef, useState } from "react";

export type GroupComponentType = {
  className?: string;
};

const GroupComponent: NextPage<GroupComponentType> = ({ className = "" }) => {
  const fullText = "FutureStack AI Internship is a 3-week intensive program by Lenient Tree. Build full-stack AI applications using React, Node.js, Databases, Cloud, and Generative AI.";
  
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState(fullText);
  const [isTypingComplete, setIsTypingComplete] = useState(true);
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setMounted(true);
    setDisplayedText("");
    setIsTypingComplete(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let index = 0;
          setDisplayedText("");
          setIsTypingComplete(false);
          
          const interval = setInterval(() => {
            if (index < fullText.length) {
              setDisplayedText((prev) => prev + fullText.charAt(index));
              index++;
            } else {
              clearInterval(interval);
              setIsTypingComplete(true);
            }
          }, 18); // 18ms per character typing speed
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  return (
    <main className={[styles.bgParent, className].join(" ")}>
      <Image
        className={styles.bgIcon}
        width={1440}
        height={2048}
        sizes="100vw"
        alt=""
        src="/bg@2x.png"
      />
      <Image
        className={styles.frameChild}
        width={982}
        height={982}
        sizes="100vw"
        alt=""
        src="/Group-161@2x.png"
      />
      <Image
        className={styles.frameItem}
        loading="lazy"
        width={1462.5}
        height={1462.5}
        sizes="100vw"
        alt=""
        src="/Group-151@2x.png"
      />
      <div className={styles.dot} />
      <h1 ref={containerRef} className={styles.stacksprintIsAContainer}>
        <span className={styles.stacksprintIsAContainer2}>
          <span className={styles.stacksprintIsA}>
            {displayedText}
            {!isTypingComplete && mounted && <span className={styles.cursor}>|</span>}
            <br />
          </span>
        </span>
      </h1>
      <Image
        className={styles.robotIcon}
        loading="lazy"
        width={583}
        height={903.5}
        sizes="100vw"
        alt=""
        src="/robot@2x.png"
      />
      <h3 className={styles.about}>About</h3>
      <section className={styles.box}>
        <FrameComponent
          hoursOfInnovation={`Stipend-Based
Internship
Opportunities`}
          workshopsMentorship={`1: 1
MENTORSHIP`}
        />
        <FrameComponent
          frameDivTop="202px"
          hoursOfInnovation={`Production-Grade
MVP
Development`}
          workshopsMentorship={`& much more...`}
          workshopsMentorshipTop="60.5px"
          workshopsMentorshipMargin="0"
          workshopsMentorshipFontWeight="400"
        />
      </section>
    </main>
  );
};

export default GroupComponent;
