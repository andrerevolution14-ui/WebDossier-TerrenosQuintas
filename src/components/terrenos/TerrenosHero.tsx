'use client';

import Image from 'next/image';

export default function TerrenosHero() {
  return (
    <section className="t-hero" id="inicio">
      {/* Background image com overlay cinematográfico profundo e nítido */}
      <div className="t-hero-bg">
        <Image
          src="/Curado/2.webp"
          alt="Vista aérea panorâmica do terreno em Quintãs, Oliveirinha, Aveiro"
          fill
          priority
          quality={90}
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

        {/* Título Principal com Sombra Nítida para Máxima Legibilidade */}
        <h1 className="t-hero-headline">
          Lote de Terreno com<br />
          <span className="t-hero-headline-accent">Projeto de Arquitetura Aprovado</span>
        </h1>

        {/* Subtítulo Iluminado e Nítido */}
        <p className="t-hero-sub">
          Lote urbano de 233m² com todas as infraestruturas concluídas, a <strong>7 minutos do centro de Aveiro</strong> e
          com benefício legal de <strong className="t-hero-highlight">IVA a 6% na construção</strong>.
        </p>

        {/* Preço Super Clean: Pura Tipografia, Sem Círculos, Sem Caixas, Sem Ruído */}
        <div className="t-hero-price-pure">
          <div className="t-hero-price-num-row">
            <span className="t-hero-price-val">55.000 €</span>
            <span className="t-hero-price-neg">· Negociável</span>
          </div>
          <p className="t-hero-price-desc">
            Terreno 233 m² + Projeto Aprovado · Venda direta com o proprietário
          </p>
        </div>

        {/* Linha Minimalista de Especificações Nítidas */}
        <div className="t-hero-specs-row">
          <span className="t-hero-spec-item">233 m² Planos</span>
          <span className="t-hero-spec-dot">•</span>
          <span className="t-hero-spec-item">Projeto Aprovado</span>
          <span className="t-hero-spec-dot">•</span>
          <span className="t-hero-spec-item">IVA a 6% na Obra</span>
          <span className="t-hero-spec-dot">•</span>
          <span className="t-hero-spec-item">7 min de Aveiro</span>
        </div>

        {/* Apenas UM Botão no Pre-Scroll */}
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

        {/* Incentivo Elegante ao Scroll (Não é Botão) */}
        <div className="t-hero-scroll-cue" aria-hidden="true">
          <span className="t-hero-scroll-cue-txt">Deslize para explorar fotos e projeto</span>
          <div className="t-hero-scroll-cue-indicator">
            <span className="t-hero-scroll-cue-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
