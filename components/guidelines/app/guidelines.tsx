import type { NextPage } from "next";
import Image from "next/image";
import styles from "./guidelines.module.css";

const Guidelines: NextPage = () => {
  return (
    <div className={styles.guidelines}>
      <h1 className={styles.guidelines2}>Guidelines</h1>
      <main className={styles.frameParent}>
        <Image
          className={styles.frameChild}
          loading="lazy"
          width={300}
          height={1110}
          sizes="100vw"
          alt=""
          src="/Frame-1731@2x.png"
        />
        <section className={styles.frameGroup}>
          <div className={styles.teamCollaborationParent}>
            <h2 className={styles.teamCollaboration}>Team Collaboration</h2>
            <div className={styles.workEffectivelyAs}>
              Work effectively as a team, ensuring equal contribution and clear
              communication throughout.
            </div>
          </div>
          <div className={styles.teamCollaborationParent}>
            <h2 className={styles.teamCollaboration}>Innovation First</h2>
            <div className={styles.workEffectivelyAs}>
              Build original solutions that solve real problems creatively, not
              just incremental improvements.
            </div>
          </div>
          <div className={styles.teamCollaborationParent}>
            <h2 className={styles.teamCollaboration}>Time Discipline</h2>
            <div className={styles.workEffectivelyAs}>
              Complete your project within the given timeframe—no late
              submissions or post-deadline edits.
            </div>
          </div>
          <div className={styles.functionalPrototypeParent}>
            <h2 className={styles.teamCollaboration}>Functional Prototype</h2>
            <div className={styles.workEffectivelyAs}>
              Deliver a working demo that clearly demonstrates your idea and its
              core functionality.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Guidelines;
