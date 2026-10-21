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
        <div className="t-approved-banner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="t-approved-check" style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
            <span>
              <strong>PROJETO DE ARQUITETURA APROVADO</strong> — Poupa 12 a 24 meses de prazos de aprovação
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#065F46', margin: 0, lineHeight: 1.45 }}>
            <em>Nota técnica: Projeto formalmente deferido pela Câmara de Aveiro. Requer aditamento administrativo para emissão da licença de construção com os termos de responsabilidade das especialidades (Simplex Urbanístico).</em>
          </p>
        </div>

        {/* Estrutura: Betão ou LSF */}
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

        {/* Duas Opções de Compra para Este Lote */}
        <div
          style={{
            marginTop: '28px',
            background: '#FFFFFF',
            border: '1.5px solid #D1E7DD',
            borderRadius: '16px',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#059669' }}>
              Duas Opções de Aquisição
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
              51.000 € (Só Lote c/ Projeto) ou 335.000 € (Chave na Mão)
            </span>
          </div>
          <p style={{ fontSize: '0.90rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
            Este lote pode ser comprado só com o projeto de arquitetura aprovado (<strong>51.000 € negociável</strong>),
            ou com a moradia construída chave na mão (<strong>335.000 €</strong>). Caso prefira que cuidemos da construção de início ao fim,
            o projeto <strong>Domaine XXV</strong> está estruturado com empreiteiros parceiros qualificados para execução rigorosa neste mesmo lote.
          </p>
          <div style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
            <a
              href="#formulario"
              onClick={scrollToForm}
              id="cta_project_moradia_pronta"
              className="t-btn t-btn-outline"
              style={{ padding: '8px 18px', fontSize: '0.84rem', borderColor: '#10B981', color: '#0F172A' }}
            >
              <span>Consultar Opções de Aquisição (Lote ou Chave na Mão) →</span>
            </a>
          </div>
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
