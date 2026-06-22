"use client";

import type { NextPage } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Nav from "../components/nav";
import HeroPills from "../components/HeroPills";
import GroupComponent from "../components/about-us/components/group-component";
import styles from "./software.module.css";

// Lazy load the AppLoader to not block initial render
const AppLoader = dynamic(() => import("../components/AppLoader"), { ssr: false });

// Lazy load heavy components that are below the fold
const Moving = dynamic(() => import("../components/moving"), { ssr: false });
const Guidelines = dynamic(() => import("../components/guidelines/app/guidelines"));
const SlideCarousel = dynamic(() => import("../components/SlideCarousel"));
const Testimonials = dynamic(() => import("../components/Testimonials"));
const Cta = dynamic(() => import("../components/cta/cta"));
const Grid = dynamic(() => import("../components/grid"));
const Container = dynamic(() => import("../components/container"));
const Lightfall = dynamic(() => import("../components/Lightfall"), { ssr: false });
const MobileBackground = dynamic(() => import("../components/MobileBackground"), { ssr: false });

/** Returns true when the viewport is mobile-sized (≤768px). Safe on SSR — starts as false. */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

const Software: NextPage = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <AppLoader />
      <div className={styles.software}>
      <Nav state="Hero" />
      <section className={styles.separatorParent}>
        <Image
          className={`${styles.separatorIcon} ${styles.desktopOnly}`}
          width={1440}
          height={1105}
          sizes="100vw"
          alt="Hero background"
          src="/Separator@2x.webp"
          priority
          fetchPriority="high"
        />
        <Image
          className={`${styles.separatorIcon} ${styles.mobileOnly}`}
          width={1440}
          height={1105}
          sizes="100vw"
          alt="Mobile hero background"
          src="/mobile-bg.webp"
          priority
          fetchPriority="high"
        />
        <div className={styles.frameChild} />
      </section>
      <div className={styles.softwareChild} />
      <div className={styles.contentwidgetsproject} />
      <Image
        className={styles.softwareItem}
        width={1462.5}
        height={1462.5}
        sizes="100vw"
        alt=""
        src="/Group-15.svg"
        loading="lazy"
      />
      <section className={styles.frameParent}>
        <Image
          className={styles.frameItem}
          width={982}
          height={982}
          sizes="100vw"
          alt=""
          src="/Group-17.svg"
          loading="lazy"
        />
        <Image
          className={styles.robotIcon}
          loading="lazy"
          width={583}
          height={903.5}
          sizes="(max-width: 768px) 50vw, 583px"
          alt="Robot mascot"
          src="/robot@2x.webp"
        />
      </section>
      <main className={styles.softwareInner}>
        <div className={styles.frameGroup}>
          <div className={styles.eventProgressParent}>
            <div id="home" className={styles.eventProgress}>
              <HeroPills />
              <div className={styles.lenientTreeParent}>
                <h2 className={styles.lenientTree}>lenient tree</h2>
                <h2 className={styles.presents}>presents</h2>
              </div>

            </div>
            <section id="about" className={styles.aboutSection}>
              <GroupComponent className={styles.aboutUs} />
            </section>
            
            {/* Continuous Lightfall background for Guidelines, Journey, and Testimonials */}
            <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0, 
                pointerEvents: 'none',
                overflow: 'hidden'
              }}>
                {isMobile ? (
                  <MobileBackground />
                ) : (
                  <Lightfall
                    colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
                    backgroundColor="#0A29FF"
                    speed={0.4}
                    streakCount={3}
                    streakWidth={0.8}
                    streakLength={1}
                    glow={0.6}
                    density={0.4}
                    twinkle={0.8}
                    zoom={3}
                    backgroundGlow={0.2}
                    opacity={0.25}
                    mouseInteraction
                    mouseStrength={0.3}
                    mouseRadius={1}
                  />
                )}
              </div>
              
              <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '100%', margin: '0 auto', padding: '0 clamp(16px, 4vw, 60px)' }}>
                <div id="guidelines" className={styles.guidelinesSection}>
                  <Guidelines />
                </div>
                
                <div id="timeline" style={{ 
                  paddingTop: '60px', 
                  paddingBottom: '56px',
                  background: 'rgba(10, 20, 50, 0.4)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  marginTop: '40px',
                  padding: '60px 20px 56px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}>
                  <h2 style={{ 
                    textAlign: 'center', 
                    fontSize: 'clamp(2rem, 5vw, 3rem)', 
                    fontWeight: 'bold', 
                    color: '#ffffff',
                    marginBottom: '40px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    fontFamily: 'var(--font-orbitron), sans-serif'
                  }}>
                    How's The Journey So Far
                  </h2>
                  <SlideCarousel />
                </div>
                
                <div style={{
                  marginTop: '40px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '24px',
                  padding: '20px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}>
                  <Testimonials />
                </div>
              </div>
            </div>
            <Cta />
          </div>
        </div>
      </main>
      <section className={styles.frameSection}>
        <div className={styles.gridParent}>
          <Grid />
          <Container />
          <div className={styles.madeWithFromLenientTreeWrapper}>
            <div
              className={styles.madeWith}
            >{`Made with ♥️ from Lenient tree `}</div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Software;
