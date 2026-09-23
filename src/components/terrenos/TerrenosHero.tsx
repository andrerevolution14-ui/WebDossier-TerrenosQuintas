'use client';

import Image from 'next/image';

export default function TerrenosHero() {
  return (
    <section className="t-hero-v2" id="inicio">
      {/* ── TOP AREA: FOTO REAL DE QUINTÃS CENTRADA À ESQUERDA (SEM SOMBRA NO TOPO) ── */}
      <div className="t-hero-photo-wrap">
        <Image
          src="/Curado/1.webp"
          alt="Lote de Terreno em Quintãs, Oliveirinha, Aveiro"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="t-hero-photo-img"
          style={{ objectFit: 'cover', objectPosition: '20% 35%' }}
        />
        {/* Gradiente apenas na base rente ao bloco, sem sombra no topo */}
        <div className="t-hero-photo-gradient" />

        {/* ── Top Bar: Domaine XXV Dossier com logo bem destacado e visível ── */}
        <div className="t-hero-top-bar">
          <div className="t-hero-brand-badge">
            <div className="t-hero-brand-logo-mark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E2CBA8" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#E2CBA8" />
                <path d="M7 17V7l5 5 5-5v10" stroke="#E2CBA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="t-hero-brand-text">
              <span className="t-hero-brand-name">DOMAINE XXV</span>
              <span className="t-hero-brand-sub">DOSSIER DE TERRENOS</span>
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

        {/* ── Quintãs & Oliveirinha: Puxado Para Baixo Rente ao Bloco e Bem Destacado ── */}
        <div className="t-hero-photo-bottom-title">
          <h1 className="t-hero-photo-headline">QUINTÃS</h1>
          <p className="t-hero-photo-location">OLIVEIRINHA · AVEIRO</p>
        </div>
      </div>

      {/* ── BOTTOM CARD: LUXURY IVORY CARD CENTRADO (Sem o bloco do prédio) ── */}
      <div className="t-hero-card-wrap">
        <div className="t-hero-card">
          {/* Badge de Oportunidade Direta */}
          <div className="t-hero-badge-pill">
            <span className="t-hero-badge-dot" />
            <span>Venda Direta com o Proprietário · Sem Comissões</span>
          </div>

          {/* Título Principal Puxado para Cima com Tipografia Super Legível */}
          <h2 className="t-hero-card-title">
            <span className="t-hero-card-title-sub">Lote de Terreno com</span>
            <span className="t-hero-card-title-main">Projeto de Arquitetura Aprovado</span>
          </h2>

          {/* Subtítulo Sucinto, Direto e com Vida */}
          <p className="t-hero-card-desc">
            Lote urbano de 233m² com todas as infraestruturas concluídas, a <strong>7 minutos do centro de Aveiro</strong> e com benefício legal de <strong className="t-tax-accent">IVA a 6% na construção</strong>.
          </p>

          {/* Caixa Reentrante Bege/Sand Otimizada para Decisão e Venda */}
          <div className="t-hero-price-panel">
            <div className="t-hero-price-header">
              <span className="t-hero-price-figure">55.000 €</span>
              <span className="t-hero-price-status">Negociável</span>
            </div>

            {/* Duas Colunas com Ícones Dourados */}
            <div className="t-hero-specs-grid">
              <div className="t-hero-spec-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9E7D4E" strokeWidth="1.8">
                  <path d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7" />
                  <path d="M9 10v.01M9 14v.01" />
                </svg>
                <span>233 m² Planos</span>
              </div>
              <div className="t-hero-spec-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9E7D4E" strokeWidth="1.8">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
                <span>Projeto Aprovado</span>
              </div>
            </div>

            {/* Linha Fina de Destaques Técnicos */}
            <div className="t-hero-specs-details">
              <span className="t-highlight-chip">Poupança ~40.000€ com IVA a 6%</span>
              <div className="t-specs-subline">
                <span>7 min de Aveiro</span>
                <span className="t-hero-dot">•</span>
                <span>Infraestruturas Prontas</span>
                <span className="t-hero-dot">•</span>
                <span>Venda Direta</span>
              </div>
            </div>
          </div>

          {/* Botão de Contacto Otimizado para Venda */}
          <div className="t-hero-cta-area">
            <a href="#formulario" className="t-hero-btn-sand" id="cta_hero_contacto">
              <span>Quero Ser Contactado</span>
              <span className="t-btn-arrow">→</span>
            </a>
          </div>

          {/* Incentivo ao Scroll com Mais Presença e Vida */}
          <a href="#galeria" className="t-hero-scroll-cue-link" aria-label="Deslize para ver fotos e plantas">
            <span className="t-hero-scroll-label">Deslize para ver fotos, plantas e projeto</span>
            <div className="t-hero-scroll-cue-circle">
              <span className="t-hero-scroll-arrow">↓</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
