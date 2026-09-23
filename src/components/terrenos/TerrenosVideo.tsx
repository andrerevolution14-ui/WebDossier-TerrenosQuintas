'use client';

import { useState } from 'react';
import Image from 'next/image';

// Apenas os 3 vídeos curados da pasta /public/videos/
const videos = [
  {
    src: '/videos/NoiteDia-Ad1.mp4',
    poster: '/Curado/1.png',
    label: 'Terreno — Dia & Noite',
    desc: 'Vista aérea do lote e envolvente em diferentes condições de luz',
  },
  {
    src: '/videos/Projeto-Ad2.mp4',
    poster: '/Exterior Capa.png',
    label: 'O Projeto de Arquitetura',
    desc: 'Visualização em vídeo da moradia aprovada em 3D',
  },
  {
    src: '/videos/Planta-Ad3.mp4',
    poster: '/Planta-tecnica.png',
    label: 'Plantas & Implantação',
    desc: 'Tour em vídeo pelas plantas técnicas e distribuição',
  },
];

export default function TerrenosVideo() {
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

  return (
    <section className="t-section t-section--dark" id="videos">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label t-label-accent-light">Vídeos do Projeto</p>
          <h2 className="t-heading t-heading--light">
            Veja o Terreno e o Projeto em Vídeo
          </h2>
          <p className="t-section-sub t-section-sub--light">
            Clique em qualquer vídeo para assistir em ecrã ampliado com total detalhe.
          </p>
        </div>

        {/* Grade em 1 linha única (3 colunas) */}
        <div className="t-video-grid t-video-grid--single-row">
          {videos.map((v) => (
            <div
              key={v.src}
              className="t-video-card t-video-card--zoomable"
              onClick={() => setActiveVideo(v)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveVideo(v);
              }}
              aria-label={`Abrir vídeo ampliado: ${v.label}`}
            >
              <div className="t-video-thumb-wrap">
                <Image
                  src={v.poster}
                  alt={v.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  quality={85}
                  style={{ objectFit: 'cover' }}
                />
                <div className="t-video-overlay-play">
                  <span className="t-video-play-circle">▶</span>
                  <span className="t-video-zoom-tag">🔍 Toque para Abrir em Zoom</span>
                </div>
              </div>
              <div className="t-video-info">
                <span className="t-video-label">{v.label}</span>
                <span className="t-video-desc">{v.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="t-cta-center">
          <a href="#formulario" id="cta_videos_contacto" className="t-btn t-btn-cta t-cta-scroll">
            <span>Quero Ser Contactado</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>

      {/* Modal / Lightbox de Vídeo em Zoom */}
      {activeVideo && (
        <div className="t-lightbox" onClick={() => setActiveVideo(null)}>
          <button
            className="t-lightbox-close"
            onClick={() => setActiveVideo(null)}
            aria-label="Fechar vídeo"
          >
            ✕
          </button>
          <div className="t-lightbox-caption">{activeVideo.label} — {activeVideo.desc}</div>
          <div className="t-lightbox-video-wrap" onClick={(e) => e.stopPropagation()}>
            <video
              src={activeVideo.src}
              poster={activeVideo.poster}
              controls
              autoPlay
              playsInline
              className="t-modal-video-player"
            />
          </div>
        </div>
      )}
    </section>
  );
}
