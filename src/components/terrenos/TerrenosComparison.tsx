'use client';

const rows = [
  {
    common: { icon: '❌', text: '12 a 24 meses de espera na Câmara — projeto incerto' },
    ours: { icon: '✅', text: 'Projeto 100% Aprovado. Avança com obra de imediato.' },
  },
  {
    common: { icon: '❌', text: 'Paga 5.000€–8.000€ extra em gabinetes de arquitetura' },
    ours: { icon: '✅', text: 'Projeto de arquitetura completo incluído no preço' },
  },
  {
    common: { icon: '❌', text: 'Risco real de o projeto ser recusado pela Câmara' },
    ours: { icon: '✅', text: 'Risco ZERO — viabilidade aprovada e garantida' },
  },
  {
    common: { icon: '❌', text: 'Sem plantas 2D, 3D, renders nem materiais técnicos' },
    ours: { icon: '✅', text: 'Plantas 2D, 3D e renders finais profissionais incluídos' },
  },
  {
    common: { icon: '❌', text: 'Construção tributada a 23% ou custos fiscais imprevisíveis' },
    ours: { icon: '💎', text: 'Benefício fiscal comprovado: IVA a 6% na construção (menos por volta de 40.000€ em impostos)' },
  },
  {
    common: { icon: '❌', text: 'Localização distante ou preços acima de 60.000–80.000€' },
    ours: { icon: '✅', text: 'A 7 min de Aveiro por 55.000€ — negociável' },
  },
];

export default function TerrenosComparison() {
  return (
    <section className="t-section" id="comparativo">
      <div className="t-wrap">
        <div className="t-section-header">
          <p className="t-label">Análise Comparativa</p>
          <h2 className="t-heading">
            Porquê Este Lote e Não Outro em Aveiro?
          </h2>
          <p className="t-section-sub">
            Há terrenos no mercado. Este diferencia-se pelo que inclui — não apenas pela localização.
          </p>
        </div>

        {/* Tabela comparativa */}
        <div className="t-compare-table">
          <div className="t-compare-header">
            <div className="t-compare-col t-compare-col--bad">
              <span className="t-compare-col-icon">😤</span>
              <span>Terreno Comum no Mercado</span>
            </div>
            <div className="t-compare-col t-compare-col--good">
              <span className="t-compare-col-icon">🏆</span>
              <span>Este Lote — 55.000€</span>
            </div>
          </div>

          {rows.map((row, i) => (
            <div key={i} className="t-compare-row">
              <div className="t-compare-cell t-compare-cell--bad">
                <span className="t-compare-icon">{row.common.icon}</span>
                <span>{row.common.text}</span>
              </div>
              <div className="t-compare-vs">VS</div>
              <div className="t-compare-cell t-compare-cell--good">
                <span className="t-compare-icon">{row.ours.icon}</span>
                <span>{row.ours.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Urgência */}
        <div className="t-compare-urgency">
          <span>🔥</span>
          <p>
            <strong>Disponibilidade Limitada.</strong> Publicado Hoje · Apenas 2 lotes disponíveis
            nesta localização. Visitas disponíveis <strong>esta semana</strong>.
          </p>
        </div>

        <div className="t-cta-center">
          <a href="#formulario" id="cta4_contacto_comparativo" className="t-btn t-btn-cta t-cta-scroll">
            <span>Reservar Visita — Quero Ser Contactado</span>
            <span className="t-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
