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
const timelineImageWidth = 300;
const timelineImageHeight = 833;

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
          {/* SVG Path connecting 4 circles */}
          <svg 
            className={styles.timelinePath} 
            width="300" 
            height="1050" 
            viewBox="0 0 300 1050"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2df5ff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8e52ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3358ff" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2df5ff" />
                <stop offset="50%" stopColor="#8e52ff" />
                <stop offset="100%" stopColor="#3358ff" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Flowing S-curve path through all 4 week circles */}
            <path
              className={styles.basePath}
              d="M 150,40
                 C 250,50 280,90 280,155
                 C 280,220 250,260 150,270
                 C 50,280 20,320 20,385
                 C 20,450 50,490 150,500
                 C 250,510 280,550 280,615
                 C 280,680 250,720 150,730
                 C 50,740 20,780 20,845
                 C 20,910 50,950 150,1000"
              stroke="url(#pathGradient)"
              strokeWidth="22"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Animated glow overlay */}
            <path
              className={styles.glowPath}
              d="M 150,40
                 C 250,50 280,90 280,155
                 C 280,220 250,260 150,270
                 C 50,280 20,320 20,385
                 C 20,450 50,490 150,500
                 C 250,510 280,550 280,615
                 C 280,680 250,720 150,730
                 C 50,740 20,780 20,845
                 C 20,910 50,950 150,1000"
              stroke="url(#glowGradient)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />
          </svg>

          <div
            className={styles.timelinePointer}
            style={{ left: `${pointerPosition.x}px`, top: `${pointerPosition.y}px` }}
            aria-hidden="true"
          >
            <Image
              className={styles.timelinePointerLabel}
              src="/white.png"
              alt="LT"
              width={48}
              height={48}
              style={{ objectFit: "contain" }}
            />
          </div>
          {/* Timeline circle date overlays */}
          <div className={styles.circleOverlay1}>
            <span className={styles.weekNumber}>1</span>
            <span className={styles.weekLabel}>WEEK</span>
            <span className={styles.daysText}>Day 1 – 4</span>
          </div>
          <div className={styles.circleOverlay2}>
            <span className={styles.weekNumber}>2</span>
            <span className={styles.weekLabel}>WEEK</span>
            <span className={styles.daysText}>Day 5 – 8</span>
          </div>
          <div className={styles.circleOverlay3}>
            <span className={styles.weekNumber}>3</span>
            <span className={styles.weekLabel}>WEEK</span>
            <span className={styles.daysText}>Day 9 – 12</span>
          </div>
          <div className={styles.circleOverlay4}>
            <span className={styles.weekNumber}>4</span>
            <span className={styles.weekLabel}>WEEK</span>
            <span className={styles.daysText}>Day 13 – 16</span>
          </div>
        </div>
        <section className={styles.frameGroup}>
          <div className={styles.weekSection}>
            <div className={styles.weekHeader}>
              <h2 className={styles.weekTitle}>Week 1: Frontend Development</h2>
            </div>
            <div className={styles.daysList}>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 1: Web Basics, HTML5, Website Structure & Static Projects</h3>
                <ul className={styles.topicsList}>
                  <li>Introduction to the Web</li>
                  <li>HTML5 Fundamentals</li>
                  <li>Semantic HTML</li>
                  <li>Website Structure</li>
                  <li>Static Website Development</li>
                  <li>Mini HTML Project</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 2: CSS, Responsive Design & Modern UI</h3>
                <ul className={styles.topicsList}>
                  <li>CSS Fundamentals</li>
                  <li>Flexbox</li>
                  <li>CSS Grid</li>
                  <li>Responsive Design</li>
                  <li>Media Queries</li>
                  <li>Modern UI Components</li>
                  <li>Animations & Transitions</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 3: JavaScript Fundamentals & Interactive Apps</h3>
                <ul className={styles.topicsList}>
                  <li>Variables & Data Types</li>
                  <li>Functions</li>
                  <li>Arrays & Objects</li>
                  <li>DOM Manipulation</li>
                  <li>Events</li>
                  <li>ES6 Features</li>
                  <li>Interactive JavaScript Projects</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 4: React Basics, Components & UI Development</h3>
                <ul className={styles.topicsList}>
                  <li>Introduction to React</li>
                  <li>JSX</li>
                  <li>Components</li>
                  <li>Props</li>
                  <li>State</li>
                  <li>Event Handling</li>
                  <li>Building Reusable UI Components</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.weekSection}>
            <div className={styles.weekHeader}>
              <h2 className={styles.weekTitle}>Week 2: Full Stack Development</h2>
            </div>
            <div className={styles.daysList}>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 5: Advanced React, APIs & Forms</h3>
                <ul className={styles.topicsList}>
                  <li>React Hooks</li>
                  <li>useEffect</li>
                  <li>React Router</li>
                  <li>API Integration</li>
                  <li>Form Handling</li>
                  <li>Validation</li>
                  <li>State Management Basics</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 6: Node.js, Express & Backend APIs</h3>
                <ul className={styles.topicsList}>
                  <li>Node.js Fundamentals</li>
                  <li>Express.js</li>
                  <li>REST APIs</li>
                  <li>Middleware</li>
                  <li>CRUD Operations</li>
                  <li>Environment Variables</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 7: Database Design & PostgreSQL</h3>
                <ul className={styles.topicsList}>
                  <li>Relational Databases</li>
                  <li>Database Design</li>
                  <li>SQL Basics</li>
                  <li>PostgreSQL</li>
                  <li>Relationships</li>
                  <li>CRUD with SQL</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 8: Authentication & Security</h3>
                <ul className={styles.topicsList}>
                  <li>Authentication</li>
                  <li>Authorization</li>
                  <li>JWT</li>
                  <li>Password Hashing</li>
                  <li>Protected Routes</li>
                  <li>Security Best Practices</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.weekSection}>
            <div className={styles.weekHeader}>
              <h2 className={styles.weekTitle}>Week 3: Cloud & Production</h2>
            </div>
            <div className={styles.daysList}>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 9: Supabase Database & Backend Services</h3>
                <ul className={styles.topicsList}>
                  <li>Supabase Introduction</li>
                  <li>Database Management</li>
                  <li>Authentication</li>
                  <li>Storage</li>
                  <li>Realtime Features</li>
                  <li>Backend Services</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 10: Full Stack Integration</h3>
                <ul className={styles.topicsList}>
                  <li>Frontend-Backend Communication</li>
                  <li>API Integration</li>
                  <li>Authentication Flow</li>
                  <li>Error Handling</li>
                  <li>Project Integration</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 11: Production Features & Optimization</h3>
                <ul className={styles.topicsList}>
                  <li>Performance Optimization</li>
                  <li>Caching</li>
                  <li>Code Splitting</li>
                  <li>Lazy Loading</li>
                  <li>SEO Basics</li>
                  <li>Production Best Practices</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 12: AWS Deployment & Hosting</h3>
                <ul className={styles.topicsList}>
                  <li>AWS Basics</li>
                  <li>Deployment</li>
                  <li>Hosting</li>
                  <li>Domain Configuration</li>
                  <li>SSL</li>
                  <li>CI/CD Overview</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.weekSection}>
            <div className={styles.weekHeader}>
              <h2 className={styles.weekTitle}>Week 4: AI Development</h2>
            </div>
            <div className={styles.daysList}>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 13: AI, LLMs & Prompt Engineering</h3>
                <ul className={styles.topicsList}>
                  <li>Artificial Intelligence Basics</li>
                  <li>Large Language Models</li>
                  <li>Prompt Engineering</li>
                  <li>OpenAI APIs</li>
                  <li>LLM Best Practices</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 14: AI Chatbot Development</h3>
                <ul className={styles.topicsList}>
                  <li>Chatbot Architecture</li>
                  <li>Conversation Design</li>
                  <li>LLM Integration</li>
                  <li>Streaming Responses</li>
                  <li>Context Management</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 15: RAG & Vector Databases</h3>
                <ul className={styles.topicsList}>
                  <li>Retrieval-Augmented Generation</li>
                  <li>Embeddings</li>
                  <li>Vector Databases</li>
                  <li>Semantic Search</li>
                  <li>Document Retrieval</li>
                </ul>
              </div>
              <div className={styles.dayCard}>
                <h3 className={styles.dayTitle}>Day 16: AI Capstone Project Development</h3>
                <ul className={styles.topicsList}>
                  <li>Project Planning</li>
                  <li>Full AI Application</li>
                  <li>Frontend + Backend + AI Integration</li>
                  <li>Testing</li>
                  <li>Deployment</li>
                  <li>Final Presentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Guidelines;
