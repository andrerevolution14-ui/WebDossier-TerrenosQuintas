'use client';

import Image from 'next/image';

export default function TerrenosHero() {
  return (
    <section className="t-hero" id="inicio">
      {/* Background image com overlay cinematográfico profundo */}
      <div className="t-hero-bg">
        <Image
          src="/Curado/2.png"
          alt="Vista aérea panorâmica do terreno em Quintãs, Oliveirinha, Aveiro"
          fill
          priority
          quality={92}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 58%' }}
        />
        <div className="t-hero-overlay" />
      </div>

      {/* Conteúdo Central de Prestígio */}
      <div className="t-wrap t-hero-content">
        {/* Badge Pill Arredondada no topo */}
        <div className="t-hero-topbadge">
          <span>Oportunidade Exclusiva · Visitas Esta Semana · Venda Direta</span>
        </div>

        {/* Eyebrow de Localização */}
        <p className="t-label t-label-accent-light" style={{ marginBottom: '10px', textAlign: 'center', letterSpacing: '0.18em' }}>
          📍 QUINTÃS, OLIVEIRINHA · A 7 MINUTOS DO CENTRO DE AVEIRO
        </p>

        {/* Título Principal de Impacto Arquitetónico */}
        <h1 className="t-hero-headline">
          Lote de Terreno com<br />
          <span className="t-hero-headline-accent">Projeto de Arquitetura Aprovado</span>
        </h1>

        {/* Subtítulo de Qualificação Imediata */}
        <p className="t-hero-sub">
          A <strong>7 minutos do centro de Aveiro</strong>. Lote urbano de 233m² completamente
          infraestruturado e plano. Arranque com a obra sem 2 anos de espera camarária — com benefício
          legal de <strong style={{ color: 'var(--t-beige-light)' }}>IVA a 6% na construção</strong>.
        </p>

        {/* PREÇO DESTACADO DE FORMA DISTINTA DAS CARACTERÍSTICAS */}
        <div className="t-hero-price-showcase">
          <div className="t-hero-price-badge">
            <span>Valor de Venda Direta</span>
          </div>
          <div className="t-hero-price-main">
            <span className="t-hero-price-number">55.000€</span>
            <span className="t-hero-price-tag">Negociável</span>
          </div>
          <p className="t-hero-price-features">
            ✓ Terreno 233m² + Projeto Aprovado + 3D e Renders · Sem comissões de imobiliária
          </p>
        </div>

        {/* Grelha de Métricas Arquitetónicas: 4 Caraterísticas Principais */}
        <div className="t-badges-grid">
          <div className="t-badge-pill">
            <span className="t-badge-icon">📍</span>
            <div>
              <span className="t-badge-label">Localização</span>
              <span className="t-badge-value">7 min de Aveiro</span>
            </div>
          </div>

          <div className="t-badge-pill">
            <span className="t-badge-icon">📐</span>
            <div>
              <span className="t-badge-label">Área do Lote</span>
              <span className="t-badge-value">233 m² Planos</span>
            </div>
          </div>

          <div className="t-badge-pill">
            <span className="t-badge-icon">🏛️</span>
            <div>
              <span className="t-badge-label">Projeto Aprovado</span>
              <span className="t-badge-value">Câmara Aveiro</span>
            </div>
          </div>

          <div className="t-badge-pill">
            <span className="t-badge-icon">💶</span>
            <div>
              <span className="t-badge-label">IVA na Construção</span>
              <span className="t-badge-value">Taxa Reduzida 6%</span>
            </div>
          </div>
        </div>

        {/* CTA Principal de Alto Nível */}
        <div className="t-hero-cta-wrap">
          <a
            href="#formulario"
            className="t-btn t-btn-cta t-btn-lg t-cta-scroll"
            id="cta_hero_contacto"
          >
            <span>Quero Ser Contactado Diretamente</span>
            <span className="t-btn-arrow">↓</span>
          </a>
        </div>

        {/* Micro-pills de Confiança — Ocultas no Mobile conforme solicitado */}
        <div className="t-hero-checklist">
          <span>✓ Infraestruturas Concluídas à Porta</span>
          <span>•</span>
          <span>✓ IVA a 6% na Construção da Moradia</span>
          <span>•</span>
          <span>✓ Plantas 2D, 3D e Renders Incluídos</span>
          <span>•</span>
          <span>✓ Sem Comissões de Imobiliária</span>
        </div>
      </div>

      {/* Indicador de Scroll Dinâmico */}
      <div className="t-scroll-hint">
        <span className="t-scroll-line" />
      </div>
    </section>
  );
}
