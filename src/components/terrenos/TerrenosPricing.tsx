'use client';

import { scrollToForm } from '@/lib/scrollToForm';

// Tabela detalhada de preços que justifica o valor de 55.000€
const pricingRows = [
  {
    item: 'Valor Justo do Terreno (comparativo em Quintãs)',
    detail: 'Lote plano 233 m² com frente de rua e infraestruturas prontas',
    marketValue: '55.000€',
    included: true,
  },
  {
    item: 'Projeto de Arquitetura Completo e Aprovado',
    detail: 'Peças desenhadas e especialidades aprovadas na Câmara de Aveiro',
    marketValue: '10.000€',
    included: true,
  },
  {
    item: 'PIP + Aprovação Camarária Deferida',
    detail: 'Viabilidade urbanística garantida (poupa 12 a 24 meses de espera)',
    marketValue: '1.500€',
    included: true,
  },
  {
    item: 'Materiais Técnicos e Modelo 3D (Plantas & Renders)',
    detail: 'Planta técnica cotada 2D, modelo 3D e renders fotorrealistas',
    marketValue: '3.500€',
    included: true,
  },
];

export default function TerrenosPricing() {
  const totalMarket = '70.000€';

  return (
    <section className="t-section" id="preco">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">💶 / INVESTIMENTO NO SEU FUTURO</p>
          <h2 className="t-heading">
            💎 Tudo Incluído para Começar a Construir
          </h2>
          <p className="t-section-sub">
            Investimento completo para a sua nova moradia com <strong>desconto de 4.000€</strong> nesta semana:
          </p>
        </div>

        {/* ── BANNER PROMO SEMANAL (DESCONTO DE INTERESSE) ── */}
        <div className="t-promo-pricing-banner">
          <div className="t-promo-pricing-inner">
            <div className="t-promo-pricing-left">
              <span className="t-promo-pricing-flash">✨ DESCONTO DE INTERESSE NESTA SEMANA</span>
              <span className="t-promo-pricing-title">
                Reserve esta semana e garanta <strong>-4.000€ de desconto imediato</strong>
              </span>
              <span className="t-promo-pricing-dates">🏷️ Válido de 12 a 16 de Outubro de 2026</span>
            </div>
            <div className="t-promo-pricing-right">
              <span className="t-promo-pricing-from">De <s>55.000€</s></span>
              <span className="t-promo-pricing-to">51.000€</span>
              <span className="t-promo-pricing-neg">Ainda Negociável</span>
            </div>
          </div>
        </div>

        {/* Tabela de Preços com Cada Item Discriminado */}
        <div className="t-pricing-table">
          <div className="t-pricing-header">
            <span>📋 O que Está Incluído no Lote</span>
            <span>💶 Valor de Mercado</span>
          </div>

          {pricingRows.map((row) => (
            <div key={row.item} className="t-pricing-row">
              <div className="t-pricing-item">
                <div className="t-pricing-check">✓</div>
                <div className="t-pricing-text">
                  <span className="t-pricing-name">{row.item}</span>
                  <span className="t-pricing-detail">{row.detail}</span>
                </div>
              </div>
              <div className="t-pricing-market-box">
                <span className="t-pricing-market-tag-label">Avaliado em</span>
                <span className="t-pricing-market-val">{row.marketValue}</span>
              </div>
            </div>
          ))}

          {/* Total de Mercado com Poupança */}
          <div className="t-pricing-total-row">
            <div className="t-pricing-total-label">
              <span>Valor Total de Mercado (em separado)</span>
              <span className="t-pricing-total-sub">
                Terreno 233m² + Projeto Aprovado + PIP + Modelos 3D e Renders
              </span>
            </div>
            <div className="t-pricing-total-values">
              <span className="t-pricing-total-market t-pricing-total-market--red">{totalMarket}</span>
              <span className="t-pricing-saving-badge">🏷️ Poupança direta de 19.000€</span>
            </div>
          </div>

          {/* O Nosso Preço Chave */}
          <div className="t-pricing-our-price">
            <div className="t-pricing-our-info">
              <span className="t-pricing-our-badge">✨ Desconto de Interesse</span>
              <span className="t-pricing-our-label">Preço Total do Lote — Tudo Incluído</span>
              <span className="t-pricing-our-sub">Terreno 233m² + Projeto Aprovado + Plantas + Renders</span>
            </div>
            <div className="t-pricing-our-value">
              <div className="t-pricing-our-price-row">
                <span className="t-pricing-our-original">55.000€</span>
                <span className="t-pricing-our-amount">51.000€</span>
                <span className="t-pricing-our-neg">Negociável</span>
              </div>
              <span className="t-pricing-our-direct">Venda Direta · Desconto de 4.000€ até 16/Out</span>
            </div>
          </div>
        </div>

        {/* Benefício Fiscal: IVA a 6% na Construção */}
        <div
          style={{
            background: '#F0FDF4',
            border: '1.5px solid #10B981',
            borderRadius: '16px',
            padding: '22px 26px',
            marginTop: '24px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.08)',
          }}
        >
          <span style={{ fontSize: '1.6rem', flexShrink: 0, marginTop: '2px' }}>💎</span>
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.70rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #10B981',
                padding: '3px 10px',
                borderRadius: '9999px',
                marginBottom: '6px',
              }}
            >
              Poupança Que Muda Tudo
            </span>
            <span style={{ display: 'block', fontSize: '1.02rem', fontWeight: 700, color: '#064E3B', marginBottom: '4px' }}>
              IVA a 6% na Construção = ~40.000€ que ficam no seu bolso
            </span>
            <p style={{ fontSize: '0.90rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
              Enquanto outros pagam 23% de IVA na construção, a sua moradia em Quintãs qualifica-se para
              a <strong>taxa reduzida de 6%</strong>. São quase <strong>40.000€ poupados</strong> — dinheiro
              que pode investir nos acabamentos de sonho, na piscina, ou naquelas férias em família.
            </p>
          </div>
        </div>

        {/* Opção Moradia Já Construída Verdemont */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #D1E7DD',
            borderRadius: '16px',
            padding: '22px 26px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#059669' }}>
              ✦ Prefere Entrar Já? Moradia Pronta a Habitar
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              335.000€ Chave na Mão
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
            Se o seu sonho não pode esperar — a moradia Domaine XXV já terminada, com jardim de ~82 m², garagem
            coberta e acabamentos de luxo. Avaliação bancária de <strong>450.000€</strong>.
          </p>
          <div style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
            <a
              href="#formulario"
              onClick={scrollToForm}
              id="cta_pricing_moradia_pronta"
              className="t-btn t-btn-outline"
              style={{ color: 'var(--text-primary)', borderColor: '#10B981' }}
            >
              <span>Quero Saber Mais Sobre a Moradia Pronta →</span>
            </a>
          </div>
        </div>

        {/* Botão de Contacto */}
        <div className="t-cta-center">
          <a
            href="#formulario"
            onClick={scrollToForm}
            id="cta_pricing_contacto"
            className="t-btn t-btn-cta t-cta-scroll"
          >
            <span>📅 Quero Garantir o Desconto de -4.000€</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
