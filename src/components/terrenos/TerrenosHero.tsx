'use client';

import Image from 'next/image';

export default function TerrenosHero() {
  return (
    <section className="t-hero-v2" id="inicio">
      {/* ── TOP AREA: FOTO REAL DE QUINTÃS COM TÍTULO MONUMENTAL (Estilo Image 2) ── */}
      <div className="t-hero-photo-wrap">
        <Image
          src="/Curado/1.webp"
          alt="Lote de Terreno em Quintãs, Oliveirinha, Aveiro"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="t-hero-photo-img"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="t-hero-photo-gradient" />

        {/* Barra Superior Discreta de Prestígio */}
        <div className="t-hero-top-bar">
          <div className="t-hero-brand-mark">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C5A880" strokeWidth="1.6">
              <path d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7" />
              <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
            </svg>
            <div className="t-hero-brand-text">
              <span className="t-hero-brand-name">PRIME</span>
              <span className="t-hero-brand-sub">DOSSIER</span>
            </div>
          </div>
          <div className="t-hero-top-actions">
            <a href="#localizacao" className="t-hero-action-icon" title="Ver Localização no Mapa" aria-label="Localização">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Título Centralizado na Foto (Idêntico à Imagem 2) */}
        <div className="t-hero-photo-center">
          <h1 className="t-hero-photo-headline">QUINTÃS</h1>
          <p className="t-hero-photo-location">OLIVEIRINHA · AVEIRO</p>
        </div>
      </div>

      {/* ── BOTTOM CARD: LUXURY IVORY CARD CENTRADO (Idêntico à Imagem 2) ── */}
      <div className="t-hero-card-wrap">
        <div className="t-hero-card">
          {/* Ícone Arquitetónico de Fachada */}
          <div className="t-hero-card-icon-wrap">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#B89366" strokeWidth="1.4">
              <path d="M4 22h16M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
              <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
            </svg>
          </div>

          {/* Título Principal em Tipografia Limpa e Ultra-Legível */}
          <h2 className="t-hero-card-title">
            <span className="t-hero-card-title-sub">Lote de Terreno com</span>
            <span className="t-hero-card-title-main">Projeto de Arquitetura Aprovado</span>
          </h2>

          {/* Subtítulo Sucinto e Direto */}
          <p className="t-hero-card-desc">
            Lote urbano de 233m² com todas as infraestruturas concluídas, a <strong>7 minutos do centro de Aveiro</strong> e com benefício legal de <strong style={{ color: '#8A6836' }}>IVA a 6% na construção</strong>.
          </p>

          {/* Caixa Reentrante Bege/Sand (Idêntico à Imagem 2) */}
          <div className="t-hero-price-panel">
            <div className="t-hero-price-header">
              <span className="t-hero-price-figure">55.000 €</span>
              <span className="t-hero-price-status">Negociável</span>
            </div>

            {/* Duas Colunas com Ícones Dourados */}
            <div className="t-hero-specs-grid">
              <div className="t-hero-spec-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9E7D4E" strokeWidth="1.6">
                  <path d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7" />
                  <path d="M9 10v.01M9 14v.01" />
                </svg>
                <span>233 m² Planos</span>
              </div>
              <div className="t-hero-spec-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9E7D4E" strokeWidth="1.6">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
                <span>Projeto Aprovado</span>
              </div>
            </div>

            {/* Linha Fina de Destaques Técnicos */}
            <div className="t-hero-specs-details">
              <span>IVA a 6% na Obra</span>
              <span className="t-hero-dot">•</span>
              <span>Projeto Aprovado</span>
              <span className="t-hero-dot">•</span>
              <span>7 min de Aveiro</span>
              <br className="t-specs-br" />
              <span className="t-specs-inline-sep">•</span>
              <span>Venda direta com o proprietário</span>
            </div>
          </div>

          {/* Botão de Contacto Exclusivo (Idêntico à Imagem 2) */}
          <div className="t-hero-cta-area">
            <a href="#formulario" className="t-hero-btn-sand" id="cta_hero_contacto">
              <span>Quero Ser Contactado</span>
              <span className="t-btn-arrow">→</span>
            </a>
          </div>

          {/* Incentivo ao Scroll Elegante (Sem ser Botão) */}
          <div className="t-hero-scroll-cue-wrap">
            <span className="t-hero-scroll-label">Deslize para ver fotos e plantas</span>
            <div className="t-hero-scroll-line">
              <span className="t-hero-scroll-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
