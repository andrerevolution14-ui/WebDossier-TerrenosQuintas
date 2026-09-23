'use client';

// Tabela detalhada de preços que justifica o valor de 55.000€
const pricingRows = [
  {
    item: 'Valor Justo do Terreno (comparativo na mesma localização)',
    detail: 'Lote urbano plano 233m² com frente de rua e todas as infraestruturas concluídas (água, luz, saneamento, fibra)',
    marketValue: '55.000€',
    included: true,
  },
  {
    item: 'Projeto de Arquitetura Completo e Aprovado',
    detail: 'Memórias descritivas, alçados, cortes e peças desenhadas aprovadas pela Câmara Municipal de Aveiro',
    marketValue: '10.000€',
    included: true,
  },
  {
    item: 'PIP + Pré-Projeto Deferido na Câmara',
    detail: 'Viabilidade legal e aprovação urbanística garantida (poupa 12 a 24 meses de espera camarária)',
    marketValue: '1.500€',
    included: true,
  },
  {
    item: 'Materiais Técnicos e 3D (Plantas 2D, 3D e Renders Finais)',
    detail: 'Planta técnica cotada 2D, modelo espacial 3D e renders fotorrealistas de alta definição',
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
            O valor não inclui apenas o terreno. Inclui todo o projeto e materiais técnicos
            que normalmente pagaria à parte:
          </p>
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
              <span>Valor Total de Mercado (em separado)</span>
              <span className="t-pricing-total-sub">
                Terreno 233m² + Projeto Aprovado + PIP + Modelos 3D e Renders
              </span>
            </div>
            <div className="t-pricing-total-values">
              <span className="t-pricing-total-market t-pricing-total-market--red">{totalMarket}</span>
              <span className="t-pricing-saving-badge">Poupança direta de 15.000€</span>
            </div>
          </div>

          {/* O Nosso Preço Chave */}
          <div className="t-pricing-our-price">
            <div className="t-pricing-our-info">
              <span className="t-pricing-our-badge">Pacote Completo</span>
              <span className="t-pricing-our-label">Preço Total do Lote — Tudo Incluído</span>
              <span className="t-pricing-our-sub">Terreno 233m² + Projeto Aprovado + Plantas + Renders</span>
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

        {/* Benefício Fiscal: IVA a 6% na Construção */}
        <div
          style={{
            background: '#FAF6F0',
            border: '1.5px solid #C5A880',
            borderRadius: '16px',
            padding: '22px 26px',
            marginTop: '24px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
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
                background: '#C5A880',
                color: '#120E0A',
                padding: '3px 8px',
                borderRadius: '9999px',
                marginBottom: '6px',
              }}
            >
              Vantagem Financeira Decisiva
            </span>
            <span style={{ display: 'block', fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Enquadramento no IVA Reduzido a 6% na Construção
            </span>
            <p style={{ fontSize: '0.90rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
              Além da economia de 15.000€ no projeto aprovado, a empreitada de construção desta moradia beneficia
              legalmente da <strong>taxa reduzida de 6% de IVA</strong>, traduzindo-se em{' '}
              <strong>cerca de 40.000€ poupados em impostos de construção</strong> face à taxa normal de 23%.
            </p>
          </div>
        </div>

        {/* Opção Moradia Já Construída Verdemont */}
        <div
          style={{
            background: 'var(--bg-alt)',
            border: '1px solid var(--border-gold)',
            borderRadius: '16px',
            padding: '22px 26px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)' }}>
              ✦ Ou Prefere a Moradia Já Pronta a Habitar?
            </span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              335.000€ Chave na Mão
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
            Se preferir receber a moradia Domaine XXV 100% terminada (com jardim privativo de ~82 m², garagem coberta
            e acabamentos de luxo) em 10 meses e com avaliação bancária de <strong>450.000€</strong>:
          </p>
          <div style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
            <a
              href="https://www.verdemont.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="t-btn t-btn-outline"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--gold)' }}
            >
              <span>Ver Moradia Terminada em Verdemont.eu ↗</span>
            </a>
          </div>
        </div>

        {/* Botão de Contacto */}
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
