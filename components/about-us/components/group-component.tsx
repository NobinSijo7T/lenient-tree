import type { NextPage } from "next";
import Image from "next/image";
import FrameComponent from "./frame-component";
import styles from "./group-component.module.css";

export type GroupComponentType = {
  className?: string;
};

const GroupComponent: NextPage<GroupComponentType> = ({ className = "" }) => {
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
      <h1 className={styles.stacksprintIsAContainer}>
        <span className={styles.stacksprintIsAContainer2}>
          <span className={styles.stacksprintIsA}>
            Residency Internship is a 3-week immersive program by lenienttree.com for developers, founders, and creators to build, collaborate, and innovate in a startup-driven environment.
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
          hoursOfInnovation="24 Hours of Innovation"
          workshopsMentorship={`Workshops &
Mentorship`}
        />
        <FrameComponent
          frameDivTop="202px"
          hoursOfInnovation={`Learn Current
Trends & Tools`}
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
