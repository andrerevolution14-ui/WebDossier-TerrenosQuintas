'use client';

import Image from 'next/image';

export default function TerrenosHero() {
  return (
    <section className="t-hero-v2" id="inicio">
      {/* ── TOP AREA: FOTO REAL DE QUINTÃS COM O LOTE CENTRADO ── */}
      <div className="t-hero-photo-wrap">
        <Image
          src="/Curado/1.webp"
          alt="Lote de Terreno em Quintãs, Oliveirinha, Aveiro"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="t-hero-photo-img"
          style={{ objectFit: 'cover', objectPosition: '64% 38%' }}
        />
        {/* Gradiente sutil na base rente ao bloco */}
        <div className="t-hero-photo-gradient" />

        {/* Botão flutuante minimalista de localização no topo direito */}
        <a href="#localizacao" className="t-hero-floating-map" title="Ver Localização no Mapa" aria-label="Localização">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </a>

        {/* ── Quintãs & Oliveirinha: Tipografia Editorial Rente ao Bloco ── */}
        <div className="t-hero-photo-bottom-title">
          <h1 className="t-hero-photo-headline">QUINTÃS</h1>
          <p className="t-hero-photo-location">OLIVEIRINHA · AVEIRO</p>
        </div>
      </div>

      {/* ── BOTTOM CARD: AESTHETIC LUXURY CARD COM TUDO VISÍVEL NO PRÉ-SCROLL ── */}
      <div className="t-hero-card-wrap">
        <div className="t-hero-card">
          {/* Badge de Confiança Esmeralda */}
          <div className="t-hero-badge-pill">
            <span className="t-hero-badge-dot" />
            <span>Venda Direta com Proprietário · Sem Comissões</span>
          </div>

          {/* Título Principal Compacto e Marcante */}
          <h2 className="t-hero-card-title">
            <span className="t-hero-card-title-sub">Lote de Terreno com</span>
            <span className="t-hero-card-title-main">Projeto de Arquitetura Aprovado</span>
          </h2>

          {/* Subtítulo Sucinto */}
          <p className="t-hero-card-desc">
            Lote plano de 233m² a <strong className="t-contrast-dark">7 min do centro de Aveiro</strong> com benefício de <strong className="t-tax-accent">IVA a 6% na obra</strong>.
          </p>

          {/* Painel de Preço & Especificações Integrado e Ultra-Aesthetic */}
          <div className="t-hero-price-panel">
            <div className="t-hero-price-header">
              <div className="t-hero-price-left">
                <span className="t-hero-price-figure">55.000 €</span>
                <span className="t-hero-price-status">Negociável</span>
              </div>
              <div className="t-highlight-chip">
                <span>💰</span>
                <span>Poupança ~40.000€ (IVA 6%)</span>
              </div>
            </div>

            {/* Micro-pills de Especificações */}
            <div className="t-hero-specs-grid">
              <div className="t-hero-spec-pill">
                <span className="t-spec-icon-box">📐</span>
                <span>233 m² Planos</span>
              </div>
              <div className="t-hero-spec-pill">
                <span className="t-spec-icon-box">🏛️</span>
                <span>Projeto Aprovado</span>
              </div>
              <div className="t-hero-spec-pill">
                <span className="t-spec-icon-box">⚡</span>
                <span>Infraestruturas</span>
              </div>
            </div>
          </div>

          {/* Botão de Contacto Dourado — Visível Imediatamente Sem Dar Scroll */}
          <div className="t-hero-cta-area">
            <a href="#formulario" className="t-hero-btn-sand" id="cta_hero_contacto">
              <span>Quero Ser Contactado</span>
              <span className="t-btn-arrow">→</span>
            </a>
          </div>

          {/* Incentivo ao Scroll Elegante e Compacto */}
          <a href="#galeria" className="t-hero-scroll-cue-link" aria-label="Deslize para ver fotos e plantas">
            <span className="t-hero-scroll-label">Deslize para ver fotos e plantas</span>
            <div className="t-hero-scroll-cue-circle">
              <span className="t-hero-scroll-arrow">↓</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
