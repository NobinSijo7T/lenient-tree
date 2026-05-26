import type { NextPage } from "next";
import Image from "next/image";
import styles from "./cta-bg.module.css";

const CtaBg: NextPage = () => {
  return (
    <div className={styles.ctaBg}>
      <Image
        className={styles.bgIcon}
        width={1826}
        height={1788}
        sizes="100vw"
        alt=""
        src="/Frame-175.svg"
      />
      <section className={styles.cta}>
        <div className={styles.doNotWate}>
          Do not wate this opportunity, Join now...
        </div>
        <div className={styles.ctaInner}>
          <button className={styles.registerWrapper}>
            <div className={styles.register}>Register</div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default CtaBg;
