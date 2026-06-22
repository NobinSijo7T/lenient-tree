import React from 'react';
import './MobileBackground.css';

/**
 * MobileBackground — zero-WebGL, pure CSS animated background.
 * Visually matches Lightfall's blue/purple aurora theme via
 * animated gradient blobs, falling streaks, and twinkling stars.
 * Uses only CSS keyframes + will-change: transform — minimal CPU/GPU cost.
 */
const MobileBackground: React.FC = () => {
  return (
    <div className="mobile-bg" aria-hidden="true">
      {/* Aurora blobs */}
      <div className="mobile-bg__blob mobile-bg__blob--1" />
      <div className="mobile-bg__blob mobile-bg__blob--2" />
      <div className="mobile-bg__blob mobile-bg__blob--3" />
      <div className="mobile-bg__blob mobile-bg__blob--4" />

      {/* Light streaks (mimics Lightfall's falling lines) */}
      <div className="mobile-bg__streaks">
        <div className="mobile-bg__streak" />
        <div className="mobile-bg__streak" />
        <div className="mobile-bg__streak" />
        <div className="mobile-bg__streak" />
        <div className="mobile-bg__streak" />
        <div className="mobile-bg__streak" />
        <div className="mobile-bg__streak" />
        <div className="mobile-bg__streak" />
      </div>

      {/* Twinkling stars */}
      <div className="mobile-bg__stars">
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
        <div className="mobile-bg__star" />
      </div>
    </div>
  );
};

export default MobileBackground;
