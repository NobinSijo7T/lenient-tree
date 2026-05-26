import type { NextPage } from "next";
import Image from "next/image";
import Moving from "../components/moving";
import TT from "../components/t-t";
import HeroPills from "../components/HeroPills";
import GroupComponent from "../components/about-us/components/group-component";
import Guidelines from "../components/guidelines/app/guidelines";
import CircularGallery from "../components/CircularGallery";
import Cta from "../components/cta/cta";
import Grid from "../components/grid";
import Container from "../components/container";
import styles from "./software.module.css";

const Software: NextPage = () => {
  return (
    <div className={styles.software}>
      <TT property1="T1" state="Hero" />
      <section className={styles.separatorParent}>
        <Image
          className={styles.separatorIcon}
          width={1440}
          height={1105}
          sizes="100vw"
          alt=""
          src="/Separator@2x.png"
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
            <div id="guidelines" className={styles.guidelinesSection}>
              <Guidelines />
            </div>
            <div id="timeline" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
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
              <div style={{ height: '600px', position: 'relative' }}>
                <CircularGallery 
                  bend={1}
                  borderRadius={0.05}
                  scrollSpeed={2}
                  scrollEase={0.05}
                />
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
  );
};

export default Software;
