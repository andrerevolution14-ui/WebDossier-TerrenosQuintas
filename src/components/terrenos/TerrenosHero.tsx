'use client';

import Image from 'next/image';

export default function TerrenosHero() {
  return (
    <section className="t-hero-v2" id="inicio">
      {/* ── TOP AREA: FOTO REAL DE QUINTÃS COM ENQUADRAMENTO CINEMATOGRÁFICO ── */}
      <div className="t-hero-photo-wrap">
        <Image
          src="/Curado/1.webp"
          alt="Lote de Terreno em Quintãs, Oliveirinha, Aveiro"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="t-hero-photo-img"
          style={{ objectFit: 'cover', objectPosition: '64% 20%' }}
        />
        {/* Gradiente cinematográfico suave na base */}
        <div className="t-hero-photo-gradient" />

        {/* Botão flutuante minimalista de localização no topo direito */}
        <a href="#localizacao" className="t-hero-floating-map" title="Ver Localização no Mapa" aria-label="Localização">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </a>

        {/* ── Quintãs & Oliveirinha: Tipografia Editorial Pura sobre o Asfalto/Gradiente ── */}
        <div className="t-hero-photo-bottom-title">
          <h1 className="t-hero-photo-headline">QUINTÃS</h1>
          <p className="t-hero-photo-location">OLIVEIRINHA · AVEIRO</p>
        </div>
      </div>

      {/* ── BOTTOM CARD: LUXURY IVORY CARD INTEGRADO ── */}
      <div className="t-hero-card-wrap">
        <div className="t-hero-card">
          {/* Badge de Confiança Esmeralda (Linha Única Sem Quebras) */}
          <div className="t-hero-badge-pill">
            <span className="t-hero-badge-dot" />
            <span>Venda Direta · Sem Comissões</span>
          </div>

          {/* Título Principal Arquitetónico */}
          <h2 className="t-hero-card-title">
            <span className="t-hero-card-title-sub">Lote de Terreno com</span>
            <span className="t-hero-card-title-main">Projeto de Arquitetura Aprovado</span>
          </h2>

          {/* Subtítulo Sucinto e Fluido */}
          <p className="t-hero-card-desc">
            Lote urbano de 233m² com todas as infraestruturas concluídas, a <strong className="t-contrast-dark">7 minutos do centro de Aveiro</strong> e com benefício legal de <strong className="t-tax-accent">IVA a 6% na construção</strong>.
          </p>

          {/* Painel Inset Sand/Champagne de Alto Prestígio (Layout Centrado Perfeito) */}
          <div className="t-hero-price-panel">
            {/* Preço e Status em Bloco Centrado (Nunca Quebra o Símbolo €) */}
            <div className="t-hero-price-center">
              <span className="t-hero-price-figure">55.000 €</span>
              <span className="t-hero-price-status">Negociável</span>
            </div>

            {/* Grelha de 2 Colunas com Espaço Confortável (Sem Cortes) */}
            <div className="t-hero-specs-grid">
              <div className="t-hero-spec-pill">
                <span className="t-spec-icon-box">📐</span>
                <span>233 m² Planos</span>
              </div>
              <div className="t-hero-spec-pill">
                <span className="t-spec-icon-box">🏛️</span>
                <span>Projeto Aprovado</span>
              </div>
            </div>

            {/* Destaque Financeiro & Especificações Perfeitamente Centradas */}
            <div className="t-hero-specs-details">
              <div className="t-highlight-chip">
                <span>💰</span>
                <span>Poupança estimada ~40.000€ com IVA a 6%</span>
              </div>
              <div className="t-specs-subline">
                <span>7 min de Aveiro</span>
                <span className="t-hero-dot">•</span>
                <span>Infraestruturas Prontas</span>
                <span className="t-hero-dot">•</span>
                <span>Venda Direta</span>
              </div>
            </div>
          </div>

          {/* Botão de Contacto Dourado Acetinado de Alta Conversão */}
          <div className="t-hero-cta-area">
            <a href="#formulario" className="t-hero-btn-sand" id="cta_hero_contacto">
              <span>Quero Ser Contactado</span>
              <span className="t-btn-arrow">→</span>
            </a>
          </div>

          {/* Incentivo ao Scroll Elegante e Suave */}
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
