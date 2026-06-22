"use client";

import React, { useState } from 'react';
import styles from './Testimonials.module.css';
import feedbackData from '../public/internship_feedback.json';

interface Testimonial {
  name: string;
  college: string;
  feedback: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = feedbackData.filter((t: Testimonial) => t.feedback.trim() !== '');

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  // Generate avatar placeholder from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>What Our Interns Say</h2>
        <p className={styles.subtitle}>Real feedback from our residency program participants</p>

        <div className={styles.testimonialWrapper}>
          <button 
            className={styles.navButton} 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous testimonials"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={styles.cardsContainer}>
            {visibleTestimonials.map((testimonial, index) => (
              <div key={currentIndex + index} className={styles.card}>
                <div className={styles.cardInner}>
                  <div className={styles.profileSection}>
                    <div className={styles.hexagonWrapper}>
                      <div className={styles.hexagon}>
                        <div className={styles.avatarPlaceholder}>
                          {getInitials(testimonial.name)}
                        </div>
                      </div>
                    </div>
                    <div className={styles.quoteIcon}>"</div>
                  </div>

                  <div className={styles.content}>
                    <p className={styles.feedback}>{testimonial.feedback}</p>
                  </div>

                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={styles.star}>★</span>
                    ))}
                  </div>

                  <div className={styles.authorInfo}>
                    <h3 className={styles.authorName}>— {testimonial.name}</h3>
                    <p className={styles.authorRole}>{testimonial.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={styles.navButton} 
            onClick={nextSlide}
            disabled={currentIndex + 3 >= testimonials.length}
            aria-label="Next testimonials"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <button
              key={index}
              className={`${styles.paginationDot} ${currentIndex / 3 === index ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index * 3)}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
