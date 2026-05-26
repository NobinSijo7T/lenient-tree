"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./container.module.css";

export type ContainerType = {
  className?: string;
};

const COUNTDOWN_TARGET = new Date("2026-06-10T10:00:00+05:30").getTime();

const getCountdownParts = () => {
  const timeLeft = Math.max(COUNTDOWN_TARGET - Date.now(), 0);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const formatCountdownValue = (value: number) =>
  value.toString().padStart(2, "0");

const Container: NextPage<ContainerType> = ({ className = "" }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getCountdownParts());
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

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
              <h2 className={styles.partialContainer}>
                {formatCountdownValue(countdown.days)}
              </h2>
            </div>
            <div className={styles.frame}>
              <h2 className={styles.partialContainer}>
                {formatCountdownValue(countdown.hours)}
              </h2>
            </div>
            <div className={styles.rectangleParent}>
              <div className={styles.frameChild} />
              <div className={styles.frameChild} />
            </div>
            <div className={styles.frame}>
              <h2 className={styles.partialContainer}>
                {formatCountdownValue(countdown.minutes)}
              </h2>
            </div>
            <div className={styles.frame}>
              <h2 className={styles.partialContainer}>
                {formatCountdownValue(countdown.seconds)}
              </h2>
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
