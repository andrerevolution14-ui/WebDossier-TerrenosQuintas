'use client';

import { useState } from 'react';
import Image from 'next/image';
import TerrenosLightbox, { LightboxImage } from './TerrenosLightbox';

const curadoPhotos: LightboxImage[] = [
  { src: '/Curado/1.webp', alt: 'Vista frontal delimitada do lote urbano de 233m²', label: 'Foto Frontal com Delimitação' },
  { src: '/Curado/2.webp', alt: 'Vista da envolvente verde e acessos diretos à estrada', label: 'Envolvente e Acessos' },
  { src: '/Curado/3.webp', alt: 'Vista aérea da zona residencial e moradias vizinhas', label: 'Zona Residencial Tranquila' },
  { src: '/Curado/4.webp', alt: 'Vista de topo e enquadramento panorâmico', label: 'Enquadramento Solar e Panorâmica' },
  { src: '/Curado/5.webp', alt: 'Vista panorâmica do lote plano e infraestruturas concluídas', label: 'Infraestruturas e Frente de Rua' },
];

export default function TerrenosGallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <section className="t-section t-section--alt" id="galeria">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">Localização Vista de Cima</p>
          <h2 className="t-heading">
            O Terreno, os Acessos e a Envolvente
          </h2>
          <p className="t-section-sub">
            Fotografias reais do lote e da vizinhança em Quintãs, Oliveirinha.
            Toque em qualquer fotografia para ampliar em ecrã completo.
          </p>
        </div>

        {/* Galeria de Fotos */}
        <div className="t-gallery-grid">
          {curadoPhotos.map((photo, index) => (
            <button
              key={photo.src}
              className={`t-gallery-item ${index === 0 ? 't-gallery-item--featured' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ver ${photo.alt} ampliada`}
              type="button"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  index === 0
                    ? '(max-width: 768px) 100vw, 800px'
                    : '(max-width: 768px) 50vw, 400px'
                }
                quality={85}
                style={{ objectFit: 'cover' }}
              />
              <div className="t-gallery-overlay">
                <span className="t-gallery-zoom">🔍</span>
              </div>
            </button>
          ))}
        </div>

        <div className="t-cta-center">
          <a href="#formulario" className="t-btn t-btn-cta t-cta-scroll" id="cta_galeria_contacto">
            <span>Pedir Mais Informações</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>

      {/* Lightbox com Navegação Contínua e 0ms de Latência */}
      <TerrenosLightbox
        images={curadoPhotos}
        currentIndex={currentIndex}
        onClose={() => setCurrentIndex(null)}
        onIndexChange={(idx) => setCurrentIndex(idx)}
      />
    </section>
  );
}
