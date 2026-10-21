'use client';

import { scrollToForm } from '@/lib/scrollToForm';

// Tabela detalhada de preços que justifica o valor de 51.000€
const pricingRows = [
  {
    item: 'Lote Urbano 233 m² em Quintãs',
    detail: 'Terreno plano com infraestruturas concluídas à porta',
    marketValue: '50.000€',
    included: true,
  },
  {
    item: 'Projeto de Arquitetura Aprovado',
    detail: 'Deferido na Câmara de Aveiro com todas as peças técnicas',
    marketValue: '10.000€',
    included: true,
  },
  {
    item: 'Processo Urbanístico e Implantação',
    detail: 'Implantação e viabilidade deferidas (poupa 12 a 24 meses)',
    marketValue: '2.000€',
    included: true,
  },
  {
    item: 'Modelos Técnicos, 3D e Renders',
    detail: 'Plantas 2D, modelo 3D fotorrealista e renders incluídos',
    marketValue: '3.000€',
    included: true,
  },
];

export default function TerrenosPricing() {
  const totalMarket = '65.000€';

  return (
    <section className="t-section" id="preco">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">INVESTIMENTO NO SEU FUTURO</p>
          <h2 className="t-heading">
            Tudo Incluído para Avançar com a Sua Moradia
          </h2>
          <p className="t-section-sub">
            Investimento direto com o proprietário — <strong>51.000 €</strong> (negociável), sem comissões de mediação imobiliária:
          </p>
        </div>

        {/* ── BANNER DE VALOR DIRETO E TRANSPARENTE ── */}
        <div className="t-promo-pricing-banner">
          <div className="t-promo-pricing-inner">
            <div className="t-promo-pricing-left">
              <span className="t-promo-pricing-flash">OPORTUNIDADE DIRETA COM O PROPRIETÁRIO</span>
              <span className="t-promo-pricing-title">
                Lote de 233 m² com Projeto de Arquitetura Aprovado
              </span>
              <span className="t-promo-pricing-dates">Quintãs, Oliveirinha · A 7 minutos do centro de Aveiro</span>
            </div>
            <div className="t-promo-pricing-right">
              <span className="t-promo-pricing-to">51.000 €</span>
              <span className="t-promo-pricing-neg">Negociável</span>
            </div>
          </div>
        </div>

        {/* Tabela de Preços com Cada Item Discriminado */}
        <div className="t-pricing-table">
          <div className="t-pricing-header">
            <span>O que Está Incluído no Lote</span>
            <span>Valor de Mercado</span>
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
              <span>Valor Total de Mercado Estimado (em separado)</span>
              <span className="t-pricing-total-sub">
                Terreno 233m² + Projeto de Arquitetura Aprovado + Modelos 3D e Renders
              </span>
            </div>
            <div className="t-pricing-total-values">
              <span className="t-pricing-total-market t-pricing-total-market--red">{totalMarket}</span>
              <span className="t-pricing-saving-badge">Poupança direta de 14.000€</span>
            </div>
          </div>

          {/* O Nosso Preço Chave */}
          <div className="t-pricing-our-price">
            <div className="t-pricing-our-info">
              <span className="t-pricing-our-badge">Venda Direta</span>
              <span className="t-pricing-our-label">Preço Total do Lote — Tudo Incluído</span>
              <span className="t-pricing-our-sub">Terreno 233m² + Projeto Aprovado + Plantas + Renders</span>
            </div>
            <div className="t-pricing-our-value">
              <div className="t-pricing-our-price-row">
                <span className="t-pricing-our-amount">51.000 €</span>
                <span className="t-pricing-our-neg">Negociável</span>
              </div>
              <span className="t-pricing-our-direct">Venda Direta · Sem comissões de mediação</span>
            </div>
          </div>
        </div>

        {/* ── DUAS MODALIDADES DE COMPRA & BENEFÍCIO FISCAL UNIFICADO ── */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #10B981',
            borderRadius: '16px',
            padding: '20px 22px',
            marginTop: '20px',
            marginBottom: '24px',
            boxShadow: '0 4px 18px rgba(16, 185, 129, 0.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            {/* Opção 1: Só Lote */}
            <div
              style={{
                background: '#F6FAF7',
                border: '1px solid #D1E7DD',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#059669',
                }}
              >
                Opção 1 · Venda Direta
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                Só Lote c/ Projeto Aprovado
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#064E3B' }}>51.000 €</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#065F46',
                    background: '#ECFDF5',
                    border: '1px solid #10B981',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  Negociável
                </span>
              </div>
              <p style={{ fontSize: '0.80rem', color: '#475569', margin: 0, lineHeight: 1.45 }}>
                Lote plano de 233 m² + projeto de arquitetura deferido pela Câmara de Aveiro. Construa ao seu ritmo ou com o seu próprio empreiteiro.
              </p>
            </div>

            {/* Opção 2: Chave na Mão */}
            <div
              style={{
                background: 'linear-gradient(145deg, #F0FDF4 0%, #FFFFFF 100%)',
                border: '1.5px solid #10B981',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#047857',
                }}
              >
                Opção 2 · Chave na Mão
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                Moradia T3 Construída
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#064E3B' }}>335.000 €</span>
                <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700 }}>Pronta a habitar</span>
              </div>
              <p style={{ fontSize: '0.80rem', color: '#475569', margin: 0, lineHeight: 1.45 }}>
                Construção completa com construtores parceiros qualificados. Moradia acabada com garagem, jardim e eficiência energética.
              </p>
            </div>
          </div>

          {/* Faixa IVA a 6% */}
          <div
            style={{
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '8px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.82rem',
              color: '#065F46',
            }}
          >
            <span style={{ fontSize: '1rem' }}>💶</span>
            <span>
              <strong>Benefício Fiscal:</strong> IVA a 6% na construção para habitação própria permanente (~40.000€ de poupança direta em impostos).
            </span>
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
            <span>Agendar Visita ao Terreno</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
