"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import './AppLoader.css';

export default function AppLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Allow content to render immediately, don't block scroll
    document.body.style.overflow = 'hidden';
    
    // Much shorter duration - just enough for brand impression
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800);

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      document.body.style.overflow = 'unset';
    }, 1100);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="app-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background */}
          <div className="loader-bg" />
          
          {/* Main content container */}
          <div className="loader-content">
            
            {/* Logo - faster animation */}
            <motion.div
              className="logo-wrapper"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/white.webp"
                alt="Lenient Tree"
                width={100}
                height={100}
                priority
                className="loader-logo"
              />
            </motion.div>
            
            {/* Simplified progress bar */}
            <motion.div
              className="progress-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="progress-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}