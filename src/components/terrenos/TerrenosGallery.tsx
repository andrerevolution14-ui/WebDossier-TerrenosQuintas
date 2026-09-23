'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const curadoPhotos = [
  { src: '/Curado/1.png', alt: 'Vista aérea delimitada do lote' },
  { src: '/Curado/2.png', alt: 'Vista aérea da envolvente e acessos' },
  { src: '/Curado/3.png', alt: 'Vista aérea zona residencial circundante' },
  { src: '/Curado/4.png', alt: 'Vista panorâmica do conjunto' },
  { src: '/Curado/5.png', alt: 'Vista aérea – moradias vizinhas e infraestruturas' },
];

export default function TerrenosGallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? curadoPhotos.length - 1 : prev - 1;
    });
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === null) return null;
      return prev === curadoPhotos.length - 1 ? 0 : prev + 1;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setCurrentIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, prevImage, nextImage]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    touchStartX.current = null;
  };

  return (
    <section className="t-section t-section--alt" id="galeria">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">Localização Vista de Cima</p>
          <h2 className="t-heading">O Lote e a sua Envolvente</h2>
          <p className="t-section-sub">
            Imagens aéreas profissionais do terreno e da zona residencial de Quintãs, Oliveirinha.
            Clique em qualquer imagem para ampliar e percorrer a galeria.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="t-gallery-grid">
          {curadoPhotos.map((p, idx) => (
            <button
              key={p.src}
              className="t-gallery-item"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ver imagem ampliada: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 25vw"
                quality={90}
                style={{ objectFit: 'cover' }}
              />
              <div className="t-gallery-overlay">
                <span className="t-gallery-zoom">🔍</span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox com Navegação Contínua */}
        {currentIndex !== null && (
          <div
            className="t-lightbox"
            onClick={() => setCurrentIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Fechar */}
            <button
              className="t-lightbox-close"
              onClick={() => setCurrentIndex(null)}
              aria-label="Fechar visualização"
            >
              ✕
            </button>

            {/* Contador */}
            <div className="t-lightbox-counter">
              {currentIndex + 1} / {curadoPhotos.length}
            </div>

            {/* Setas de Navegação */}
            <button
              className="t-lightbox-nav-btn t-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Imagem anterior"
            >
              ‹
            </button>

            <button
              className="t-lightbox-nav-btn t-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Imagem seguinte"
            >
              ›
            </button>

            {/* Imagem Central */}
            <div className="t-lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
              <Image
                src={curadoPhotos[currentIndex].src}
                alt={curadoPhotos[currentIndex].alt}
                fill
                sizes="95vw"
                quality={95}
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/* Legenda */}
            <div className="t-lightbox-caption">
              {curadoPhotos[currentIndex].alt}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
