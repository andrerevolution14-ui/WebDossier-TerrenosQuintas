'use client';

import { useState } from 'react';
import Image from 'next/image';

// Apenas fotos curadas (aéreas de qualidade) — sem fotos brutas do terreno
const curadoPhotos = [
  { src: '/Curado/1.png', alt: 'Vista aérea delimitada do lote' },
  { src: '/Curado/2.png', alt: 'Vista aérea da envolvente e acessos' },
  { src: '/Curado/3.png', alt: 'Vista aérea zona residencial circundante' },
  { src: '/Curado/4.png', alt: 'Vista panorâmica do conjunto' },
  { src: '/Curado/5.png', alt: 'Vista aérea – moradias vizinhas e infraestruturas' },
];

export default function TerrenosGallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="t-section t-section--alt" id="galeria">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">Localização Vista de Cima</p>
          <h2 className="t-heading">O Lote e a sua Envolvente</h2>
          <p className="t-section-sub">
            Imagens aéreas profissionais do terreno e da zona residencial de Quintãs, Oliveirinha.
            Clique para ampliar.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="t-gallery-grid">
          {curadoPhotos.map((p) => (
            <button
              key={p.src}
              className="t-gallery-item"
              onClick={() => setLightbox(p.src)}
              aria-label={`Ver imagem ampliada: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 25vw"
                quality={85}
                style={{ objectFit: 'cover' }}
              />
              <div className="t-gallery-overlay">
                <span className="t-gallery-zoom">🔍</span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div className="t-lightbox" onClick={() => setLightbox(null)}>
            <button
              className="t-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Fechar ampliação"
            >
              ✕
            </button>
            <div className="t-lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
              <Image
                src={lightbox}
                alt="Imagem ampliada do terreno"
                fill
                sizes="95vw"
                quality={95}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
