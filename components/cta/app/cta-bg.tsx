import type { NextPage } from "next";
import Image from "next/image";
import styles from "./cta-bg.module.css";

const REGISTER_URL = "https://forms.gle/yGqLcHcexxrzBDxD8";

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
          <a
            className={styles.registerWrapper}
            href={REGISTER_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className={styles.register}>Register</div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default CtaBg;
