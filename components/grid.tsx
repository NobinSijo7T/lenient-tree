import type { NextPage } from "next";
import styles from "./grid.module.css";

export type GridType = {
  className?: string;
};

const Grid: NextPage<GridType> = ({ className = "" }) => {
  return (
    <div className={[styles.grid, className].join(" ")}>
      <div className={styles.gridData}>
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
      </div>
      <div className={styles.gridData}>
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
        <div className={styles.gridDataChild} />
      </div>
      <div className={styles.gridData}>
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
      </div>
      <div className={styles.gridData}>
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
      </div>
      <div className={styles.gridData}>
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
      </div>
      <div className={styles.gridData}>
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
      </div>
      <footer className={styles.gridData}>
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
        <div className={styles.gridDataChild16} />
      </footer>
    </div>
  );
};

export default Grid;
