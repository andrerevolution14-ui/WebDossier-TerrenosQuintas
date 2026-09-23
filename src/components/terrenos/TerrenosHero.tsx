'use client';

import Image from 'next/image';

export default function TerrenosHero() {
  return (
    <section className="t-hero" id="inicio">
      {/* Background image com overlay cinematográfico profundo e nítido */}
      <div className="t-hero-bg">
        <Image
          src="/Curado/2.png"
          alt="Vista aérea panorâmica do terreno em Quintãs, Oliveirinha, Aveiro"
          fill
          priority
          quality={95}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 58%' }}
        />
        <div className="t-hero-overlay" />
      </div>

      {/* Conteúdo Central Clean, Sofisticado e sem Ruído */}
      <div className="t-wrap t-hero-content">
        {/* Eyebrow de Localização */}
        <p className="t-hero-eyebrow">
          QUINTÃS, OLIVEIRINHA · AVEIRO
        </p>

        {/* Título Principal */}
        <h1 className="t-hero-headline">
          Lote de Terreno com<br />
          <span className="t-hero-headline-accent">Projeto de Arquitetura Aprovado</span>
        </h1>

        {/* Subtítulo Clean */}
        <p className="t-hero-sub">
          Lote urbano de 233m² com todas as infraestruturas concluídas, a <strong>7 minutos do centro de Aveiro</strong> e
          com benefício legal de <strong style={{ color: 'var(--t-beige-light)' }}>IVA a 6% na construção</strong>.
        </p>

        {/* Preço Clean e Simples */}
        <div className="t-hero-price-clean">
          <div className="t-hero-price-clean-row">
            <span className="t-hero-price-amount">55.000 €</span>
            <span className="t-hero-price-subtag">Negociável</span>
          </div>
          <span className="t-hero-price-info">
            Terreno 233m² + Projeto Aprovado · Venda direta sem comissões
          </span>
        </div>

        {/* Linha Minimalista de Especificações */}
        <div className="t-hero-specs-row">
          <span className="t-hero-spec-item">233 m² Planos</span>
          <span className="t-hero-spec-dot">•</span>
          <span className="t-hero-spec-item">Projeto Aprovado</span>
          <span className="t-hero-spec-dot">•</span>
          <span className="t-hero-spec-item">IVA a 6% na Obra</span>
          <span className="t-hero-spec-dot">•</span>
          <span className="t-hero-spec-item">7 min de Aveiro</span>
        </div>

        {/* Botão Pequeno e Delicado */}
        <div className="t-hero-cta-wrap">
          <a
            href="#formulario"
            className="t-btn t-btn-cta t-cta-scroll"
            id="cta_hero_contacto"
          >
            <span>Quero Ser Contactado</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
