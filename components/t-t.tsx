import type { NextPage } from "next";
import Nav from "./nav";
import styles from "./t-t.module.css";

export type TTType = {
  className?: string;
  state?: "Hero";

  /** Variant props */
  property1?: "T1";
};

const TT: NextPage<TTType> = ({ className = "", property1 = "T1", state }) => {
  return (
    <header
      className={[styles.tt, className].join(" ")}
      data-property1={property1}
    >
      <section className={styles.navWrapper}>
        <Nav state={state} />
      </section>
      <div className={styles.ttInner}>
        <div className={styles.frameChild} />
      </div>
    </header>
  );
};

export default TT;
