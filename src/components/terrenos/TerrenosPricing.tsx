'use client';

// Tabela de preços que justifica o valor de 55.000€
const pricingRows = [
  {
    item: 'Valor Justo do Terreno (comparativo na mesma localização)',
    detail: 'Lote urbano plano 233m² com frente de rua e todas as infraestruturas concluídas',
    marketValue: '55.000€',
    included: true,
  },
  {
    item: 'Projeto de Arquitetura Completo e Aprovado',
    detail: 'Memórias descritivas, alçados, cortes e peças desenhadas aprovadas pela Câmara',
    marketValue: '10.000€',
    included: true,
  },
  {
    item: 'PIP + Pré-Projeto Deferido na Câmara',
    detail: 'Viabilidade legal e aprovação urbanística garantida pelo município',
    marketValue: '1.500€',
    included: true,
  },
  {
    item: 'Materiais de Design (Plantas 2D, 3D e Renders Finais)',
    detail: 'Planta técnica 2D, modelo espacial 3D e renders fotorrealistas de alta resolução',
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
          <p className="t-label">Transparência de Preço</p>
          <h2 className="t-heading">
            O que Está Incluído nos 55.000€
          </h2>
          <p className="t-section-sub">
            O preço não inclui apenas o terreno. Inclui todo o projeto e materiais técnicos
            que normalmente pagaria <strong>à parte</strong>:
          </p>
        </div>

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

          {/* Total do Mercado em Vermelho com Poupança */}
          <div className="t-pricing-total-row">
            <div className="t-pricing-total-label">
              <span>Valor Total de Mercado (em separado)</span>
              <span className="t-pricing-total-sub">Terreno 233m² + Projeto de Arquitetura Aprovado + PIP + Modelos 3D e Renders</span>
            </div>
            <div className="t-pricing-total-values">
              <span className="t-pricing-total-market t-pricing-total-market--red">{totalMarket}</span>
              <span className="t-pricing-saving-badge">Poupança direta de 15.000€</span>
            </div>
          </div>

          {/* O nosso preço */}
          <div className="t-pricing-our-price">
            <div className="t-pricing-our-info">
              <span className="t-pricing-our-badge">Pacote Chave Completo</span>
              <span className="t-pricing-our-label">Preço Total do Lote — Tudo Incluído</span>
              <span className="t-pricing-our-sub">Terreno 233m² + Projeto Aprovado + Plantas 2D & 3D + Renders</span>
            </div>
            <div className="t-pricing-our-value">
              <div className="t-pricing-our-price-row">
                <span className="t-pricing-our-amount">55.000€</span>
                <span className="t-pricing-our-neg">Negociável</span>
              </div>
              <span className="t-pricing-our-direct">Venda Direta com o Proprietário</span>
            </div>
          </div>
        </div>

        {/* Benefício Fiscal Extraordinário: IVA a 6% */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.04) 100%)',
            border: '1.5px solid var(--t-beige)',
            borderRadius: 'var(--radius-subtle)',
            padding: '20px 24px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}
        >
          <span style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '2px' }}>💎</span>
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.70rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: '#C5A880',
                color: '#120E0A',
                padding: '3px 8px',
                borderRadius: 'var(--radius-pill)',
                marginBottom: '6px',
              }}
            >
              Vantagem Financeira Decisiva
            </span>
            <span style={{ display: 'block', fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Enquadramento no IVA Reduzido a 6% na Construção
            </span>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
              Além da economia de 15.000€ no projeto aprovado, a empreitada de construção desta moradia beneficia
              legalmente da <strong>taxa reduzida de 6% de IVA</strong> (habitação própria), traduzindo-se em{' '}
              <strong>menos por volta de 40.000€ no valor de construção em impostos</strong> face à taxa padrão de 23%.
            </p>
          </div>
        </div>

        {/* Outros terrenos na zona */}
        <div className="t-pricing-market-note">
          <span className="t-pricing-market-note-icon">📊</span>
          <div>
            <span className="t-pricing-market-note-title">Comparação com o Mercado Local</span>
            <p className="t-pricing-market-note-text">
              Outros lotes na mesma área (Oliveirinha, Eixo, Esgueira) estão à venda
              entre <strong>45.000€ e 70.000€</strong> — sem qualquer projeto nem plantas.
              Aqui adquire o terreno com projeto aprovado, 3D, renders e benefício de IVA a 6% por{' '}
              <strong>55.000€ (poupança direta superior a 40.000€ no conjunto da operação)</strong>.
            </p>
          </div>
        </div>

        <div className="t-cta-center">
          <a href="#formulario" id="cta_pricing_contacto" className="t-btn t-btn-cta t-cta-scroll">
            <span>Tenho Interesse — Quero Ser Contactado</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
