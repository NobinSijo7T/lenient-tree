"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "./nav.module.css";

export type NavType = {
  className?: string;

  /** Variant props */
  state?: "Hero";
};

const Nav: NextPage<NavType> = ({ className = "", state = "Hero" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Home", "About", "Timeline", "About"];

  return (
    <div
      className={[styles.nav, menuOpen ? styles.navOpen : "", className].join(
        " ",
      )}
      data-state={state}
    >
      <div className={styles.navChild} aria-hidden="true" />
      <nav className={styles.navigationDataParent}>
        {navItems.map((item, index) => (
          <button
            className={
              index === 0 ? styles.navigationData : styles.navigationData2
            }
            key={`${item}-${index}`}
            type="button"
          >
            <span className={index === 0 ? styles.home : styles.about}>
              {item}
            </span>
          </button>
        ))}
      </nav>
      <button className={styles.sd} type="button">
        <div className={styles.register}>Register</div>
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
          width={20}
          height={19.5}
          sizes="100vw"
          alt=""
          src="/Union2.svg"
        />
      </button>
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className={styles.hamburger}
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <div className={styles.mobileMenu}>
        {navItems.map((item, index) => (
          <button key={`${item}-mobile-${index}`} type="button">
            {item}
          </button>
        ))}
        <button className={styles.mobileRegister} type="button">
          Register
          <Image
            className={styles.unionIcon2}
            width={20}
            height={19.5}
            sizes="100vw"
            alt=""
            src="/Union2.svg"
          />
        </button>
      </div>
    </div>
  );
};

export default Nav;
