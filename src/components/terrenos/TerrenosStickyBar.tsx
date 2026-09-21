'use client';

import { useState, useEffect } from 'react';

export default function TerrenosStickyBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // O sticky bar só aparece quando o utilizador dá scroll (passados 250px)
      if (window.scrollY > 250) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`t-sticky-bar ${scrolled ? 't-sticky-bar--visible' : 't-sticky-bar--hidden'}`}
      role="complementary"
      aria-label="Ação rápida"
    >
      <div className="t-sticky-bar-inner">
        <a href="#formulario" id="cta_sticky_bar" className="t-btn t-btn-cta t-sticky-btn t-cta-scroll">
          <span>Quero Ser Contactado</span>
          <span className="t-btn-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
