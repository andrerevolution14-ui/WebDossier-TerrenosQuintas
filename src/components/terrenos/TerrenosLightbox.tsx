'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface LightboxImage {
  src: string;
  alt: string;
  label?: string;
}

interface TerrenosLightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function TerrenosLightbox({
  images,
  currentIndex,
  onClose,
  onIndexChange,
}: TerrenosLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prevImage = useCallback(() => {
    if (currentIndex === null) return;
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onIndexChange]);

  const nextImage = useCallback(() => {
    if (currentIndex === null) return;
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onIndexChange]);

  // Bloqueio do scroll do body enquanto aberto
  useEffect(() => {
    if (currentIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [currentIndex]);

  // Teclado: Escape, Seta Esquerda, Seta Direita
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, prevImage, nextImage]);

  // Pré-carregamento imediato em cache das fotos vizinhas para 0ms de latência
  useEffect(() => {
    if (currentIndex === null || typeof window === 'undefined') return;
    const nextIdx = (currentIndex + 1) % images.length;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;

    const preNext = new window.Image();
    preNext.src = images[nextIdx].src;

    const prePrev = new window.Image();
    prePrev.src = images[prevIdx].src;
  }, [currentIndex, images]);

  // Gestos de toque para telemóvel (Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Se o movimento for predominantemente horizontal e superior a 35px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) nextImage();
      else prevImage();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (currentIndex === null || typeof document === 'undefined') return null;

  const currentItem = images[currentIndex];

  const modalContent = (
    <div
      className="t-lb-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Barra Superior: Contador + Título + Fechar */}
      <div className="t-lb-topbar" onClick={(e) => e.stopPropagation()}>
        <div className="t-lb-badge">
          {currentIndex + 1} / {images.length}
        </div>
        <div className="t-lb-title">
          {currentItem.label || currentItem.alt}
        </div>
        <button
          className="t-lb-close-btn"
          onClick={onClose}
          aria-label="Fechar visualização"
        >
          ✕
        </button>
      </div>

      {/* Botão Anterior */}
      <button
        className="t-lb-arrow t-lb-arrow-prev"
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
        aria-label="Foto anterior"
      >
        ‹
      </button>

      {/* Botão Seguinte */}
      <button
        className="t-lb-arrow t-lb-arrow-next"
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        aria-label="Próxima foto"
      >
        ›
      </button>

      {/* Palco Central da Imagem — Carregamento Nativo Ultra-Rápido */}
      <div className="t-lb-stage" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={currentItem.src}
          src={currentItem.src}
          alt={currentItem.alt}
          className="t-lb-image"
          decoding="async"
        />
      </div>

      {/* Barra Inferior com Informação da Foto */}
      {currentItem.label && currentItem.label !== currentItem.alt && (
        <div className="t-lb-footer" onClick={(e) => e.stopPropagation()}>
          <p className="t-lb-caption-txt">{currentItem.alt}</p>
        </div>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
}
