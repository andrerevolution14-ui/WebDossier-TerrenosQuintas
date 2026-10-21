'use client';

import { useState } from 'react';
import Image from 'next/image';
import TerrenosLightbox, { LightboxImage } from './TerrenosLightbox';
import { scrollToForm } from '@/lib/scrollToForm';

const projectGallery: LightboxImage[] = [
  { src: '/Exterior Capa.webp', alt: 'Render fachada exterior frontal', label: 'Fachada Principal' },
  { src: '/Exterior traseiro completo.webp', alt: 'Render exterior traseiro', label: 'Vista Traseira' },
  { src: '/Sala de Jantar.webp', alt: 'Render interior sala de jantar', label: 'Sala de Jantar' },
  { src: '/Quarto e varanda.webp', alt: 'Render quarto com varanda', label: 'Quarto c/ Varanda' },
  { src: '/Cozinha.webp', alt: 'Render cozinha', label: 'Cozinha' },
  { src: '/Terceiro Andar.webp', alt: 'Render terceiro andar', label: 'Piso Superior' },
  { src: '/planta-tecnica.webp', alt: 'Planta técnica de arquitetura cotada com distribuição dos pisos', label: 'Planta Técnica 2D' },
  { src: '/planta-3d.webp', alt: 'Planta 3D do projeto aprovado com modelo espacial', label: 'Planta 3D Espacial' },
];

export default function TerrenosProject() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <section className="t-section t-section--dark" id="projeto">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">PROJETO DE ARQUITETURA APROVADO</p>
          <h2 className="t-heading">
            Projeto de Arquitetura Aprovado<br />
            <span style={{ color: '#059669' }}>pela Câmara Municipal de Aveiro</span>
          </h2>
          <p className="t-section-sub">
            Renders fotorrealistas, plantas 2D e modelo 3D incluídos no valor do lote — <strong>51.000 €</strong> (negociável).
          </p>
        </div>

        {/* Banner de destaque */}
        <div className="t-approved-banner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="t-approved-check" style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
            <span>
              <strong>PROJETO DE ARQUITETURA APROVADO</strong> — Poupa 12 a 24 meses de aprovações
            </span>
          </div>
          <p style={{ fontSize: '0.80rem', color: '#065F46', margin: 0, lineHeight: 1.4 }}>
            <em>Projeto deferido pela Câmara de Aveiro. Requer aditamento administrativo das especialidades para emissão da licença (Simplex).</em>
          </p>
        </div>

        {/* Estrutura: Betão ou LSF */}
        <div className="t-structure-options">
          <p className="t-structure-title">Liberdade de Escolha do Sistema Construtivo:</p>
          <div className="t-structure-grid">
            <div className="t-structure-card">
              <span className="t-structure-icon">🏗️</span>
              <div>
                <span className="t-structure-name">Betão Armado</span>
                <span className="t-structure-desc">Construção tradicional consolidada e duradoura.</span>
              </div>
            </div>
            <div className="t-structure-card">
              <span className="t-structure-icon">⚡</span>
              <div>
                <span className="t-structure-name">LSF (Light Steel Framing)</span>
                <span className="t-structure-desc">Aço leve, rapidez de execução e alta eficiência energética.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de renders (itens 0 a 5) */}
        <div className="t-renders-grid">
          {projectGallery.slice(0, 6).map((r, idx) => (
            <div
              key={r.src}
              className="t-render-card t-render-card--interactive"
              onClick={() => setCurrentIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setCurrentIndex(idx);
              }}
              aria-label={`Ver imagem ampliada de ${r.label}`}
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
              <div className="t-render-label">{r.label}</div>
              <div className="t-render-overlay-hint">🔍 Ampliar</div>
            </div>
          ))}
        </div>

        {/* Plantas em Grade (itens 6 e 7) */}
        <div className="t-plantas-grid">
          {/* Planta Técnica 2D (item 6) */}
          <div
            className="t-planta-wrap t-planta-wrap--interactive"
            onClick={() => setCurrentIndex(6)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setCurrentIndex(6);
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
                src="/planta-tecnica.webp"
                alt="Planta técnica de arquitetura"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                quality={90}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Planta 3D (item 7) */}
          <div
            className="t-planta-wrap t-planta-wrap--interactive"
            onClick={() => setCurrentIndex(7)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setCurrentIndex(7);
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
                src="/planta-3d.webp"
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
          <p>
            <strong>Personalização Disponível:</strong> Pode ajustar materiais, acabamentos e layout interior
            conforme a sua preferência. A volumetria exterior principal já está deferida pela Câmara Municipal de Aveiro.
          </p>
        </div>

        {/* Duas Opções de Aquisição */}
        <div
          style={{
            marginTop: '24px',
            background: '#FFFFFF',
            border: '1.5px solid #A7F3D0',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', marginBottom: '3px' }}>
              Opções: 51.000 € (Só Lote c/ Projeto) ou 335.000 € (Chave na Mão)
            </div>
            <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
              Construa com o seu próprio empreiteiro ou receba a moradia pronta a habitar com construtores parceiros.
            </p>
          </div>
          <a
            href="#formulario"
            onClick={scrollToForm}
            id="cta_project_moradia_pronta"
            className="t-btn t-btn-outline"
            style={{ padding: '8px 16px', fontSize: '0.82rem', borderColor: '#10B981', color: '#0F172A', whiteSpace: 'nowrap' }}
          >
            <span>Consultar Opções →</span>
          </a>
        </div>

        <div className="t-cta-center">
          <a
            href="#formulario"
            onClick={scrollToForm}
            className="t-btn t-btn-cta t-cta-scroll"
            id="cta_project_contacto"
          >
            <span>Agendar Visita e Conhecer o Projeto</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>

      {/* Lightbox Ultra-Rápido via Portal (0ms de latência, sem bugs) */}
      <TerrenosLightbox
        images={projectGallery}
        currentIndex={currentIndex}
        onClose={() => setCurrentIndex(null)}
        onIndexChange={(idx) => setCurrentIndex(idx)}
      />
    </section>
  );
}
