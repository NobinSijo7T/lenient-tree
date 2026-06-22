"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./guidelines.module.css";

const Guidelines: NextPage = () => {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [pathLength, setPathLength] = useState<number>(0);
  const [pathData, setPathData] = useState<string>('M 150,0 L 150,1800');
  const [svgWidth, setSvgWidth] = useState<number>(300);
  const animationFrame = useRef<number | null>(null);
  const weekRefs = useRef<(HTMLDivElement | null)[]>([]);
  const weekSegmentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const scrollToWeek = (weekNumber: number) => {
    const weekElement = weekRefs.current[weekNumber - 1];
    if (weekElement) {
      weekElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Build SVG path dynamically from actual DOM positions
  const computePath = () => {
    if (!sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const totalHeight = sectionRect.height;
    if (totalHeight === 0) return;

    // Measure column width from the first weekPathSegment
    const colEl = weekSegmentRefs.current[0];
    const colWidth = colEl ? colEl.getBoundingClientRect().width : 300;
    setSvgWidth(colWidth);

    const viewBoxW = colWidth; // viewBox matches DOM width 1:1 on X
    const viewBoxH = 1800;
    const cx = viewBoxW / 2;   // center X of the path column
    const scaleY = viewBoxH / totalHeight;
    const sectionAbsTop = sectionRect.top + window.scrollY;

    // Circle radius in DOM px
    const circleEl = circleElRefs.current[0];
    const rDom = circleEl ? circleEl.getBoundingClientRect().width / 2 : colWidth * 0.3;
    const rxArc = rDom;              // X is 1:1
    const ryArc = rDom * scaleY;     // Y is scaled

    const parts: string[] = [`M ${cx.toFixed(1)},0`];
    weekSegmentRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const domCY = r.top + window.scrollY - sectionAbsTop + r.height / 2;
      const cy = domCY * scaleY;
      const sweep = i % 2 === 0 ? 1 : 0; // 1=right (W1,W3), 0=left (W2,W4)
      parts.push(`L ${cx.toFixed(1)},${(cy - ryArc).toFixed(1)}`);
      parts.push(`A ${rxArc.toFixed(1)},${ryArc.toFixed(1)} 0 0 ${sweep} ${cx.toFixed(1)},${(cy + ryArc).toFixed(1)}`);
    });
    parts.push(`L ${cx.toFixed(1)},1800`);
    setPathData(parts.join(' '));
  };

  useEffect(() => {
    // Compute path then measure its length
    const init = () => {
      computePath();
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    };
    const timer = setTimeout(init, 80);
    window.addEventListener('resize', init);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', init);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-measure path length after pathData updates cause a re-render
  useEffect(() => {
    if (pathRef.current && pathData !== 'M 150,0 L 150,1800') {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathData]);

  useEffect(() => {
    const updateActiveWeek = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Calculate scroll progress (0 to 1) based on section position
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const scrollStart = viewportHeight * 0.8; // Start when section is 80% from top
      const scrollEnd = -sectionHeight + viewportHeight * 0.2; // End when section is 20% from top
      
      const progress = Math.max(0, Math.min(1, (scrollStart - sectionTop) / (scrollStart - scrollEnd)));
      setScrollProgress(progress);

      // Update active week based on scroll position
      const viewportCenter = viewportHeight / 2;
      weekRefs.current.forEach((weekEl, index) => {
        if (weekEl) {
          const weekRect = weekEl.getBoundingClientRect();
          if (weekRect.top < viewportCenter && weekRect.bottom > viewportCenter) {
            setActiveWeek(index + 1);
          }
        }
      });
    };

    const scheduleUpdate = () => {
      if (animationFrame.current !== null) {
        return;
      }

      animationFrame.current = window.requestAnimationFrame(() => {
        animationFrame.current = null;
        updateActiveWeek();
      });
    };

    updateActiveWeek();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [pathLength]);

  // Get the position of the moving circle along the path
  const getPointAtProgress = (progress: number) => {
    if (!pathRef.current || pathLength === 0) {
      return { x: svgWidth / 2, y: 0 };
    }
    
    const point = pathRef.current.getPointAtLength(progress * pathLength);
    return { x: point.x, y: point.y };
  };

  const circlePosition = getPointAtProgress(scrollProgress);

  return (
    <div className={styles.guidelines}>
      <h1 className={styles.guidelines2}>Timeline</h1>
      <main className={styles.frameParent}>

        <section className={styles.frameGroup} ref={sectionRef}>
          {/* Master continuous path overlay */}
          <svg 
            ref={svgRef}
            className={styles.masterPath}
            viewBox={`0 0 ${svgWidth} 1800`}
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: `${svgWidth}px`,
              height: '100%',
              pointerEvents: 'none',
              zIndex: 5
            }}
          >
            <defs>
              <linearGradient id="masterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2df5ff" stopOpacity="0.6" />
                <stop offset="25%" stopColor="#8e52ff" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#5078ff" stopOpacity="0.5" />
                <stop offset="75%" stopColor="#3358ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2d40ff" stopOpacity="0.5" />
              </linearGradient>
              <filter id="masterGlow">
                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="strongGlow">
                <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="circleGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <mask id="progressMask">
                <rect x="0" y="0" width={svgWidth} height="1800" fill="white" opacity="0.3" />
                <rect x="0" y="0" width={svgWidth} height={scrollProgress * 1800} fill="white" />
              </mask>
            </defs>
            
            {/* Base path (dim) */}
            <path
              ref={pathRef}
              d={pathData}
              stroke="url(#masterGrad)"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              filter="url(#masterGlow)"
            />
            
            {/* Glowing path behind the moving circle */}
            <path
              d={pathData}
              stroke="url(#masterGrad)"
              strokeWidth="22"
              fill="none"
              strokeLinecap="round"
              filter="url(#strongGlow)"
              mask="url(#progressMask)"
              opacity="0.9"
            />
            
            {/* Moving circle with glow */}
            {(() => {
              const scale = Math.min(1, svgWidth / 300);
              const r1 = 33 * scale;
              const r2 = 38 * scale;
              const logoSize = Math.round(48 * scale);
              const logoHalf = logoSize / 2;
              return (
                <g transform={`translate(${circlePosition.x}, ${circlePosition.y})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r={r1}
                    fill="#3537ad"
                    stroke="rgba(196, 206, 255, 0.62)"
                    strokeWidth="2"
                    filter="url(#circleGlow)"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r={r2}
                    fill="none"
                    stroke="rgba(61, 84, 255, 0.2)"
                    strokeWidth="5"
                  />
                  {/* Logo centred inside the circle using foreignObject */}
                  <foreignObject x={-logoHalf} y={-logoHalf} width={logoSize} height={logoSize} style={{ overflow: 'visible' }}>
                    <Image
                      src="/white.png"
                      alt="LT"
                      width={logoSize}
                      height={logoSize}
                      style={{ objectFit: 'contain', display: 'block' }}
                    />
                  </foreignObject>
                </g>
              );
            })()}
          </svg>



          {/* Week 1 */}
          <div className={styles.weekSection} ref={(el) => { weekRefs.current[0] = el; }}>
            <div className={styles.weekRow}>
              <div className={styles.weekPathSegment} ref={(el) => { weekSegmentRefs.current[0] = el; }}>
                <div 
                  className={`${styles.largeWeekCircle} ${activeWeek === 1 ? styles.active : ''}`}
                  onClick={() => scrollToWeek(1)}
                  ref={(el) => { circleElRefs.current[0] = el; }}
                >
                  <div className={styles.circleContent}>
                    <div className={styles.largeWeekNumber}>1</div>
                    <div className={styles.largeWeekLabel}>WEEK</div>
                    <div className={styles.largeWeekDays}>Day 1 – 4</div>
                  </div>
                  {activeWeek === 1 && <div className={styles.activeRing} />}
                </div>
              </div>
              <div className={styles.weekContent}>
                <div className={styles.weekHeader}>
                  <h2 className={styles.weekTitle}>Week 1: Frontend Development</h2>
                </div>
                <div className={styles.bentoGrid}>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 1</h3>
                    <h4 className={styles.bentoTitle}>Web Basics & HTML5</h4>
                    <ul className={styles.bentoList}>
                      <li>Introduction to the Web</li>
                      <li>HTML5 Fundamentals</li>
                      <li>Semantic HTML</li>
                      <li>Static Projects</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 2</h3>
                    <h4 className={styles.bentoTitle}>CSS & Responsive Design</h4>
                    <ul className={styles.bentoList}>
                      <li>CSS Fundamentals</li>
                      <li>Flexbox & Grid</li>
                      <li>Responsive Design</li>
                      <li>Animations</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 3</h3>
                    <h4 className={styles.bentoTitle}>JavaScript Fundamentals</h4>
                    <ul className={styles.bentoList}>
                      <li>Variables & Functions</li>
                      <li>DOM Manipulation</li>
                      <li>Events & ES6</li>
                      <li>Interactive Apps</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 4</h3>
                    <h4 className={styles.bentoTitle}>React Basics</h4>
                    <ul className={styles.bentoList}>
                      <li>JSX & Components</li>
                      <li>Props & State</li>
                      <li>Event Handling</li>
                      <li>Reusable UI</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Week 2 */}
          <div className={styles.weekSection} ref={(el) => { weekRefs.current[1] = el; }}>
            <div className={styles.weekRow}>
              <div className={styles.weekPathSegment} ref={(el) => { weekSegmentRefs.current[1] = el; }}>
                <div 
                  className={`${styles.largeWeekCircle} ${activeWeek === 2 ? styles.active : ''}`}
                  onClick={() => scrollToWeek(2)}
                  ref={(el) => { circleElRefs.current[1] = el; }}
                >
                  <div className={styles.circleContent}>
                    <div className={styles.largeWeekNumber}>2</div>
                    <div className={styles.largeWeekLabel}>WEEK</div>
                    <div className={styles.largeWeekDays}>Day 5 – 8</div>
                  </div>
                  {activeWeek === 2 && <div className={styles.activeRing} />}
                </div>
              </div>
              <div className={styles.weekContent}>
                <div className={styles.weekHeader}>
                  <h2 className={styles.weekTitle}>Week 2: Full Stack Development</h2>
                </div>
                <div className={styles.bentoGrid}>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 5</h3>
                    <h4 className={styles.bentoTitle}>Advanced React</h4>
                    <ul className={styles.bentoList}>
                      <li>React Hooks</li>
                      <li>React Router</li>
                      <li>API Integration</li>
                      <li>Form Handling</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 6</h3>
                    <h4 className={styles.bentoTitle}>Node.js & Express</h4>
                    <ul className={styles.bentoList}>
                      <li>Node.js Fundamentals</li>
                      <li>Express.js</li>
                      <li>REST APIs</li>
                      <li>Middleware</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 7</h3>
                    <h4 className={styles.bentoTitle}>Database & PostgreSQL</h4>
                    <ul className={styles.bentoList}>
                      <li>Database Design</li>
                      <li>SQL Basics</li>
                      <li>PostgreSQL</li>
                      <li>CRUD Operations</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 8</h3>
                    <h4 className={styles.bentoTitle}>Authentication</h4>
                    <ul className={styles.bentoList}>
                      <li>Auth & Authorization</li>
                      <li>JWT</li>
                      <li>Password Hashing</li>
                      <li>Security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Week 3 */}
          <div className={styles.weekSection} ref={(el) => { weekRefs.current[2] = el; }}>
            <div className={styles.weekRow}>
              <div className={styles.weekPathSegment} ref={(el) => { weekSegmentRefs.current[2] = el; }}>
                <div 
                  className={`${styles.largeWeekCircle} ${activeWeek === 3 ? styles.active : ''}`}
                  onClick={() => scrollToWeek(3)}
                  ref={(el) => { circleElRefs.current[2] = el; }}
                >
                  <div className={styles.circleContent}>
                    <div className={styles.largeWeekNumber}>3</div>
                    <div className={styles.largeWeekLabel}>WEEK</div>
                    <div className={styles.largeWeekDays}>Day 9 – 12</div>
                  </div>
                  {activeWeek === 3 && <div className={styles.activeRing} />}
                </div>
              </div>
              <div className={styles.weekContent}>
                <div className={styles.weekHeader}>
                  <h2 className={styles.weekTitle}>Week 3: Cloud & Production</h2>
                </div>
                <div className={styles.bentoGrid}>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 9</h3>
                    <h4 className={styles.bentoTitle}>Supabase</h4>
                    <ul className={styles.bentoList}>
                      <li>Supabase Intro</li>
                      <li>Database Management</li>
                      <li>Authentication</li>
                      <li>Realtime Features</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 10</h3>
                    <h4 className={styles.bentoTitle}>Full Stack Integration</h4>
                    <ul className={styles.bentoList}>
                      <li>Frontend-Backend</li>
                      <li>API Integration</li>
                      <li>Auth Flow</li>
                      <li>Error Handling</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 11</h3>
                    <h4 className={styles.bentoTitle}>Optimization</h4>
                    <ul className={styles.bentoList}>
                      <li>Performance</li>
                      <li>Code Splitting</li>
                      <li>Lazy Loading</li>
                      <li>SEO Basics</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 12</h3>
                    <h4 className={styles.bentoTitle}>AWS Deployment</h4>
                    <ul className={styles.bentoList}>
                      <li>AWS Basics</li>
                      <li>Deployment</li>
                      <li>Domain & SSL</li>
                      <li>CI/CD</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Week 4 */}
          <div className={styles.weekSection} ref={(el) => { weekRefs.current[3] = el; }}>
            <div className={styles.weekRow}>
              <div className={styles.weekPathSegment} ref={(el) => { weekSegmentRefs.current[3] = el; }}>
                <div 
                  className={`${styles.largeWeekCircle} ${activeWeek === 4 ? styles.active : ''}`}
                  onClick={() => scrollToWeek(4)}
                  ref={(el) => { circleElRefs.current[3] = el; }}
                >
                  <div className={styles.circleContent}>
                    <div className={styles.largeWeekNumber}>4</div>
                    <div className={styles.largeWeekLabel}>WEEK</div>
                    <div className={styles.largeWeekDays}>Day 13 – 16</div>
                  </div>
                  {activeWeek === 4 && <div className={styles.activeRing} />}
                </div>
              </div>
              <div className={styles.weekContent}>
                <div className={styles.weekHeader}>
                  <h2 className={styles.weekTitle}>Week 4: AI Development</h2>
                </div>
                <div className={styles.bentoGrid}>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 13</h3>
                    <h4 className={styles.bentoTitle}>AI & LLMs</h4>
                    <ul className={styles.bentoList}>
                      <li>AI Basics</li>
                      <li>Large Language Models</li>
                      <li>Prompt Engineering</li>
                      <li>OpenAI APIs</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 14</h3>
                    <h4 className={styles.bentoTitle}>AI Chatbots</h4>
                    <ul className={styles.bentoList}>
                      <li>Chatbot Architecture</li>
                      <li>Conversation Design</li>
                      <li>LLM Integration</li>
                      <li>Context Management</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 15</h3>
                    <h4 className={styles.bentoTitle}>RAG & Vectors</h4>
                    <ul className={styles.bentoList}>
                      <li>RAG Systems</li>
                      <li>Embeddings</li>
                      <li>Vector Databases</li>
                      <li>Semantic Search</li>
                    </ul>
                  </div>
                  <div className={styles.bentoCard}>
                    <h3 className={styles.bentoDay}>Day 16</h3>
                    <h4 className={styles.bentoTitle}>Capstone Project</h4>
                    <ul className={styles.bentoList}>
                      <li>Project Planning</li>
                      <li>Full AI App</li>
                      <li>Testing</li>
                      <li>Final Presentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Guidelines;
