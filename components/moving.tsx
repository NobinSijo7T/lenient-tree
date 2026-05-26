import type { NextPage } from "next";
import Image from "next/image";
import styles from "./moving.module.css";

export type MovingType = {
  className?: string;

  /** Variant props */
  property1?: "up";
};

const Moving: NextPage<MovingType> = ({ className = "", property1 = "up" }) => {
  return (
    <div
      className={[styles.moving, className].join(" ")}
      data-property1={property1}
    >
      <button className={styles.sd}>
        <div className={styles.scrollDown}>Scroll down</div>
        <Image
          className={styles.unionIcon}
          width={35}
          height={20}
          sizes="100vw"
          alt=""
          src="/Union.svg"
        />
        <Image
          className={styles.unionIcon2}
          width={17.5}
          height={18}
          sizes="100vw"
          alt=""
          src="/Union1.svg"
        />
      </button>
    </div>
  );
};

export default Moving;
