import type { NextPage } from "next";
import Image from "next/image";
import styles from "./cta.module.css";

const Cta: NextPage = () => {
  return (
    <section className={styles.ctaBg}>
      <Image
        className={styles.bgIcon}
        width={1826}
        height={1788}
        sizes="100vw"
        alt=""
        src="/Frame-175.svg"
      />
      <div className={styles.cta}>
        <div className={styles.doNotWate}>
          Do not waste this opportunity, Join now...
        </div>
        <div className={styles.ctaInner}>
          <button className={styles.registerWrapper}>
            <div className={styles.register}>Register</div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
