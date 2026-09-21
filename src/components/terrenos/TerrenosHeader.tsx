'use client';

import { useState, useEffect } from 'react';

export default function TerrenosHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`t-header ${scrolled ? 't-header--scrolled' : ''}`}>
      <div className="t-wrap t-header-inner" style={{ justifyContent: 'center' }}>
        {/* Apenas o Título / Identificação Arquitetónica Limpa */}
        <a href="#inicio" className="t-header-brand" style={{ gap: '12px' }}>
          <span className="t-header-logo-badge">LOTE</span>
          <div className="t-header-brand-text" style={{ textAlign: 'center' }}>
            <span className="t-header-brand-title">QUINTÃS · AVEIRO</span>
            <span className="t-header-brand-sub">Projeto de Arquitetura Aprovado · IVA a 6% na Construção</span>
          </div>
        </a>
      </div>
    </header>
  );
}
