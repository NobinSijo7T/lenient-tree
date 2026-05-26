"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./frame-component.module.css";

export type FrameComponentType = {
  className?: string;
  hoursOfInnovation?: string;
  workshopsMentorship?: string;

  /** Style props */
  frameDivTop?: CSSProperties["top"];
  workshopsMentorshipTop?: CSSProperties["top"];
  workshopsMentorshipMargin?: CSSProperties["margin"];
  workshopsMentorshipFontWeight?: CSSProperties["fontWeight"];
};

const FrameComponent: NextPage<FrameComponentType> = ({
  className = "",
  frameDivTop,
  hoursOfInnovation,
  workshopsMentorship,
  workshopsMentorshipTop,
  workshopsMentorshipMargin,
  workshopsMentorshipFontWeight,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      top: frameDivTop,
    };
  }, [frameDivTop]);

  const workshopsMentorshipStyle: CSSProperties = useMemo(() => {
    return {
      top: workshopsMentorshipTop,
      margin: workshopsMentorshipMargin,
      fontWeight: workshopsMentorshipFontWeight,
    };
  }, [
    workshopsMentorshipTop,
    workshopsMentorshipMargin,
    workshopsMentorshipFontWeight,
  ]);

  return (
    <div
      className={[styles.frameParent, className].join(" ")}
      style={frameDivStyle}
    >
      <button className={styles.hoursOfInnovationWrapper}>
        <div className={styles.hoursOfInnovation}>{hoursOfInnovation}</div>
      </button>
      <button className={styles.workshopsMentorshipWrapper}>
        <div
          className={styles.hoursOfInnovation}
          style={workshopsMentorshipStyle}
        >
          {workshopsMentorship}
        </div>
      </button>
    </div>
  );
};

export default FrameComponent;
