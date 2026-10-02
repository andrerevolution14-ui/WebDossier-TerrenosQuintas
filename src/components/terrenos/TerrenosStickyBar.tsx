'use client';

import { useState, useEffect } from 'react';
import { scrollToForm } from '@/lib/scrollToForm';

export default function TerrenosStickyBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // O sticky bar só aparece após 250px e esconde-se automaticamente
      // quando o utilizador chega ao formulário para não tapar os campos nem os botões.
      const formEl = document.getElementById('formulario');
      let isFormInView = false;
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        isFormInView = rect.top < window.innerHeight - 80 && rect.bottom > 80;
      }

      if (window.scrollY > 250 && !isFormInView) {
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
        <a
          href="#formulario"
          onClick={scrollToForm}
          id="cta_sticky_bar"
          className="t-btn t-btn-cta t-sticky-btn t-cta-scroll"
        >
          <span>Quero Ser Contactado</span>
          <span className="t-btn-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
