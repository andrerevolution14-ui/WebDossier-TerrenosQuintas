'use client';

import { useState } from 'react';
import Image from 'next/image';

const renders = [
  { src: '/Exterior Capa.png', alt: 'Render fachada exterior frontal', label: 'Fachada Principal' },
  { src: '/Exterior traseiro completo.png', alt: 'Render exterior traseiro', label: 'Vista Traseira' },
  { src: '/Sala de Jantar.png', alt: 'Render interior sala de jantar', label: 'Sala de Jantar' },
  { src: '/Quarto e varanda.png', alt: 'Render quarto com varanda', label: 'Quarto c/ Varanda' },
  { src: '/Cozinha.png', alt: 'Render cozinha', label: 'Cozinha' },
  { src: '/Terceiro Andar.png', alt: 'Render terceiro andar', label: 'Piso Superior' },
];

export default function TerrenosProject() {
  const [activeModalImg, setActiveModalImg] = useState<{ src: string; alt: string; label: string } | null>(null);

  return (
    <section className="t-section t-section--dark" id="projeto">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label t-label-accent-light">O Projeto de Arquitetura</p>
          <h2 className="t-heading t-heading--light">
            O Projeto Já Está Feito<br />
            <span className="t-heading-accent">e Aprovado pela Câmara de Aveiro</span>
          </h2>
          <p className="t-section-sub t-section-sub--light">
            Renders finais, plantas 2D e 3D de arquitectura — tudo incluído nos 55.000€ do lote.
            Clique em qualquer imagem para ver em alta definição.
          </p>
        </div>

        {/* Banner de destaque — com clareza sobre o aditamento */}
        <div className="t-approved-banner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="t-approved-check">✅</span>
            <span>
              <strong>PROJETO 100% APROVADO</strong> — Poupa 12 a 24 meses de burocracia camarária
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--t-beige-light)', margin: 0, lineHeight: 1.6, opacity: 0.9 }}>
            ℹ️ <em>Nota: O projeto está aprovado. Falta apenas realizar um <strong>Aditamento ao Processo</strong> para levantamento das licenças de construção — necessário por não ter sido dado início à obra dentro do prazo máximo obrigatório de 2 anos. Processo simples e rápido.</em>
          </p>
        </div>

        {/* Estrutura: Betão ou LSF — Informativo e Neutro */}
        <div className="t-structure-options">
          <p className="t-structure-title">Liberdade Total na Escolha do Sistema Construtivo:</p>
          <div className="t-structure-grid">
            <div className="t-structure-card">
              <span className="t-structure-icon">🏗️</span>
              <div>
                <span className="t-structure-name">Betão Armado</span>
                <span className="t-structure-desc">Construção tradicional consolidada, robusta e com durabilidade comprovada.</span>
              </div>
            </div>
            <div className="t-structure-card">
              <span className="t-structure-icon">⚡</span>
              <div>
                <span className="t-structure-name">LSF (Light Steel Framing)</span>
                <span className="t-structure-desc">Estrutura em aço leve galvanizado, rapidez de execução e alta eficiência térmica.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de renders */}
        <div className="t-renders-grid">
          {renders.map((r) => (
            <div
              key={r.src}
              className="t-render-card t-render-card--interactive"
              onClick={() => setActiveModalImg({ src: r.src, alt: r.alt, label: r.label })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveModalImg({ src: r.src, alt: r.alt, label: r.label });
              }}
              aria-label={`Ver render ampliado: ${r.label}`}
            >
              <div className="t-render-img-wrap">
                <Image
                  src={r.src}
                  alt={r.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="t-render-overlay-hint"><span>🔍 Ampliar</span></div>
              <span className="t-render-label">{r.label}</span>
            </div>
          ))}
        </div>

        {/* Plantas em Grade (Lado a Lado) */}
        <div className="t-plantas-grid">
          {/* Planta Técnica 2D */}
          <div
            className="t-planta-wrap t-planta-wrap--interactive"
            onClick={() => setActiveModalImg({
              src: '/Planta-tecnica.png',
              alt: 'Planta técnica de arquitetura',
              label: 'Planta Técnica 2D — Implantação e Pisos',
            })}
            role="button" tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveModalImg({
                src: '/Planta-tecnica.png',
                alt: 'Planta técnica de arquitetura',
                label: 'Planta Técnica 2D — Implantação e Pisos',
              });
            }}
            aria-label="Ver planta técnica 2D ampliada"
          >
            <div className="t-planta-header">
              <span className="t-planta-icon">📐</span>
              <h3 className="t-planta-title">Planta Técnica 2D</h3>
              <span className="t-planta-zoom-tag">🔍 Ampliar</span>
            </div>
            <div className="t-planta-img-wrap">
              <Image
                src="/Planta-tecnica.png"
                alt="Planta técnica de arquitetura"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                quality={90}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Planta 3D */}
          <div
            className="t-planta-wrap t-planta-wrap--interactive"
            onClick={() => setActiveModalImg({
              src: '/images/planta-3d.png',
              alt: 'Planta 3D do projeto aprovado',
              label: 'Planta 3D — Visualização Espacial Completa',
            })}
            role="button" tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveModalImg({
                src: '/images/planta-3d.png',
                alt: 'Planta 3D do projeto aprovado',
                label: 'Planta 3D — Visualização Espacial Completa',
              });
            }}
            aria-label="Ver planta 3D ampliada"
          >
            <div className="t-planta-header">
              <span className="t-planta-icon">🏠</span>
              <h3 className="t-planta-title">Planta 3D — Espacial</h3>
              <span className="t-planta-zoom-tag">🔍 Ampliar</span>
            </div>
            <div className="t-planta-img-wrap">
              <Image
                src="/images/planta-3d.png"
                alt="Planta 3D do projeto aprovado"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                quality={90}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {/* Nota de personalização */}
        <div className="t-personalize-note">
          <span className="t-personalize-icon">✨</span>
          <p>
            Pode optar por construir exatamente este projeto aprovado ou{' '}
            <strong>ajustar materiais e acabamentos interiores</strong> ao seu gosto —
            a implantação e o licenciamento estão garantidos.
          </p>
        </div>

        <div className="t-cta-center">
          <a href="#formulario" id="cta3_contacto_projeto" className="t-btn t-btn-cta t-cta-scroll">
            <span>Quero Ser Contactado — Saber Mais sobre o Projeto</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalImg && (
        <div className="t-lightbox" onClick={() => setActiveModalImg(null)}>
          <button
            className="t-lightbox-close"
            onClick={() => setActiveModalImg(null)}
            aria-label="Fechar visualização"
          >
            ✕
          </button>
          <div className="t-lightbox-caption">{activeModalImg.label}</div>
          <div className="t-lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activeModalImg.src}
              alt={activeModalImg.alt}
              fill
              sizes="90vw"
              quality={95}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
