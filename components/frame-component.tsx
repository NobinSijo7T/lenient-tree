"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./frame-component.module.css";

export type FrameComponentType = {
  className?: string;
  hoursOfInnovation?: string;
  workshopsMentorship?: string;

  /** Style props */
  frameDivPadding?: CSSProperties["padding"];
  workshopsMentorshipMargin?: CSSProperties["margin"];
  workshopsMentorshipFontWeight?: CSSProperties["fontWeight"];
};

const FrameComponent: NextPage<FrameComponentType> = ({
  className = "",
  hoursOfInnovation,
  frameDivPadding,
  workshopsMentorship,
  workshopsMentorshipMargin,
  workshopsMentorshipFontWeight,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      padding: frameDivPadding,
    };
  }, [frameDivPadding]);

  const workshopsMentorshipStyle: CSSProperties = useMemo(() => {
    return {
      margin: workshopsMentorshipMargin,
      fontWeight: workshopsMentorshipFontWeight,
    };
  }, [workshopsMentorshipMargin, workshopsMentorshipFontWeight]);

  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <div className={styles.hoursOfInnovationWrapper}>
        <div className={styles.hoursOfInnovation}>{hoursOfInnovation}</div>
      </div>
      <div className={styles.hoursOfInnovationWrapper} style={frameDivStyle}>
        <div
          className={styles.hoursOfInnovation}
          style={workshopsMentorshipStyle}
        >
          {workshopsMentorship}
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
