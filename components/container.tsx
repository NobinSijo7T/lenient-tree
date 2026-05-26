import type { NextPage } from "next";
import Image from "next/image";
import styles from "./container.module.css";

export type ContainerType = {
  className?: string;
};

const Container: NextPage<ContainerType> = ({ className = "" }) => {
  return (
    <section className={[styles.container, className].join(" ")}>
      <div className={styles.container2}>
        <div className={styles.item}>
          <div className={styles.quickLinks}>Quick Links</div>
        </div>
        <div className={styles.list}>
          <div className={styles.item}>
            <div className={styles.component5}>
              <div className={styles.text}>How to participate?</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.component5}>
              <div className={styles.text}>Timeline</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.component5}>
              <div className={styles.text}>Guidelines</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.component5}>
              <div className={styles.text}>{`Rules & Regulations`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container3}>
        <div className={styles.container4}>
          <div className={styles.item}>
            <div className={styles.quickLinks}>Countdown</div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.frame}>
              <h2 className={styles.partialContainer}>22</h2>
            </div>
            <div className={styles.frame}>
              <h2 className={styles.partialContainer}>18</h2>
            </div>
            <div className={styles.rectangleParent}>
              <div className={styles.frameChild} />
              <div className={styles.frameChild} />
            </div>
            <div className={styles.frame}>
              <h2 className={styles.partialContainer}>31</h2>
            </div>
            <div className={styles.frame}>
              <h2 className={styles.partialContainer}>48</h2>
            </div>
          </div>
          <div className={styles.daysParent}>
            <div className={styles.days}>DAYS</div>
            <div className={styles.hrs}>HRS</div>
            <div className={styles.mins}>MINS</div>
            <div className={styles.days}>SECS</div>
          </div>
        </div>
      </div>
      <div className={styles.container5}>
        <div className={styles.item}>
          <div className={styles.quickLinks}>Follow Us</div>
        </div>
        <div className={styles.container6}>
          <a
            className={styles.socials}
            href="https://www.instagram.com/lenient_tree?igsh=ZmV4ajVlNGhhNW52"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Lenient Tree on Instagram"
          >
            <Image
              className={styles.maskGroupIcon}
              width={28}
              height={28}
              sizes="100vw"
              alt=""
              src="/Mask-group1@2x.png"
            />
          </a>
          <a
            className={styles.socials}
            href="https://x.com/lenienttree"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Lenient Tree on X"
          >
            <Image
              className={styles.maskGroupIcon}
              width={28}
              height={28}
              sizes="100vw"
              alt=""
              src="/Mask-group@2x.png"
            />
          </a>
          <a
            className={styles.socials}
            href="https://www.linkedin.com/company/lenient-tree/"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Lenient Tree on LinkedIn"
          >
            <span className={styles.in}>in</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Container;
