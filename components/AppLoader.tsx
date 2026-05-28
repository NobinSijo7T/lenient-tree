"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import './AppLoader.css';

export default function AppLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="app-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background */}
          <div className="loader-bg" />
          
          {/* Main content container */}
          <div className="loader-content">
            
            {/* Logo */}
            <motion.div
              className="logo-wrapper"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/white.png"
                alt="Lenient Tree"
                width={100}
                height={100}
                priority
                className="loader-logo"
              />
            </motion.div>
            
            {/* Progress bar */}
            <motion.div
              className="progress-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="progress-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Loading text */}
            <motion.div
              className="loading-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span>Loading</span>
              <div className="dots">
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >
                  .
                </motion.span>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}