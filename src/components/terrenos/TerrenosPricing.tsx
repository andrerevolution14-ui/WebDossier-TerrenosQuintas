'use client';

import { scrollToForm } from '@/lib/scrollToForm';

// Tabela detalhada de preços que justifica o valor de 51.000€
const pricingRows = [
  {
    item: 'Lote Urbano 233 m² em Quintãs',
    detail: 'Terreno plano com frente de rua e todas as infraestruturas prontas à porta',
    marketValue: '50.000€',
    included: true,
  },
  {
    item: 'Projeto de Arquitetura Aprovado',
    detail: 'Projeto deferido pela Câmara de Aveiro com peças desenhadas e escritas',
    marketValue: '10.000€',
    included: true,
  },
  {
    item: 'Processo Urbanístico e Implantação',
    detail: 'Viabilidade e implantação já deferidas (poupa 12 a 24 meses de espera)',
    marketValue: '2.000€',
    included: true,
  },
  {
    item: 'Materiais Técnicos, Modelo 3D e Renders',
    detail: 'Planta técnica cotada 2D, modelo 3D espacial e renders fotorrealistas',
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
          <div style={{ flex: 1 }}>
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
              Benefício Fiscal Maior
            </span>
            <span style={{ display: 'block', fontSize: '1.05rem', fontWeight: 700, color: '#064E3B', marginBottom: '6px' }}>
              IVA a 6% na Construção para Habitação Própria Permanente (~40.000€ de Poupança)
            </span>
            <p style={{ fontSize: '0.90rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
              Ao construir a sua moradia para habitação própria permanente neste lote, a empreitada beneficia legalmente da <strong>taxa reduzida de IVA a 6%</strong> (ao abrigo do Código do IVA), em vez da taxa normal de 23%. Uma diferença substancial de 17 pontos percentuais que representa cerca de <strong>35.000€ a 40.000€ poupados</strong> no custo total de construção.
            </p>
          </div>
        </div>

        {/* Duas Opções de Compra para Este Lote */}
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
              Duas Formas de Comprar Este Lote
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              51.000 € (Só Lote) ou 335.000 € (Chave na Mão)
            </span>
          </div>
          <p style={{ fontSize: '0.90rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
            Este lote pode ser comprado só com o projeto (<strong>51.000 € negociável</strong>), ou com a moradia construída chave na mão (<strong>335.000 €</strong>). Se prefere não gerir a obra e receber a casa pronta a habitar com acabamentos contemporâneos, garagem e jardim, apresentamos a solução chave na mão com construtores parceiros.
          </p>
          <div style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
            <a
              href="#formulario"
              onClick={scrollToForm}
              id="cta_pricing_moradia_pronta"
              className="t-btn t-btn-outline"
              style={{ color: 'var(--text-primary)', borderColor: '#10B981' }}
            >
              <span>Consultar Opções (Lote ou Chave na Mão) →</span>
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
            <span>Agendar Visita ao Terreno</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
