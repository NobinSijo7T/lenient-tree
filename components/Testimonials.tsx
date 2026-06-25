"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';
import feedbackData from '../public/internship_feedback.json';

interface Testimonial {
  name: string;
  college: string;
  feedback: string;
}

interface LinkedInData {
  full_name: string;
  linkedin_url: string;
}

const linkedInData: LinkedInData[] = [
  {"full_name": "Mohammed Fezin","linkedin_url": "https://www.linkedin.com/in/mohammed-fezin"},
  {"full_name": "Mahad Mammu","linkedin_url": "https://www.linkedin.com/in/mahad-mammu"},
  {"full_name": "Adarsh M R","linkedin_url": "https://www.linkedin.com/in/adarsh-m-r-1659b9332"},
  {"full_name": "Angith Kishor K","linkedin_url": "https://www.linkedin.com/in/angith-kishor-89a4aa32a"},
  {"full_name": "Christeena Jestin","linkedin_url": "https://www.linkedin.com/in/christeenajestin"},
  {"full_name": "Angelina Mary George","linkedin_url": "https://www.linkedin.com/in/angelina-mary-g-3b7123358"},
  {"full_name": "AMAN ZAHI","linkedin_url": "https://www.linkedin.com/in/aman-zahi-2a8122358"}
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted so disabled props only apply after hydration
  useEffect(() => { setMounted(true); }, []);
  const testimonials = feedbackData.filter((t: Testimonial) => t.feedback.trim() !== '');

  // Auto-play functionality
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 3;
        return next >= testimonials.length ? 0 : next;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  // Get LinkedIn URL for a person
  const getLinkedInUrl = (name: string): string | null => {
    const person = linkedInData.find(p => 
      p.full_name.toLowerCase() === name.toLowerCase() ||
      p.full_name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(p.full_name.toLowerCase())
    );
    return person?.linkedin_url || null;
  };

  // Get image path for a person
  const getImagePath = (name: string): string => {
    // Match the exact filename from the testimonials folder
    const imageMap: { [key: string]: string } = {
      'Mohammed Fezin': '/testimonials/Mohammed Fezin.webp',
      'Mahad Mammu': '/testimonials/Mahad Mammu.webp',
      'Adarsh M R': '/testimonials/Adarsh M R.webp',
      'Angith Kishor K': '/testimonials/Angith Kishor K .webp',
      'Christeena Jestin': '/testimonials/Christeena Jestin.webp',
      'Angelina Mary George': '/testimonials/Angelina Mary George.webp',
      'AMAN ZAHI': '/testimonials/AMAN ZAHI.webp',
      'Aleena M Siju': '/testimonials/aleena.jpeg',
      'Malavika Gopi': '/testimonials/malavika.jpeg',
      'Meera Surendran': '/testimonials/meera.jpeg',
    };
    
    // Try exact match first
    if (imageMap[name]) return imageMap[name];
    
    // Try to find a partial match
    const matchKey = Object.keys(imageMap).find(key => 
      key.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchKey ? imageMap[matchKey] : '/placeholder-avatar.png';
  };

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
            disabled={mounted && currentIndex === 0}
            aria-label="Previous testimonials"
            suppressHydrationWarning
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={styles.cardsContainer}>
            {visibleTestimonials.map((testimonial, index) => {
              const linkedInUrl = getLinkedInUrl(testimonial.name);
              const imagePath = getImagePath(testimonial.name);
              
              return (
                <div key={currentIndex + index} className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.profileSection}>
                      <div className={styles.hexagonWrapper}>
                        <div className={styles.hexagon}>
                          <Image
                            src={imagePath}
                            alt={testimonial.name}
                            width={120}
                            height={120}
                            className={styles.avatarImage}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className={styles.quoteIcon}>"</div>
                    </div>

                    <div className={styles.content}>
                      <p className={styles.feedback}>{testimonial.feedback}</p>
                    </div>

                    <div className={styles.rating}>
                      {[...Array(testimonial.name === 'Aleena M Siju' || testimonial.name === 'Angelina Mary George' ? 4 : 5)].map((_, i) => (
                        <span key={i} className={styles.star}>★</span>
                      ))}
                    </div>

                    <div className={styles.authorInfo}>
                      <div className={styles.authorDetails}>
                        <h3 className={styles.authorName}>— {testimonial.name}</h3>
                        <p className={styles.authorRole}>{testimonial.college}</p>
                      </div>
                      {linkedInUrl && (
                        <a
                          href={linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.linkedinButton}
                          aria-label={`View ${testimonial.name}'s LinkedIn profile`}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className={styles.navButton} 
            onClick={nextSlide}
            disabled={mounted && currentIndex + 3 >= testimonials.length}
            aria-label="Next testimonials"
            suppressHydrationWarning
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
