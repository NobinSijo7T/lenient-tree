"use client";

import type { NextPage } from "next";
import Image from "next/image";
import Moving from "../components/moving";
import Nav from "../components/nav";
import HeroPills from "../components/HeroPills";
import GroupComponent from "../components/about-us/components/group-component";
import Guidelines from "../components/guidelines/app/guidelines";
import SlideCarousel from "../components/SlideCarousel";
import Testimonials from "../components/Testimonials";
import Cta from "../components/cta/cta";
import Grid from "../components/grid";
import Container from "../components/container";
import AppLoader from "../components/AppLoader";
import Lightfall from "../components/Lightfall";
import styles from "./software.module.css";

const Software: NextPage = () => {
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
          alt=""
          src="/Separator@2x.png"
        />
        <Image
          className={`${styles.separatorIcon} ${styles.mobileOnly}`}
          width={1440}
          height={1105}
          sizes="100vw"
          alt=""
          src="/mobile-bg.png"
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
      />
      <section className={styles.frameParent}>
        <Image
          className={styles.frameItem}
          width={982}
          height={982}
          sizes="100vw"
          alt=""
          src="/Group-17.svg"
        />
        <Image
          className={styles.robotIcon}
          loading="lazy"
          width={583}
          height={903.5}
          sizes="100vw"
          alt=""
          src="/robot@2x.png"
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
            <div id="guidelines" className={styles.guidelinesSection} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                <Lightfall
                  colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
                  backgroundColor="#0A29FF"
                  speed={0.3}
                  streakCount={3}
                  streakWidth={0.8}
                  streakLength={1.2}
                  glow={0.8}
                  density={0.5}
                  twinkle={0.8}
                  zoom={3}
                  backgroundGlow={0.3}
                  opacity={0.4}
                  mouseInteraction
                  mouseStrength={0.3}
                  mouseRadius={1.2}
                />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Guidelines />
              </div>
            </div>
            <div id="timeline" style={{ paddingTop: '60px', paddingBottom: '56px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                <Lightfall
                  colors={['#5227FF', '#A6C8FF', '#FF9FFC']}
                  backgroundColor="#0A29FF"
                  speed={0.4}
                  streakCount={4}
                  streakWidth={1}
                  streakLength={1}
                  glow={1}
                  density={0.6}
                  twinkle={1}
                  zoom={3}
                  backgroundGlow={0.4}
                  opacity={0.35}
                  mouseInteraction
                  mouseStrength={0.4}
                  mouseRadius={1}
                />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ 
                  textAlign: 'center', 
                  fontSize: 'clamp(2rem, 5vw, 3rem)', 
                  fontWeight: 'bold', 
                  color: '#ffffff',
                  marginBottom: '40px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  fontFamily: 'Orbitron, sans-serif'
                }}>
                  How's The Journey So Far
                </h2>
                <SlideCarousel />
              </div>
            </div>
            <Testimonials />
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
