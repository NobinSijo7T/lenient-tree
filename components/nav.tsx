"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect, useCallback, memo } from "react";
import styles from "./nav.module.css";

const REGISTER_URL = "https://forms.gle/yGqLcHcexxrzBDxD8";

export type NavType = {
  className?: string;

  /** Variant props */
  state?: "Hero";
};

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Guidelines", id: "guidelines" },
  { name: "Timeline", id: "timeline" }
];

const Nav: NextPage<NavType> = ({ className = "", state = "Hero" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 3;
          
          for (const item of navItems) {
            const el = document.getElementById(item.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(item.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleRegisterClick = useCallback(() => {
    const newWindow = window.open(
      REGISTER_URL,
      "_blank",
      "noopener,noreferrer",
    );

    if (!newWindow) {
      window.location.href = REGISTER_URL;
    }
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {menuOpen && (
        <div 
          className={styles.menuOverlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <div
        className={[styles.nav, menuOpen ? styles.navOpen : "", className].join(
          " ",
        )}
        data-state={state}
      >
        <div className={styles.navChild} aria-hidden="true" />
        <nav className={styles.navigationDataParent}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              className={isActive ? styles.navigationData : styles.navigationData2}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              type="button"
            >
              <span className={isActive ? styles.home : styles.about}>
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
      <button
        className={styles.sd}
        onClick={handleRegisterClick}
        type="button"
      >
        <div className={styles.register}>Register</div>
        <Image
          className={styles.unionIcon}
          width={35}
          height={20}
          sizes="35px"
          alt=""
          src="/Union.svg"
        />
        <Image
          className={styles.unionIcon2}
          width={20}
          height={19.5}
          sizes="20px"
          alt=""
          src="/Union2.svg"
        />
      </button>
      <button
        className={styles.mobileSd}
        onClick={handleRegisterClick}
        type="button"
      >
        <div className={styles.register}>Register</div>
        <Image
          className={styles.unionIcon2}
          width={20}
          height={19.5}
          sizes="20px"
          alt=""
          src="/Union2.svg"
        />
      </button>
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className={styles.hamburger}
        onClick={toggleMenu}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <div className={styles.mobileMenu}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button 
              key={`${item.id}-mobile`} 
              onClick={() => {
                handleNavClick(item.id);
                closeMenu();
              }}
              style={isActive ? { backgroundColor: "rgba(255, 255, 255, 0.15)", fontWeight: "bold" } : {}}
              type="button"
            >
              {item.name}
            </button>
          );
        })}
        <button
          className={styles.mobileRegister}
          onClick={() => {
            closeMenu();
            handleRegisterClick();
          }}
          type="button"
        >
          Register
          <Image
            className={styles.unionIcon2}
            width={20}
            height={19.5}
            sizes="20px"
            alt=""
            src="/Union2.svg"
          />
        </button>
      </div>
    </div>
    </>
  );
};

export default memo(Nav);
